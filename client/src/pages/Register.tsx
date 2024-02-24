import { SignUp } from "@clerk/clerk-react"

const Register = () => {
  return (
    <SignUp signInUrl="/login" />
  )
}

export default Register