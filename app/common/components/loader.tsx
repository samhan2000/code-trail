import { useGlobalState } from '@/app/context/GlobalState'
import React from 'react'

const loader = () => {

    const { state } = useGlobalState()

    return (
        state?.loader && state.loader.length > 0 &&
        <div className="fixed inset-0 flex items-center justify-center">
            <div className="spinner border-t-2 border-primary rounded-full w-12 h-12 animate-spin"></div>
        </div>
    )
}

export default loader