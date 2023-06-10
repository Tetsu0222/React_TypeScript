//useLayoutEffectは、副作用を実行するためのフックですが、実行されるタイミングはuseEffectとは異なる。

//useEffectは描画関数が実行し、DOMが更新され、画面に描画された後で実行する。
//useLayoutEffectはDOMが更新された後、画面に実際に描画される前に実行される。

//useEffectでは、localstorageに保存されている値を読み込んでlocaleに保存する。
//locakeはuseStateで初期値が渡されているため、初期描画ではデフォルト値のUS表記で表示
//その直後でlocalestorageに保存されていた表記へ変化する。
useLayoutEffect( () => {
    const saveLocale = localStorage.getItem( KEY_LOCALE )
    if( saveLocale !== null ){
        setLocale( getLocaleFromString( saveLocale ))
    }
} , [] )


//画面がリロードされる度に、一瞬だけUS表記で表示されてしまい、チラついているように見えてしまう。
//useLayoutEffectでは、初期描画が反映される前にlocalstorageからデータが読み込まれるため
//チラつきをなくすことが可能

//しかし、その反面、useLayoutEffectでは同期的に処理が実行されるため
//重い処理を実行すると画面への描画が遅れるため注意が必要