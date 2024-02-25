import { useEffect } from "react";
import { UserButton, useSession } from "@clerk/clerk-react";

const Home = () => {
  const { session, isSignedIn } = useSession();

  useEffect(() => {
    if (isSignedIn) {
      console.log(session.user)
    }
  }, [isSignedIn, session])

  return (
      <div className="bg-primary min-h-screen flex flex-col gap-2 text-white justify-center items-center">
          Home
      <UserButton afterSignOutUrl="/" showName />
      </div>
  )
}

export default Home