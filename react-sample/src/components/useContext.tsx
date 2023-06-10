//useContextは、その名の通りContextから値を参照するためのフック
//useCOntext()の引数にContextを渡すことで、その値を取得することが可能

import React , { useContext } from "react";

type User = {
    id:number
    name:string
}

//ユーザーデータを保持するContextを作成する。
const UserContext = React.createContext< User | null >( null )

//孫コンポーネントでuseContext()を使用、親コンポーネントから値を取得している。
const GrandChild = () => {
    //useContextにContextを渡すことで値を取得する。
    const user = useContext( UserContext )

    return user !== null ? <p>Hello , { user.name }</p> : null
}


//子コンポーネント
const Child = () => {
    const now = new Date()

    return (
        <div>
            <p>Cureent:{ now.toLocaleString() }</p>
            <GrandChild />
        </div>
    )
}


//親コンポーネント
const Parent = () => {
    const user:User = {
        id:1,
        name:'Alice',
    }

    //Contextへ値を渡す。
    return (
        <UserContext.Provider value={ user }>
            <Child />
        </UserContext.Provider>
    )
}