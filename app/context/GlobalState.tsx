import { createContext, useContext, useState } from 'react'

const GlobalStateContext = createContext<any>({})

export const GlobalState = ({ children }: any) => {

    const [state, setState] = useState({
        loader: [] as Array<any>
    })

    const handleStateChange = (key: string, value: any) => {
        setState((prevVal: any) => ({ ...prevVal, ...{ [key]: value } }))
    }

    const loaderStack = (action: boolean) => {
        if (action) state.loader.push(0)
        else state.loader.pop()
    }

    return (
        <GlobalStateContext.Provider value={{ state, handleStateChange, loaderStack }}>
            {children}
        </GlobalStateContext.Provider>
    )
}

export const useGlobalState = () => useContext(GlobalStateContext)