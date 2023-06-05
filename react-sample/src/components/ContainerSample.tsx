//コンポーネントを使用する際は、開始タグと閉じタグで他の要素やコンポーネントを囲むことができる。
//この場合は、propsの中のchirdrenにその要素が渡される。

//以下のコードでは、ParentコンポーネントでContainerを使用する際に、p要素を囲んでいる。
//この囲んだp要素がContainerのchildrenに与えられる。


//Containerは赤背景のボックスの中に、タイトルと子要素を表示する。
const Container = ( props:{ title:string ; children:React.ReactElement }) => {
        
        const { title , children } = props
        //propsのchildrenを埋め込むと、このコンポーネントの開始タグと閉じタグで囲んだ要素を表示する。
        //propsのtitleが文字列、childrenがReactElementになっている。
        return (
            <div style={ { background: 'red' }}>
                <span>{ title }</span>
                <div>{ children }</div>
            </div>
        )
}

//Continerを使用する際に、他の要素を囲って使用する。
const Parent = () => {

    //<p>タグの要素(Containerで囲われたHTML要素)が、Containerのchildrenに渡される。
    return (
        <Container title="Hello">
            <p>ここの部分が背景色で囲まれる。</p>
        </Container>
    )
}


export default Parent


/*
結果的にHTML要素は以下のようになっている。

<div style="background:red">
    <span>Hello</span>  //親要素から渡された要素(title)
    <div>
        <p>ここの部分が背景色で囲まれる。</p>   //childrenとして親要素から渡された要素
    </div>
</div>

以下の内容で型指定している。
title:string
children:React.ReactElement

*/
