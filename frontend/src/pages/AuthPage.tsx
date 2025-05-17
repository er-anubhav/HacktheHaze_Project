
import React from "react";
import { Navigate } from "react-router-dom";
import AuthContainer from "@/components/auth/AuthContainer";
import { useUser } from "@/context/UserContext";

const AuthPage = () => {
  const { user } = useUser();
  
  // Redirect if already logged in
  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container mx-auto py-12 px-4 max-w-5xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Hack The Haze</h1>
        <p className="text-xl text-gray-600 mb-8">Sign in to access the image scraper</p>
      </div>

      <AuthContainer />
    </div>
  );
};

export default AuthPage;
