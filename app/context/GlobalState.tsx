import { createContext, useContext, useState } from 'react'

const GlobalStateContext = createContext<any>({})

export const GlobalState = ({ children }: any) => {

    const [state, setState] = useState({})

    const handleStateChange = (key: string, value: any) => {
        setState((prevVal: any) => ({ ...prevVal, ...{ [key]: value } }))
    }

    return (
        <GlobalStateContext.Provider value={{ state, handleStateChange }}>
            {children}
        </GlobalStateContext.Provider>
    )
}

export const useGlobalState = () => useContext(GlobalStateContext)