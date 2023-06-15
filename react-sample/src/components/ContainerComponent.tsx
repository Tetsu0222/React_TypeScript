//ConnainerComponent

//デザインは一切実装せず、ビジネスロジックのみを担う。
//Hooksを持たせて、状態を使って表示内容を切り替える。
//APIコールなどの副作用を実行するなどの振る舞いを実装する。

import { useState , useCallback } from 'react'
import { Button } from './button'

//ポップアップを表示するためのフック
const useProps = () => {

    //与えられたテキストを表示するポップアップを出現させる関数
    const cb = useCallback( ( text : string ) => {
        prompt( text )
    } , [] )

    return cb
}

type ConutButtonProps = {
    label : string
    maximum : number
}


//クリックされた回数を表示するボタンを表すコンポーネント
export const CountButton = ( props : CountButtonProps ) => {

    const { label , maximum } = props

    //アラートを表示させるためのフックを使う
    const displeyPopup = usePopup()

    //カウントを保持する状態を定義
    const [ count , setCount ] = useState( 0 )

    //ボタンが押された時の挙動を定義する
    const onClick = useCallback( () => {

        //カウントを更新する
        const newCount = count + 1

        setCount( newCount )

        if( newCount >= maximum ){
            //アラートを出す。
            displeyPopup( "時間の指定に誤りがあります")
        }
    } , [ count , maximum ] )

    //状態を元に表示に必要なデータを求める。
    const disabled = count >= maximum
    const text = disabled ? "test" : "test2"

    //PresentationalComponentを返す。
    return( 
        <Button disabled = { disabled } onClick={ onClick } label= { label } test={ text } />
    )
}



//機能と見た目を切り離して実装することで
//拡張性が高く、保守性も高い設計が可能となる。