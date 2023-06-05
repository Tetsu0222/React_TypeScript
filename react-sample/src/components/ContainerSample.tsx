
//Reactにおける型
//引数のpropsへ注釈を加えることで、親コンポーネントから与えることのできる値を制限できる。
//childrenを取る場合、型はReact.ReactNodeを指定する。


//Containerのpropsの型を定義する。
type ContainerProps = {
    title:string
    children:React.ReactNode
}

//引数のpropsを注釈型へ変更する。
const Container = ( props:ContainerProps ):JSX.Element => {
        
        const { title , children } = props

        return (
            <div style={ { background: 'red' }}>
                <span>{ title }</span>
                <div>{ children }</div>
            </div>
        )
}

const Parent = () => {

    return (
        <Container title="Hello">
            <p>ここの部分が背景色で囲まれる。</p>
        </Container>
    )
}


export default Parent