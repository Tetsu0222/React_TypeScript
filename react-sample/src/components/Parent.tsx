//メモ化コンポーネント
//コンポーネントの再描画を抑止することができるが
//メモ化コンポーネントに関数やオブジェクトを渡すと、また親の再描画によってコンポーネントの再描画が発生する。

import React , { memo , useState } from "react";

type FizzProps = {
    isFizz:boolean
}

const Fizz = ( props:FizzProps ) => {
    const { isFizz } = props
    console.log( 'Fizzが再描画されました , isFizz=${isFizz}' )
    return <span>{isFizz ? 'Fizz' : '' }</span>
}

//BuzzのpropsにonClick関数（コールバック関数）を追加
type BuzzProps = {
    isBuzz:boolean
    onClick:() => void
}

//onClick関数を追加
const Buzz = memo<BuzzProps>( ( props ) => {
    const { isBuzz , onClick } = props
    console.log( 'Buzzが再描画されました , isBuzz=${isBuzz}' )

    return (
        <span onClick={ onClick }>
            {isBuzz ? 'Buzz' : '' }
        </span>
    )
})

export const Parent = () => {
    const [ count , setCount ] = useState( 1 )
    const isFizz = count % 3 === 0
    const isBuzz = count % 5 === 0

    //この関数はParentの再描画の度に作成される。
    const onBuzzClick = () => {
        console.log( 'Buzzがクリックされました , isBuzz=${isBuzz}' )
    }

    console.log( 'Parentが再描画されました,count=${ count }' )

    //onBuzzClickをonClickで起動するように追加
    return (
        <div>
            <button onClick={ () => setCount( ( c ) => c + 1 )}>+1</button>
            <p>{'現在のカウント:${count}'}</p>
            <p>
                <Fizz isFizz={isFizz} />
                <Buzz isBuzz={isBuzz} onClick={ onBuzzClick }/>
            </p>
        </div>
    )
}


//以上のコードは、再描画の度に、Parentで新しく作られた関数がBuzzに渡される。
//そのため、再描画が発生してしまう。
//その再描画を抑制するには、同じ関数を渡す必要がある。
//また、オブジェクトや配列などもコンポーネント内で作成すると、描画の度に新しいものが作成されるため、再描画が発生する原因となる。

//useCallbackやuseMemoは、その関数や値をメモ化することが可能
//これらのフックを利用することで、メモ化コンポーネントに関数やオブジェクトを渡しても、再描画を抑制できる。