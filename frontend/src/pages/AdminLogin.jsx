import LoginForm from "../components/LoginForm";

function AdminLogin() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <LoginForm role="admin" />
    </div>
  );
}

export default AdminLogin;