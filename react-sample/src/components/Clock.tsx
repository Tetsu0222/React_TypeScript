//副作用のフック

//副作用はコンポーネントの描画とは直接関係のない処理のこと。
//例として、描画されたDOMを手動で変更、ログを出力、タイマーのセット、データの取得など

//Reactにおいて、この副作用を適切に管理することが重要


//useEffect
//副作用を実行するために使用するフック
//これらの処理をそのまま関数コンポーネントの中で実行すると
//処理の中で参照しているDOMが描画により置き換わってしまったり、状態を更新して再描画が発生したり
//無限ループになる可能性がある。

//useEffect()を使用すると、propsやstateが更新、再描画が終わった後に処理が実行される。
//依存配列を指定することで、特定のデータが変化した時だけ処理を行うように設定できる。

//以下のコードは、useEffectを使用している。
//Clockコンポーネントは現在時刻を表示、1秒ごとに時間が更新され、ドロップダウンメニューを選択することで時刻の表記を変更できる。
//時刻の表記の設定はlocalstorageに保存される。

//リロード後は、localstorageに保存されたデータを読み出し、最後に選択した値を表示する。
//以下のコードでは、2種類の用途で、3つのuseEffectを使用している。


import React , { useState , useEffect } from 'react'

//タイマーが呼び出される周期を1秒にする。
const UPDATE_CYCLE = 1000

//localstorageで使用するキー
const KEY_LOCALE = 'KEY_LOCALE'

enum Locale{
    US = 'en-US',
    JP = 'ja-JP',
}

const getLocaleFromString = ( text : string ) => {
    switch( text ){
        case Locale.US:
            return Locale.US
        case Locale.JP:
            return Locale.JP
        dafault:
        return Locale.US
    }
}

export const Clock = () => {

    const [ timestamp , setTimestamp ] = useState( new Date() )
    const [ locale , setLocale ] = useState( Locale.US )

    //タイマーのセットをするための副作用
    useEffect( () => {
        //タイマーのセット
        const timer = setInterval ( () => {
            setTimestamp( new Date() )
        } , UPDATE_CYCLE )

    //クリーンアップ関数を渡し、アンマウント時にタイマーの解除を行う。
    return () => {
        clearInterval( timer )
    }
    //初期描画のみ実行（第2引数は空で指定）
    } , [] )



    //localeが変化したときに、localstorageに値を保存するための副作用
    useEffect( () => {
        localStorage.setItem( KEY_LOCALE , locale )
        //依存配列にlocaleをあたし、localeが変化する度に実行するように設定
    }, [ locale ])

    return (
        <div>
            <p>
                <span id="current-item-label">現在時刻</span>
                <span>:{ timestamp.toLocaleString( locale ) }</span>
                <select
                    value={ locale }
                    onChange={ ( e ) => setLocale( getLocaleFromString( e.target.value ) )}>
                        <option value="en-US">en-US</option>
                        <option value="ja-JP">ja-JP</option>
                    </select>
            </p>
        </div>
    )
}


//1つ目のuseEffectでは、タイマーの初期化処理を実施
//タイマーの設定にはsetInterval関数が用いられており、周期的に処理を実行する。
//そのため、初期化処理は初期描画の時のみに行われるべき処理である。

//useEffectの第1引数の関数の中でsetIntervalを呼び出し、タイマーをセット
//setIntervalに渡すコールバック関数では、setTimestampを呼び出して状態を更新する。
//これで1秒ごとに再描画が行われ、現在時刻の表示を更新、1つ目のuseEffectに渡される関数は戻り値として関数を返している。
//これはクリーンアップ関数と呼ばれるものであり、次のuseEffectが実行される直前かアンマウント時に実行される。

//1つ目のuseEffectの依存配列は空なので、コンポーネントがアンマウントされた時だけクリーンアップ関数が実行される。
//ここでは、タイマーの設定を解除している。
//アンマウント時にタイマーを解除しないと、親コンポーネントでclockコンポーネントの呼び出しがなくなり
//表示されなくなった後でも、タイマーが動作し続ける。これはバグやメモリリークの原因となりえる挙動である。

//2つ目と3つ目は、localstrageの読み込みと保存に関する処理を実行している。
//localestarageの関数は同期的に実行、読み込むと書き込むデータが大きいほど時間がかかる。

//描画関数中に直接localestarageを使用すると、描画の遅延が発生してしまう。
//そのため、useEffectの中でlocalstorageを使用する。

//2つ目のuseEffectはlocalstorageに保存していた値を状態に読み込む処理のため、こちらも初期描画直後の1回だけ実行する。
//3つ目でlocalstarageへの保存処理を実行している。
//描画ごとに保存する必要はなく、ドロップダウンメニューが選択してlocaleが更新された時だけ保存されるようにするため、依存配列へlocaleを渡す。

