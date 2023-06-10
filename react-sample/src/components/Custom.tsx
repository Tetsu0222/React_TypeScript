//カスタムフックとuseDebugValue

//フックをトップレベルで呼び出していたが、ループや条件分岐
//コールバック関数の中では、フックを呼び出すことができない。
//このような場所でフックを呼び出すようなコードを書くと
//ビルドエラーや実行エラーが発生する。

//これは描写ごとにフックの数と順番を同じにするためである。


//フックを使用する関数を新たに定義して、それを関数コンポーネントのトップレベルで呼び出すことができる。
//複数のフックを組み合わせたカスタムフックを作成することができ、柔軟に対応したい場合に役立つ。

//以下のコードはテキストボックスに文字を入力して、入力された文字が表示されるコンポーネント
//関数コンポーネントの外でuseInputというカスタムフックを定義している。
//カスタムフックは、慣習的に基本的なフックと同様にuseから始まる名前にする。


import React , { useState , useCallback , useDebugValue } from "react";

//input向けにコールバックと現在の入力内容をまとめたフック
const useInput = () => {

    //現在の入力値を保持するフック
    const [ state , setState ] = useState( '' )

    //inputが変化したらフック内の状態を更新する。
    const onChange = useCallback( ( e: React.ChangeEvent<HTMLInputElement> ) => {
        setState( e.target.value )
    } , [] )

    //デバック用に値を出力する。
    //値は開発者ツールのComponentsタブに表示される。
    useDebugValue( 'Input:${ state }' )

    //現在の入力内容とコールバック関数だけ返す。
    return [ state , onChange ] as const
}

export const Input = () => {
    const [ text , onChangeText ] = useInput()
    return (
        <div>
            <input type="text" value={ text } onChange={ onChangeText } />
            <p>Input:{ text }</p>
        </div>
    )
}


//useInputでは、input要素のonChangeが呼ばれたら内部の状態を更新するためのuseStateとuseCallbackを組み合わせている。
//そして、必要なデータや関数だけをreturnで戻している。

//Inputコンポーネントではカスタムフックを呼び出して、状態と関数を取得、input要素に渡す。