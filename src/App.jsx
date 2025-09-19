import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Login from './components/Login'
// import DoctorList from './components/DoctorList'
// import BookAppointment from './components/BookAppointment'
import { useAuth } from './providers/AuthProvider'


export default function App() {
  const { user, logout } = useAuth()

  return (
    <div className="p-6">
      <nav className="flex justify-between mb-6">
        <div>
          {user ? (
            <>
              {/* <span className="mr-4">{user.email}</span> */}
              {/* <button onClick={logout} className="bg-red-500 text-white px-3 py-1 rounded">Logout</button> */}
            </>
          ) : (
            <Link to="/login" className="bg-blue-500 text-white px-3 py-1 rounded">Login</Link>
          )}
        </div>
      </nav>

      <Routes>
        {/* <Route path="/" element={<DoctorList />} /> */}
        <Route path="/login" element={<Login />} />
        {/* <Route path="/book/:doctorId" element={<BookAppointment />} /> */}
      </Routes>
    </div>
  )
}
