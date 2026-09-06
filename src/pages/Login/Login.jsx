import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleModeChange = (m) => {
    setMode(m);
    setMessage('');
  };

  const handleDemoAuth = (e) => {
    e.preventDefault();
    const studentName = name.trim() || 'Student';
    localStorage.setItem(
      'nipathDemoUser',
      JSON.stringify({ name: studentName, email, mode })
    );
    setMessage(`Demo login successful. Welcome, ${studentName}. Redirecting to your dashboard...`);
    setTimeout(() => {
      navigate('/dashboard');
    }, 500);
  };

  return (
    <main className="auth-page">
      <div className="container auth-wrap">
        <section className="auth-visual">
          <div className="eyebrow hero-eyebrow">✦ YOUR COLLEGE JOURNEY</div>
          <h1>
            One account.<br />
            <span>Your whole plan.</span>
          </h1>
          <p>
            Save colleges, keep your matches, organize your shortlist and continue your admission planning from one demo account.
          </p>
          <img src="/roadmap-illustration.svg" alt="Admission planning illustration" />
        </section>

        <section className="auth-card">
          <div className="auth-tabs">
            <button
              id="loginTab"
              type="button"
              className={`auth-tab ${mode === 'login' ? 'active' : ''}`}
              onClick={() => handleModeChange('login')}
            >
              Login
            </button>
            <button
              id="signupTab"
              type="button"
              className={`auth-tab ${mode === 'signup' ? 'active' : ''}`}
              onClick={() => handleModeChange('signup')}
            >
              Create account
            </button>
          </div>

          <div className="eyebrow">DEMO ACCOUNT</div>
          <h2 id="authTitle">
            {mode === 'login' ? 'Welcome back' : 'Create your NIPATH account'}
          </h2>
          <p className="muted" id="authSub">
            {mode === 'login'
              ? 'Use any email and password for this demo. No real account is created.'
              : 'Create a demo profile to test the NIPATH experience.'}
          </p>

          <form onSubmit={handleDemoAuth}>
            <label>
              Full name
              <input
                id="name"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={mode === 'signup'}
              />
            </label>
            <label>
              Email
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label>
              Password
              <input
                id="password"
                type="password"
                placeholder="Any demo password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <button className="btn auth-submit" id="authButton" type="submit">
              {mode === 'login' ? 'Login' : 'Create account'}
            </button>
          </form>

          {message && (
            <div id="authMessage" className="auth-message">
              <strong>Demo login successful.</strong> {message.replace('Demo login successful.', '')}
            </div>
          )}

          <p className="auth-note">🔒 Demo only. Do not enter real passwords or sensitive information.</p>
        </section>
      </div>
    </main>
  );
}
