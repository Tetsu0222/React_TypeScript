//SSGによるページの実装
//getStaticPropsを使用せず、データ取得を一切行わずに実装して生成

//型のために導入
import{ NextPage } from 'next'

//Next.jsの組み込みコンポーネント
import Head from 'next/head'

//ページコンポーネントのpropsの型の定義（ここでは空）
type SSGProps = {}

//SSG向けのページを実装
//NextPageはNext.jsのPages向けの型
//NextPage<props>でpropsが入るPageであることを明治
const SSG : NextPage<SSGProps> = () => {
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
            </main>
        </div>
    )
}

export default SSG

//NextPageはpagesのための型
//受け付けるpropsを決め、NextPage<Props>のように指定する。

//npm run buildでビルド実行後、npm run devでサーバー起動
//ブラウザからアクセスすると実装したページを確認できる。