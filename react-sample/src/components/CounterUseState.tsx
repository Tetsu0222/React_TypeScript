//useState
//状態のフック
//コンポーネントの内部の状態を保ちつつ、その状態の変化に応じて表示を変更できる。

//useStateを使用できるようにインポート
import{ useState } from 'react'

//props型指定
type CounterProps = {
    initialValue : number
}

//コンポーネント本体
const Counter = ( props : CounterProps ) => {
    const { initialValue } = props

    //カウントを保持する1つの状態をuseState()で宣言する。引数には初期値を指定する。
    //第1引数が現在の状態、第2引数が状態を更新する関数
    const [ count , setCount ] = useState( initialValue )

    //<p>タグにcount（フック）を埋め込み現在のカウントを表示させる。
    //更新関数（setCount)が呼ばれると、状態が変化、フックがあるコンポーネントは再描画される。
    return (
        <div>
            <p>Count:{ count }</p>
            <button onClick={ () => setCount( count - 1 ) }>-</button>
            <button onClick={ () => setCount( ( prevCount ) => prevCount + 1 ) }>+</button>
        </div>
    )
}

const CounterUseState = () => {
    return (
        <Counter initialValue = {100}>

        </Counter>
    )
}

export default CounterUseState
