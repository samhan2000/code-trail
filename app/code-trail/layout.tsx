'use client'

import { Sidebar } from "@/components/layout/sidebar";
import Footer from "@/components/ui/footer";
import TopNav from "@/components/ui/TopNav";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useGlobalState } from "../context/GlobalState";
import Initializer from "@/components/Initializer";
import Loader from "../common/components/loader";
import { PageTransitionWrapper } from "../common/components/PageTransitionWrapper";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const [modalOpen, setModalOpen] = useState(false)

    const [email, setEmail] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [userDetails, setUserDetails] = useState({})

    const { data: session, status } = useSession();

    console.log(session, status, "Session And status")

    useEffect(() => {


        if (status === "unauthenticated") {
            signIn("nest-oidc");
        } else if (
            status === "authenticated" &&
            session?.user?.email &&
            session.user.email !== email
        ) {
            setEmail(session.user.email);
            setUserDetails(session.user)
            setLoading(false)
        }
    }, [status, session?.user?.email]);


    const handleModalClick = () => {
        setModalOpen(!modalOpen)
    }

    if (loading) return <div className="fixed inset-0 flex items-center justify-center">
        <div className="spinner border-t-2 border-primary rounded-full w-12 h-12 animate-spin"></div>
    </div>
    return (
        <>
            <Initializer userDetails={userDetails} />
            <Loader />
            <TopNav onModalClick={handleModalClick} />
            {modalOpen && <Sidebar onClose={handleModalClick} />}
            <div style={{ width: '80%', margin: '0 auto' }}>
                {/* <PageTransitionWrapper> */}
                {children}
                {/* </PageTransitionWrapper> */}
            </div>
            <Footer />
        </>
    );
}
