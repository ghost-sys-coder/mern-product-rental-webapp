import { SignIn } from "@clerk/clerk-react"

const Login = () => {
  return (
    <SignIn signUpUrl="/register" />
  )
}

export default Login