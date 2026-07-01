import LoginForm from "../components/LoginForm";

function Login() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <LoginForm role="student" />
    </div>
  );
}

export default Login;