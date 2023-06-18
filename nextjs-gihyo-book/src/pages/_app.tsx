import 'styles/globals.css' //baseUrlから見てのパスへ変更する。
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

