//PresentationalComponent

//見た目を実装するコンポーネント
//基本的にpropsで渡されたデータをもとに適切なUIパーツを表示することだけを行う。
//スタイルの適用もこのコンポーネントで実施する。

//内部に状態を持たず、APIの呼び出しなどの副作用も実施しない。
//propsのみに依存することで、同じpropsに対して常に同じものが表示されるため
//デザインに関してデバックが容易になる。
//また、デザインだけを修正した場合にも、振る舞いや外側の影響を考える必要がなくなる。

//アトミックデザインでは、小さなパーツごとにコーポネントを実装し、組み合わせ、複雑なコーポネントを実装する。
//こうして、見た目と振る舞いで明確に分けることにより、影響範囲を限定し、再利用性を高める設計

//以下はシンプルなボタンコンポーネントを実装したものである。

import '.style.css'

type ButtonProps = {
    label : string
    text : string
    disabled : boolean
    onClick : React.MouseEventHandler<HTMLButtonElement>
}

//ラベルとボタンを表示するコンポーネント
export const Button = ( props : ButtonProps ) => {
    const { label , text , disabled , onClick } = props

    //propsで渡されたデータを元に見た目を実装する。
    return(
        <div className="button-container">
            <span>{ label }</span>
            <button disabled={ disabled } onClick={ onClick }>
                { text }
            </button>
        </div>
    )
}