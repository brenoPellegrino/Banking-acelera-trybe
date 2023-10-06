import LoginForm from '../../components/LoginForm'
import RedirectButton from '../../components/RedirectButton'

export default function Login() {
  const token = localStorage.getItem("@token");

  if (token) {
    return window.location.href = "/home";
  }

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
