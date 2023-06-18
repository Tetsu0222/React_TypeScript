//SSRでもstyled-componentsが作動するように変更

import Document , { DocumentContext , DocumentInitialProps } from 'next/document';
import{ ServerStyleSheet } from 'styled-components';

//デフォルトのページを上書き
export default class MyDocument extends Document {
  static async getInitialProps( 
    ctx: DocumentContext ,
    ) : Promise<DocumentInitialProps>{
      const sheet = new ServerStyleSheet()
      const originalRenderPage = ctx.renderPage

      try{
        ctx.renderPage = () => originalRenderPage( {
          enhanceApp : ( App ) => ( props ) => sheet.collectStyles( <App{...props } /> ),
        })

        const initialProps = await Document.getInitialProps( ctx )

        return{
          ...initialProps,
          styles:[
            <>
            { initialProps.styles }
            { sheet.getStyleElement() }
            </>,
          ],
        }

      }finally{
        sheet.seal()
      }

  }
}
