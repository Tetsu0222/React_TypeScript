//コンポーネントの試作実装

//Hello()は、クリックするとアラートを出すテキストを返す。
const Hello = () => {
    const onClick = () => {
        alert( 'Hello Master' );
    }

    //アラートを表示させるテキスト(この文字列がクリックされるとイベント発火)
    const text = 'Hello , React';

    //HTML要素として返す。
    return ( 
        <div onClick={onClick}>
            {text}
        </div>
    )
}

//外部から呼び出せるようにエクスポートする。
export default Hello