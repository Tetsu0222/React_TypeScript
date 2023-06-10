//SSRによるページの実装

//アクセスする度にサーバーでページを描画、その結果をクライアントで表示する。
//SSRではgetServerSidePropsを定義する。
//この関数が返したpropsを元にページを描画する。

import { GetServerSideProps , NextPage } from "next";
import Head from 'next/head';

type SSRProps = {
    message:string
}

const SSR : NextPage<SSRProps> = ( props ) => {

    const { message } = props

    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <p>
                    このページはサーバーサイドレンダリングによってアクセス時にサーバーで描画されたページです。
                </p>
                <p>{ message }</p>
            </main>
        </div>
    )
}

//getServerSidePropsはページへのリクエストがある度に実行される。
export const getServerSideProps : GetServerSideProps<SSRProps> = async (
    context
) => {
    const timestamp = new Date().toLocaleString()
    const message = `${timestamp}にこのページのgetServerSidePropsが実行されました`
    console.log( message )

    return {
        props:{
            message,
        },
    }
}

export default SSR


//getServerSidePropsの引数のcontextでは、getStaticPropsのcontextで参照できるデータに加えて
//リクエスト情報なども参照できる。

//req  リクエスト情報やクッキー
//res  クッキーをセット、レスポンスヘッダーを書き換える。
//query  クエリをオブジェクトにしたもの
//resolvedUrl  アクセスのあったパス