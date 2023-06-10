
//型注釈がなくてもビルドが通る。
function Sample(){
    return <span>サンプルのページです。</span>
}

export default Sample


//npm run devでテストサーバーを起動
//表示されたURLに追加して、ファイル名（このファイルであればsample)を追加すると読み込みできる。