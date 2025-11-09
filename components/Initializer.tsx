"use client"

import { useGlobalState } from "@/app/context/GlobalState"
import { useEffect } from "react"

interface InitializerProps {
    userDetails: Record<string, any>
}

const Initializer = ({ userDetails }: InitializerProps) => {

    const { state, handleStateChange } = useGlobalState()

    useEffect(() => {
        console.log(userDetails, "User details in Initializer")
        handleStateChange("userId", userDetails.userId)
        handleStateChange("email", userDetails.email)
        handleStateChange("name", userDetails.name)
        console.log(state, "State in Initializer")
    }, [])

    return null
}

export default Initializer