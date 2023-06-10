//useRouter

//ルーティングのためのフック
//関数コンポーネント内でルーティング情報にアクセスするためのフック
//Next.jsのnext/routerからインポートできる。

//また、ルーティング情報の他に、router.pushでページ遷移にも利用できる。

//インポート
import { useRouter } from "next/router";

//副作用を伴う処理用に導入
import { useEffect } from "react";


const page = () => {

    //useRouterの使用
    const router = useRouter()

    /* /userouterへ遷移するように定義
    useEffect( () => {
        router.push( '/userouter' )
    })
    */

    return <span>{ router.pathname }</span>

}

export default page