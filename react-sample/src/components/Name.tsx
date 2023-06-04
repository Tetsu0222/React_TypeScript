import React from 'react'

//Reactの要素に関する取り扱いの注意


//名前を入力するためのテキストボックスを返す。
//input要素のonChangeイベントに対するコールバック関数を定義
const Name = () => {
    const onChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
        console.log( e.target.value );  //入力された内容をコンソールで出力する。
    }

    //classやforは予約語の関係上、そのままでは使用できない。
    //代わりにJSXではclassNameやhtmlForを使用する。

    //また、style属性においても、HTMLでは文字列を与えていたが、Reactではオブジェクトで定義する。
    //{{ }}での記述が必要、1段目は文字列以外を渡すことを示すもの、2段目がオブジェクトで渡すために必要
    //同時に、プロパティ名もキャメルケースで記述が必要となる。
    return (
        <div style={{ padding:'16px' , backgroundColor:'grey' }}>
            <label htmlFor="name">名前</label>
            <input id="name" className="input-name" type="text" onChange={ onChange } />
        </div>
    )
}

export default Name