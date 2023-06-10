//useMemo

//値をメモ化する。
//第1引数は値を生成する関数、第2引数には依存配列を渡す。
//描画時の比較方法はuseCallbackと同様


import React , { useState , useMemo } from "react";

export const UseMemoSample = () => {

    //textは現在のテキストボックスの中身の値を保持する。
    const [ text , setText ] = useState( '' )

    //itemsは文字列のリストを保持する。
    const [ items , setItems ] = useState<string[]>( [] )

    const onChangeInput = ( e: React.ChangeEvent<HTMLInputElement> ) => {
        setText( e.target.value )
    }

    //ボタンをクリックした時に呼ばれる関数
    const onClickButton = () => {
        setItems( (prevItems ) => {

            //現在の入力値をitemsに追加、新しい配列を作成して保存
            return [ ...prevItems , text ]
        })

        //テキストボックスの中の値を空にする。
        setText( '' )
    }

    //numberOfCharacters1は再描画の度に、items.reduceを実行して結果を得る。
    const numberOfCharacters1 = items.reduce( ( sub , item ) => sub + item.length , 0 )

     //numberOfCharacters2はuseMemoを使用、itemsが更新されるタイミングでitems.reduceを実行して結果を得る。
     const numberOfCharacters2 = useMemo( () => {
        //第2引数の配列の中にitemsがあるため、itemsが新しくなった時だけ関数を実行してメモを更新する。
        return items.reduce( ( sub , item ) => sub + item.length , 0 )
     } , [ items ] )

     return ( 
        <div>
            <p>UseMemoSample</p>
            <div>
                <input value={ text } onChange={ onChangeInput } />
                <button onClick={ onClickButton }>Add</button>
            </div>
            <div>
                { items.map( ( item , index ) => (
                    <p key={ index }>{ item }</p>
                ))}
            </div>
            <div>
                <p>Total Number of Characters 1 : { numberOfCharacters1 }</p>
                <p>Total Number of Characters 2 : { numberOfCharacters2 }</p>
            </div>
        </div>
     )
}


//上記のコードは、テキストボックスに文字を入力してボタンを押すと、itemsに文字列が追加され、今まで追加された文字列を1行ずつ表示する。
//同時に、表示されている文字数の総和も表示する。

//numberOfCharacters1はreduce関数を直接呼び、その結果を代入している。
//numberOfCharacters2はuseMemoを使い、引数の関数の中でreduceを呼び、結果を返している。

//前者は、描画ごとにreduce関数が呼ばれて更新される。
//テキストボックスに文字を入力した場合でもreduce関数が呼ばれる。
//しかし、この定数は、テキストボックスに入力された値とは無関係に求められる値であるため
//描画する度にreduce関数を呼ぶ意味がなく、配列が大きくなるにつれ1回あたりの計算量が増加、パフォーマンス低下へと繋がる。

//実際は、itemsが変更された時だけ計算すれば良く、後者はuseMemoを使っており、第2引数で与えられたitemsが変更された時だけ
//第1引数の関数を実行して値を得る。つまり、itemsが新しくなる場合にのみ計算して値を更新する。

//useMemoもuseCallbackと同様に、値をメモ化することで子要素の描画を抑制するためだけでなく、不必要なけいっさんを削減するためにも使用される。