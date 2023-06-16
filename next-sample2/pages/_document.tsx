//SSRやSSG使用時に、サーバーサイドでスタイルを適用させるための設定を記述する。
//getInitialPropsのメソッドを実装する。

//カスタムドキュメントと呼ばれる仕組みで、デフォルトで生成せれるページ設定のうち、htmlやheadなどの要素に関わる部分を上書きする。



import Document , { DocumentContext } from "next/document";
import{ ServerStyleSheet } from 'styled-components';

//デフォルトのDoucumentをMyDoucumentで上書き
export default class MyDocument extends Document {
  static async getInitialProps( ctx: DocumentContext ){
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try{

      ctx.renderPage = () => originalRenderPage( {
        enhanceApp : ( App ) => ( props ) => sheet.collectStyles( <App{...props } /> ),
      })

      //初期値を流用
      const initialProps = await Document.getInitialProps( ctx )

      //initialPropsに加えてstyleを追加して返す。
      return{
        ...initialProps,
        styles:[
          //もともとのstyle
          initialProps.styles,
          //styled-componentsのstyle
          sheet.getStyleElement()
        ],
      }

    }finally{
      sheet.seal()
    }

  }
}
