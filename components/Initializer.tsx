"use client"

import { useGlobalState } from "@/app/context/GlobalState"
import { useEffect } from "react"

interface InitializerProps {
    userDetails: Record<string, any>
}

const Initializer = ({ userDetails }: InitializerProps) => {

    const { handleStateChange } = useGlobalState()

    useEffect(() => {
        handleStateChange("userId", userDetails.userId)
        handleStateChange("name", userDetails.name)
    }, [])

    return null
}

export default Initializer