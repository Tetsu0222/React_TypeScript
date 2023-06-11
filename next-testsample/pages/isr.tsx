//ISRによるページの実装

//インクリメンタル静的生成はSSGの応用とも言えるレンダリング手法
//ページの寿命を設定、寿命が過ぎたページについては最新の情報での再生成を試みて、静的ページを配信しつつ情報を更新できる。


//ISRにはrevalidateを返すgetStaticPropsを用いる。
//返したrecalidateの値が有効期間となり、その期間が過ぎたページは再生成される。


import { GetStaticPaths , NextPage , GetStaticProps } from "next";
import Head from 'next/head';
import { useRouter } from "next/router";

type ISRProps = {
    message : string
}

//ISRPropsを受け付けるNextPageの型
const ISR : NextPage<ISRProps> = ( props ) => {
    const { message } = props

    const router = useRouter()

    if( router.isFallback ){
        return <div>Loadeing...</div>
    }

    return(
        <div>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <p>このページはISRによってビルド時に生成されたページです。</p>
                <p>{ message }</p>
            </main>
        </div>
    )
}

export const getStaticProps : GetStaticProps<ISRProps> = async( contexct ) => {

    const timestamp = new Date().toLocaleString()
    const message = `${ timestamp }にこのページのgetStaticPropsが実行されました。`

    return {
        props : {
            message,
        },
        //ページの有効期間を秒単位で指定
        revalidate:60
    }
}

export default ISR



//一番初めにページへアクセスした場合はSSGの場合と同様で
//フォールバックページを表示してサーバー側で実行したgetStaticPropsを元にクライアントで再描画する。

//以降のリクエストに対しては、revaldateで指定した時間内の時はサーバーサイドで描画して保存したページを返す。
//有効期限を過ぎた後にリクエストがあった場合は、そのリクエストに対して現在保存しているページを返す。
//そして、getStaticPropsを実行、ページを描画して新しいキャッシュとして保存
