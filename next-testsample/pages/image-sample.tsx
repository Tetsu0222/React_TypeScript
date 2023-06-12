//画像の表示

//ビルドイン機能で画像のパフォーマンスを最適化できる。
//Imageコンポーネントを使用することで、サーバーサイドで画像の最適化を実行する。
//Imageはimgを拡張したコンポーネントで、渡す値や属性は基本的にimgと同じだが
//widthとheightを渡さないとエラーとなる。


import{ NextPage } from 'next';
import Image from 'next/image';

//画像ファイルをインポートする。
import BibleImage from '../public/images/cat-g5f098016c_640.jpg'

const ImageSample : NextPage<void> = ( props ) => {
    return (
        <div>
            <h1>画像表示の比較</h1>
            <p>imgタグで表示した場合</p>
            <img src="/images/cat-g5f098016c_640.jpg"/>
            <p>Imageコンポーネントを使用して表示</p>
            <Image src={ BibleImage } />
            <p>Imageで表示した場合は、事前に描画エリアが確保される。</p>
        </div>
    )
}

export default ImageSample
