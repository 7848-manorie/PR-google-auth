import React from 'react'
import { useAuth } from '../providers/AuthProvider'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const { loginWithGoogle } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async () => {
    await loginWithGoogle()
    navigate('/')
  }

  return (
    <div className="flex flex-col items-center mt-20">
      <h2 className="text-xl mb-4">Login to Smart Healthcare</h2>
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Login with Google
      </button>
    </div>
  )
}
