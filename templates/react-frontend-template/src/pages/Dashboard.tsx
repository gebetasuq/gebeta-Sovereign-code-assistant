import { useAuth } from '../context/AuthContext'

export default function Dashboard() {
  const { user, logout } = useAuth()

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>Welcome, {user?.full_name || user?.email}!</p>
      <button onClick={logout} className="mt-4 bg-red-600 text-white p-2 rounded">
        Logout
      </button>
    </div>
  )
}
