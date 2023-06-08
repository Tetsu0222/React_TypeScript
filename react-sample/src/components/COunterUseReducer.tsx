//useReducer
//複雑な状態遷移をシンプルに記述できる。

//useStateよりも複雑な用途に向いており、
//配列やオブジェクトなどの複数のデータをまとめたものを状態として扱う場合に用いられることが多い。

//useStateでは更新関数に次の状態を直接渡していたが
//useReducerでは更新関数にactionと呼ばれる特殊なデータを渡す。

import { useReducer } from "react";

//reducerが受け取るactionの型を定義
type Action = 'DECREMENT' | 'INCREMENT' | 'DOUBLE' | 'RESET'

//現在の状態とactionにもとづいて次の状態を返す。
const reducer = ( currentCount: number , action : Action ) => {
    //actionの中身で、次の状態を分岐
    switch( action ){
        case 'INCREMENT':
            return currentCount + 1
        case 'DECREMENT':
            return currentCount - 1
        case 'DOUBLE':
            return currentCount * 2
        case 'RESET':
            return 0
        default:
            return currentCount 
    }
}

type CounterProps = {
    initialValue : number
}

const Counter = ( props : CounterProps ) => {
    const { initialValue } = props

    //現在の状態とactionを渡すと、次の状態を返すreducerという関数を用いる。
    //userReducerの戻り値の配列の1番目は現在の状態、2番目がdispatch関数
    //この2番目のdispatch関数へactionを渡すことで状態を更新できる。
    const[ count , dispatch ] = useReducer( reducer , initialValue )    //const [ 現在の状態 , dispatch ] = useReducer( reducer , 初期状態 )

    //dispatch関数へ次の状態（値）を渡して状態を更新する。
    return (
        <div>
            <p>Count:{count}</p>
            <button onClick={ () => dispatch( 'DECREMENT' ) }>-</button>
            <button onClick={ () => dispatch( 'INCREMENT' ) }>+</button>
            <button onClick={ () => dispatch( 'DOUBLE' ) }>*2</button>
            <button onClick={ () => dispatch( 'RESET' ) }>Reset</button>
        </div>
    )
}

export default Counter