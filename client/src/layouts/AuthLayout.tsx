import { useSession } from "@clerk/clerk-react";
import { Outlet } from "react-router-dom";
import Loading from "@/components/shared/Loading";

const AuthLayout = () => {
    const { isLoaded } = useSession();


    return (
        <main className="auth">
            {isLoaded ? (<Outlet />) : (<Loading />)}
        </main>
    )
}


export default AuthLayout;