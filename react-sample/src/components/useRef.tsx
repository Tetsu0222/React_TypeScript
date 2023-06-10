//useRefは書き換え可能なrefオブジェクトを作成する。
//refは大きく分けて次の2つの使用方法がある。

//データの保持
//DOMの参照

//関数コンポーネントの中でデータを保持するためには、useStateやuseReducerがある。
//これらは状態を更新する度に、再描画が発生してしまう。
//refオブジェクトに保存された値は更新しても再描画が発生しないため、
//描画と関係のないデータの保持目的でrefが使用される。

//refをコンポーネントに渡すと、この要素がマウントされた時、ref.currentにDOMの参照がセット
//DOMの関数などを呼び出すことができる。

//以下のコードは、画像アップローダーのサンプルコード
//テキストをクリックすると、ファイル選択ダイアログが表示
//画像を選択した後でアップロードするボタンをクリックすると
//一定時間の後に、メッセージが表示される。

import React , { useState , useRef } from 'react';

const sleep = ( ms:number ) => new Promise( ( resolve ) => setTimeout( resolve , ms ))
const UPLOAD_DELAY = 5000

const ImageUploader = () => {

    //隠されたimput要素にアクセスするためのref
    const inputImageRef = useRef<HTMLInputElement | null>( null )

    //選択されたファイルデータを保持するref
    const fileRef = useRef<File | null>( null )

    const [ message , setMessage ] = useState<string | null >( '' )

    //画像をアップロードというテキストがクリックされた時のコールバック関数
    const onClickText = () => {
        if( inputImageRef.current !== null ){
            //inputのDOMにアクセスして、クリックイベントを発火する。
            inputImageRef.current.click()
        }
    }

    //ファイルが選択された後に呼ばれるコールバック
    const onChangeImage = ( e:React.ChangeEvent<HTMLInputElement> ) => {
        const files = e.target.files
        if( files !== null && files.length > 0 ){
            //fileRef.currentに値を保存する。
            //fileRef.currentが変化しても再描画が発生しない。
            fileRef.current = files[ 0 ]
        }
    }

    //アップロードボタンがクリックされた時に呼ばれるコールバック関数
    const onClickUpload = async () => {
        if( fileRef.current !== null ){
            //通常はここでAPIを呼び出し、ファイルをサーバーへアップロードする。
            //ここでは疑似的に一定時間待つ処理を代替で設定
            await sleep( UPLOAD_DELAY )

            //アップロード成功した旨のメッセージに書き換える。
            setMessage( '${ fileRef.current.name } has been successfully uploaded' )
        }
    }

    return (
        <div>
            <p style={ { textDecoration : 'underline' }} onClick={ onClickText }>
                画像をアップロード
            </p>
            <input ref={ inputImageRef } type="file" accept="image/*" onChange={ onChangeImage } style={ { visibility:'hidden'}} />
            <br />
            <button onClick={ onClickUpload }>アップロード</button>
            { message !== null && <p>{ message }</p> }
        </div>
    )
}

//上記のコードでは2つのrefを使用している。

//1つ目はinput要素の参照を保持するためのinputImageRefで、input要素のrefにinputImageRefを渡している。
//このinput要素はスタイル定義で見えないようになっており、p要素がクリックされると、inputImageRef.current.click()を呼び出し
//inputをクリックするイベントをDOMへ発行、ダイアログを開くことができる。

//2つ目のrefのfileRefは選択されたファイルオブジェクトを保持する。
//ファイルが選択されるとinput要素のonChangeイベントが呼び出される。

//このコールバック関数の中でfileRef.currentにアップロードされたファイルを代入する。
//ファイルを選択した後でボタンをクリックすると、一定時間した後にファイル名とファイルがアップロードされた旨のメッセージが表示

//実際に、このコンポーネントを実行させると、初期描画の後で次に描画されるのはメッセージが表示されるタイミングである。
//画像が選択された時やボタンがクリックされた時には再描画が発生しない。
//これは状態ではなくrefを使用して値を読み書きしているためである。