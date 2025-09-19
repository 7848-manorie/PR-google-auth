import React, { useState, useContext } from "react";
import { useGoogleLogin, googleLogout } from "@react-oauth/google";

const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const handleLoginSuccess = async (tokenResponse) => {
    try {
      const res = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        }
      );
      const profile = await res.json();
      console.log("User Profile:", profile);
      setUser(profile); // contains { name, email, picture }
    } catch (err) {
      console.error("Failed to fetch user info", err);
    }
  };

  const handleLogout = () => {
    googleLogout();
    setUser(null);
    console.log("User logged out");
  };

  const login = useGoogleLogin({
    onSuccess: handleLoginSuccess,
    onError: (err) => console.log("Login Failed:", err),
  });

  return (
    <AuthContext.Provider value={{ user, handleLogout }}>
      {!user ? (
        <div className="flex items-center justify-center h-screen bg-gray-50">
          {/* Card */}
          <div className="bg-white rounded-2xl shadow-md px-10 py-8 flex flex-col items-center">
            <img
              src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_92x30dp.png"
              alt="Google"
              className="w-28 mb-6"
            />
            <h1 className="text-xl font-semibold text-gray-700 mb-2">
              Sign in to continue
            </h1>
            <p className="text-gray-500 text-sm mb-6">Use your Google Account</p>

            {/* Custom Google Button */}
            <button
              onClick={() => login()}
              className="flex items-center gap-3 px-6 py-2 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50 transition"
            >
              <img
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google"
                className="w-5 h-5"
              />
              <span className="text-gray-700 font-medium">
                Sign in with Google
              </span>
            </button>
          </div>
        </div>
      ) : (
        <>
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
  {/* Google Logo */}
  <div className="flex flex-col items-center bg-white rounded-2xl shadow-md p-8">
    <img
      src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_92x30dp.png"
      alt="Google"
      className="w-24 mb-6"
    />

    {/* Welcome Text */}
    <h1 className="text-2xl font-semibold">Hi {user.name}</h1>

    {/* Email */}
    <span className="text-gray-700 text-sm">{user.email}</span>

    {/* Extra Info */}
    <p className="text-gray-600 text-sm mt-2">I’m a Full Stack Developer</p>
    <p className="text-gray-600 text-sm">Pursuing Bachelors in Computer Engineering</p>

    {/* Profile + Logout */}
    <div className="flex flex-col items-center gap-4 mt-6">
      <img
        src={user.picture}
        alt="profile"
        className="rounded-full w-16 h-16 border"
      />
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
      >
        Logout
      </button>
    </div>
  </div>

  {/* Footer */}
  <p className="text-sm text-gray-500 mt-6">English (United States)</p>
</div>

          {children}
        </>
      )}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
