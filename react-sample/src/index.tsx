import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';  //App.jsからApp関数を取り込んでいる。
import reportWebVitals from './reportWebVitals';

//index.htmlにあるrootをIDに持つ要素を指定している。
//呼び出し先(index.html)で描画されるのが、以下の変数でrender()メソッドを呼び出したものになる。
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

//描画するJSXタグを指定している。
//Appはsrc/App.tsxからインポートしたものを使用している。
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

//renderの引数にHTMLタグのようなものをそのまま記述している。
//これは、JSXがJSやTSの中に、HTMLのタグをそのまま書き込めるようなものである。
//これらのタグのことをJSXタグと呼ぶ。
//なお、JSXはJSを拡張した構文のことである。

//トップのReact.StrictModeは、そのままStrictを有効化している。
//Appは、App.tsxからインポートしたものを使用しており、別ファイルでHTMLの要素を返している。
//その返されている要素が、ブラウザで表示されている内容である。



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
