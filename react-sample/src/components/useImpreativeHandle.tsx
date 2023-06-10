//useImpreativeHandle

//useRefに関連するフック
//コンポーネントにrefが渡された時、親のrefに代入される値を設定するのに使用する。
//子コンポーネントが持つデータを参照、子コンポーネントで定義されている関数を親から呼び出すことが可能


//以下はメッセージを表示するサンプルコード
//Parentコンポーネントの中のボタンをクリックすると、Childコンポーネントのmessageが更新されて、メッセージが表示される。
//ChildはforwardRef関数でラップされており、子コンポーネントで親から渡されたrefを参照するために使用する。
//そして、子コンポーネントでuseImperaticeHandleを呼び出している。

//useImpreaticeHandleの第1引数には親から渡されたref、第2引数ではオブジェクトが返す関数、第3引数に依存配列を渡す。

import React , { useState , useRef , useImperativeHandle } from "react";


//ここでは、showMessage関数を定義しており、この関数が呼ばれるとmessageが更新、このコンポーネント内でメッセージが表示される。
const Child = React.forwardRef( ( props , ref ) => {
    const [ message , setMessage ] = useState<string | null>( null )

    //useImperativeHandleで親のrefから参照できる値を指定
    useImperativeHandle( ref , () => ({
        showMessage:() => {
            const date = new Date()
            const message = 'Hello , its ${ date.toLocaleString() } now '
            setMessage( message )
        },
    }))

    return <div>{ message !== null ? <p>{ message }</p> : null }</div>
})

//refオブジェクトを生成し、Childの属性として渡している。
//ボタンがクリックされたらref経由でshowMessage関数を呼び出している。
const Parent = () => {
    const childRef = useRef<{ showMessage : () => void }>( null )
    const onClick = () => {
        if( childRef.current !== null ){
            //子のuseImperaticeHandleで指定した値を参照
            childRef.current.showMessage()
        }
    }

    return (
        <div>
            <button onClick={ onClick }>Show Message</button>
            <Child ref={ childRef } />
        </div>
    )
}


//useImperativeHandleを使用することで
//コンポーネントの関数を親から好きなタイミングで、明示的に呼び出すことができる。

//しかし、親コンポーネントは子コンポーネントに依存しているため
//あまり利用されることはない。

//多くの場合でpropsで代用することが可能
//この場合、messageをChildが保持するのではなく、Parentが保持することで解消できる。