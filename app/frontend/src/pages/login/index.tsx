import LoginForm from '../../components/LoginForm'
import RedirectButton from '../../components/RedirectButton'

export default function Login() {
  return (
    <div>
      <LoginForm />
      <RedirectButton
        path="/signin"
        name="Sign in"
        clearToken={true}
      />
    </div>
  )
}
