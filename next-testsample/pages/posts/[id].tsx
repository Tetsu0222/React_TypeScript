//getStaticPathsを使用した複数ページのSSG

//ユーザー毎によって、表示するページそのものは共通だが、内容が異なる場合
//Next.jsの動的ルーティング機能を使用する。

//パスパラメータを使用して複数ページを1つのファイルで生成できる。
//動的ルーティングは次の2要素から成り立っている。

//[パスパラメータ].tsxのような[]で囲んだ特別なファイル名
//getStaticPropsとあわせてgetStaticPathsを利用する。

//getStaticPathsはgetStraticProps実行前に呼ばれる関数で、生成したいページのパスパラメータの組み合わせとフォールバックを返す。
//パスパラメータの組み合わせは配列でpathsに記述する。
//fallbackはgetStaticPathsが生成するページが存在しない場合の処理を記載する。

//ファイル名は[]で囲う。
//ここで囲われている値(id)がそれぞれパスパラメータを返している。


//型を利用するためにインポート
import { GetStaticPaths , GetStaticProps , NextPage  } from "next";

import Head from 'next/head';

//next/routerからuseRouterというフックを取り込む。
import { useRouter } from "next/router";

import { ParsedUrlQuery } from "querystring";

type PostProps = {
    id:string
}

const Post: NextPage<PostProps> = ( props ) => {
    const { id } = props
    const router = useRouter()

    //フォールバック向けの表示を設定
    if( router.isFallback ){
        return <div>Loading...</div>
    }

    return(
        <div>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <p>このページは静的サイト生成によってビルド時に生成されたページです。</p>
                <p>{`/posts/${id}に対応するページです`}</p>
            </main>
        </div>
    )
}

//getStaticPathsは生成したいエージのパスパラメータの組み合わせを返す。
//このファイルはpages/posts/[id].tsxなので、パスパラメータとしてidの値を返す必要がある。
export const getStaticPaths : GetStaticPaths = async () => {

    //それぞれのページのパスパラメータをまとめたもの
    const paths = [
        {
            params:{
                id:'1',
            },
        },
        {
            params:{
                id:'2',
            },
        },
        {
            params:{
                id:'3',
            },
        },
    ]

    //fallcackをfalseにすると、pathsで定義されたページ以外は404ページを表示
    return { paths , fallback : false }
}


//パラメータの型を定義
interface PostParams extends ParsedUrlQuery{
    id:string
}

//getStaticPaths実行後に、それぞれのパスに対してgetStaticPropsが実行される。
export const getStaticProps : GetStaticProps <PostProps , PostParams > = async ( context ) => {
    return {
        props : {
            //paramsにgetStaticPathsで指定した値がそれぞれ入っている。
            id : context.params![ 'id' ] ,
        },
    }
}

export default Post


//fallbackにtrueを指定した場合は、最初のリクエストとそれ以降のリクエストで挙動が異なる。
//一番最初に訪れたユーザーに対しては、フォールバックページを最初に表示する。
//ここで表示されるのは、ページコンポーネントのpropsが空の状態で描画されたページ

//サーバーサイドではリクエストのパスに対するgetStaticPropsを実行
//getStaticPropsが返したpropsはページを表示しているクライアントに送られ再描画される。

//また、サーバーサイドでpropsを元にページを描画、その結果を保存する。
//その後、同じパスに対してリクエストが来た場合、保存しているページを返す。