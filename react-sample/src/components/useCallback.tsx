//useCallbackは、関数をメモ化するためのフック
//useCallback()の第1引数は関数、第2引数は依存配列を指定する。
//関数の再描画が行われる度に、useCallback()は依存配列の中の値を比較する。
//依存配列の中の値が、それぞれ再描画前と同じ場合、useCallback()はメモ化している関数を返す。
//もし、依存配列の中で異なる値があれば、現在の第1引数の関数をメモに保存する。つまり、依存配列と異なる値があれば新しい関数を返す。

import React , { useState , useCallback } from 'react'

type ButtonProps = {
    onClick: () => void
}

//DecrementButtonは通常の関数コンポーネントでボタンを表示する。
const DecrementButton = ( props : ButtonProps ) => {
    const { onClick } = props
    console.log( 'DecrementButtonが再描画されました' )
    return <button onClick={ onClick }>Decrement</button>
}

//IncrementButtonはメモ化した関数コンポーネントでボタンを表示する。
const IncrementButton = React.memo( ( props : ButtonProps ) => {
    const { onClick } = props
    console.log( 'IncrementButtonが再描画されました' )
    return <button onClick={ onClick }>Increment</button>
})

//DoubleButtonはメモ化した関数コンポーネントでボタンを表示する。
const DoubleButton = React.memo(( props : ButtonProps ) => {
    const { onClick } = props
    console.log( 'DoubleButtonが再描画されました' )
    return <button onClick={ onClick }>Double</button>
})

export const Parent = () => {
    const [ count , setCount ] = useState( 0 )

    const decrement = () => {
        setCount( ( c ) => c - 1 )
    }

    const increment = () => {
        setCount( ( c ) => c + 1 )
    }

    //useCallbackを使用して関数をメモ化する。
    const double = useCallback( ()=> {
        setCount( ( c ) => c * 2  )
    } , [] )

    return ( 
        <div>
            <p>Count:{ count }</p>
            <DecrementButton onClick={ decrement } />
            <IncrementButton onClick={ increment } />
            <DoubleButton onClick={ double } />
        </div>
    )
}


//上記のサンプルコードでは、子コンポーネントで各種ボタンを定義している。
//ボタンには、親からコールバック関数が渡されており、ボタンを押すとそれぞれの関数に応じてカウントを更新する。
//double関数( DoubleButton )では、その関数の実装をuseCallbackでラップしている。
//IncrementButtonとDoubleButtonのコンポーネントはメモ化コンポーネントである。

//それぞれのボタンをクリックするとカウントが変化する。
//DoubleButton以外はカウントが変化する度に再描画が発生

//特にDecrementButtonはmemo関数でラップしていない普通の関数コンポーネントのため
//Parentの再描画が行われるたび、DecrementButtonも再描画が発生する。

//IcrementButtonはmemoでラップされたコンポーネントだが
//propsのonClickはParentが描画する度に新しくなるため
//Parentが再描画されると同様に再描画されてしまう。

//DoubleButtonに渡すonClickは、コールバック関数をuseCallbackでラップしている。
//冒頭に記述したように、今回は依存配列が空であり、初期描画時に生成された関数を常に返すようになるため、
//DoubleButtonに渡される関数も毎回同じになる。
//よって、親の再描画によるDoubleButtonの再描画は発生しない。