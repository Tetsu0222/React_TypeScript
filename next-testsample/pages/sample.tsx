
//型注釈がなくてもビルドが通る。
function Sample(){
    return <span>サンプルのページです。</span>
}

export default Sample


//npm run devでテストサーバーを起動
//表示されたURLに追加して、ファイル名（このファイルであればsample)を追加すると読み込みできる。

//npm run buildでビルドした際に、ページがどのタイプか確認できる。
//ServerがSSR、StaticとSSGがSSG、ISRはISR

//Next.jsでは実装する関数やその関数の返す値によって、Pagesのレンダリング手法が変わる。
//レンダリング手法を決定する主な要素はデータ取得の関数

//SSG
//getStaticProps

//SSR
//getServerSideProps

//ISR
//revalidateを返す getStaticProps

//CSR
//上記以外の任意の関数