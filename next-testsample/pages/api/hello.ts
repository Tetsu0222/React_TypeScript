//APIルート

//pages/api以下に置いたファイルではAPIを定義する。
//ページと同様にファイルの場所によってパスが決まる。
//ページで使う簡易的なAPIの実装、プロキシとして利用できる。

//ビルド時はこのAPIを使うことができないため
//SSGのgetStaticPathなどで呼ぶことはできない。

//以下のコードはサーバー起動後に、/api/helloを呼ぶとハンドラが実行される。
import type { NextApiRequest, NextApiResponse } from 'next'

type HelloResponse = {
  name: string
}

export default ( re1: NextApiRequest , res: NextApiResponse <HelloResponse> ) => {
  //ステータス200でオブジェクトを返す。
  res.status( 200 ).json( { name :'John Doe' })
}
