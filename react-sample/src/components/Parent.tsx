//メモ化コンポーネント


//propsや内部状態が更新された時
//コンポーネント内で参照しているContextの値が更新された時
//親コンポーネントが再描画された時

//上記の3パターンでコンポーネントが再描画される。
//親コンポーネントが再描画されると、無条件に子コンポーネントが再描画される。
//その再描画の伝播を止めるために、メモ化コンポーネントを使用する。

//メモ化コンポーネントは、親コンポーネントで再描画が発生しても
//propsやContextの値が変化しない場合は、親コンポーネントによる再描画は発生しない。

//メモ化コンポーネントは関数コンポーネントをmemo関数でラップすると作成できる。
//memo<function> これでメモ化コンポーネントになる。

import React , { memo , useState } from "react";

type FizzProps = {
    isFizz:boolean
}

//Fizzは通常の関数コンポーネント
//isFizzがtrueの場合はFizzと表示、それ以外は何も表示しない。
//isFizzの変化に関わらず、親が再描画されるとFizzも再描画される。
const Fizz = ( props:FizzProps ) => {
    const { isFizz } = props
    console.log( 'Fizzが再描画されました , isFizz=${isFizz}' )
    return <span>{isFizz ? 'Fizz' : '' }</span>
}

type BuzzProps = {
    isBuzz:boolean
}

//Buzzはメモ化した関数コンポーネント
//isBuzzがtrueの場合はBuzzと表示、それ以外は何も表示しない。
//親コンポーネントが再描画されても、izBuzzが変化しない限りはBuzzは再描画しない。
const Buzz = memo<BuzzProps>( ( props ) => {
    const { isBuzz } = props
    console.log( 'Buzzが再描画されました , isBuzz=${isBuzz}' )

    return (
        <span>
            {isBuzz ? 'Buzz' : '' }
        </span>
    )
})

//この形式でexportした時は、import{ Parent } from で読み込む。
export const Parent = () => {
    const [ count , setCount ] = useState( 1 )
    const isFizz = count % 3 === 0
    const isBuzz = count % 5 === 0

    console.log( 'Parentが再描画されました,count=${ count }' )
    return (
        <div>
            <button onClick={ () => setCount( ( c ) => c + 1 )}>+1</button>
            <p>{'現在のカウント:${count}'}</p>
            <p>
                <Fizz isFizz={isFizz} />
                <Buzz isBuzz={isBuzz} />
            </p>
        </div>
    )
}