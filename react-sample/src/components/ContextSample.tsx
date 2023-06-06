//Context(コンテキスト)

//propsと同じく親から子のコンポーネントへ任意のデータを渡せる。
//Contextを使用することで、データを親から直接渡さなくても、コンポーネントが必要なデータを参照できる。

//例えば、ログインしているユーザー情報は、アプリ内の様々なコンポーネントで参照する可能性があるため
//Contextを使用した方が適している。
//propsであれば、必要なコンポーネントに伝搬させる必要がある。

//ContextではProviderとConsumerという2つのコンポーネントを使用する。
//具体的には、Providerにデータを渡し、Consumerがデータを受け取る。


import React from 'react'

//Titleを渡すためContexrを作成
//createContextでContextは生成できる。
const TitleContext = React.createContext('')    //第1引数に指定した値はコンテキストが渡すデータのデフォルト値


//データを渡す時は、Context.Providerというコンポーネントのpropsのvalueにデータを渡す。
//そのデータを参照するには、Context.Consumerというコンポーネントを追加
//その子要素として関数を指定すると、その引数からデータを参照できる。


//Titleコンポーネントの中でContextの値を参照する。
const Title = () => {
    //Consumerを使って、Contextの値を参照する。
    return (
        <TitleContext.Consumer>
            {( title ) => {
                return <h1>{ title }</h1>
            }}
        </TitleContext.Consumer>
    )
}

//HeaderからTitleへは何もデータを渡さない。
const Header = () => {
    return (
        <div>
            <Title />
        </div>
    )
}

//Pageコンポーネントの中でContextに値を渡す。
const Page = () => {

    const title = 'React Book'

    //Providerを使いContextに値を渡す。
    //Provider以下のコンポーネントから値を参照できる。
    return (
        <TitleContext.Provider value={ title }>
            <Header />
        </TitleContext.Provider>
    )
}

export default Page


//Providerは入れ子にできる。
//その場合はConsumerから見て一番近いProviderのデータを取得
//また、useContextフックでは、Consumerを使わずにContextのデータを参照できる。
