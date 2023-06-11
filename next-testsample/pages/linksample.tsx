//リンク機能

//アプリ内の他のページに遷移するためのLinkコンポーネントが用意されている。
//通常のページ遷移のように遷移先のページのHTMLファイルなどを取得して描画するのではなく、クライアントサイドで新しいページを描画する。
//新しいページを描画するために必要なデータはあらかじめ非同期に取得されている。
//よって、高速なページ遷移が可能となる。

//Linkコンポーネントを使用するためのインポート
import Link from 'next/link'
import { useRouter } from 'next/router'

/*
//遷移するためのリンクを作成
<Link href="/ssr">
    <a>Go TO SSR</a>
</Link>
*/


/*
//hrefの文字列でそのまま指定する以外にも、オブジェクトを指定できる。
<Link href = "/ssg?keyword=next">
    <a>Go TO SSG</a>
</Link>

<Link href = {{ 
    pathname : '/ssg',
    query: { keyword:'hello'},
}}>
    <a>GO TO SSR</a>
</Link>
*/


/*
//a要素の代わりにボタンなどを使用すると、Linkの子コンポーネントにonClickコールバックが渡され、ページ遷移できる。
<Link href="/ssg">
    <button>Jump to SSG page</button>
</Link>
*/


//routerオブジェクトのpush()メソッドでも遷移できる。
const router = useRouter()

//onSubmitのコールバックでpushを設定
const onSubmit = () => {
    router.push( '/ssr' )

    //文字列の代わりにオブジェクトで指定する。
    router.push( {
        pathname : '/ssg',
        query:{ keyword : 'hello' },
    })
}


//routerオブジェクトには、リロードを行うものや、ページを戻るためのものも用意されている。


//ページをリロードする。
router.reload()

//前のページに戻す。
router.back()

//遷移開始時のイベントを購読する。
router.events.on( 'routeChangeStart' , ( url , { shallow }) => {
    //urlには遷移先のパスを与える。
    //shallowはシャロールーティング（パスのみが置き換わる遷移）の場合はtrueになる。
})

//遷移完了時のイベントを購読する。
router.events.on( 'routeChangeComplete' , ( url , { shallow }) => {
    //urlには遷移先のパスが与えられる。
    //shallowはシャロールーティング（パスのみが置き換わる遷移）の場合はtrueになる。
})

