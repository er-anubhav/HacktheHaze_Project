
import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import ResetPasswordForm from './ResetPasswordForm';

const AuthContainer = () => {
  const [view, setView] = useState<'login' | 'signup' | 'reset'>('login');

  return (
    <div className="max-w-md mx-auto mt-8">
      {view === 'login' && <LoginForm setView={setView} />}
      {view === 'signup' && <SignupForm setView={setView} />}
      {view === 'reset' && <ResetPasswordForm setView={setView} />}
    </div>
  );
};

export default AuthContainer;
