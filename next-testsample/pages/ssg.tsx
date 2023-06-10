//SSGによるページの実装
//getStaticPropsを使用

import{ GetStaticProps , NextPage , NextPageContext } from 'next'
import Head from 'next/head'

//ページコンポーネントのpropsの型の定義（ここでは空）
type SSGProps = {
    message:string
}

//SSGはgetStaticPropsが返したpropsを受け取ることができる。
//Nextpage<SSGProps>はmessage:stringのみを受け取って生成されるページの型
const SSG : NextPage<SSGProps> = ( props ) => {

    const { message } = props

    return (
        <div>
            <Head>
                <title>Static Generation</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main>
                <p>
                    このページは静的サイト生成によってビルド時に生成されたページです。
                </p>
                <p>{ message }</p>
            </main>
        </div>
    )
}

//getStaticPropsはビルド時に実行される。
//GetStaticProps<SSGProps>はSSGPropsを引数にとるgetStaticPropsの型
export const getStaticProps : GetStaticProps<SSGProps> = async( context ) => {
    const timestamp = new Date().toLocaleString()
    const message = `${timestamp}にgetStaticPropsが実行されました。`
    console.log( message )
    return{
        //ここで返したpropsを元にページコンポーネントを描画する。
        props:{
            message ,
        },
    }
}

export default SSG


//getStaticPropsはエクスポートする必要があり、同時に非同期関数としてasyncとともに定義する必要あり。
//また、引数にはContextが与えられる。このcontextにはビルド時に使用できるデータも含まれている。

//contextは実行関連の情報がまとまったオブジェクト
//context.localeのようなカタチでアクセスできる。

//params パスパラメータ　SSGの場合はgetStaticPaths関数を別途定義した時に参照可能
//locale 現在のローケル情報
//locales サポートしているローケルの配列
//defaultLocale デフォルトのローケル
//preview        Preview Modeかどうか
//previewData setPreviewDataによってセットされたデータ