import "./App.css";
import { useEffect, useState } from "react";
import { supabase } from "./lib/supabaseClient";
import Dashboard from "./pages/Dashboard";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";

export default function App() {
  const [session, setSession] = useState(null);
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Subscribe to login/logout events
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (session) {
    return <Dashboard session={session} />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        {showLogin ? (
          <LoginForm setSession={setSession} />
        ) : (
          <SignupForm setSession={setSession} />
        )}

        <p className="text-center mt-4 text-gray-600">
          {showLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setShowLogin(!showLogin)}
            className="text-blue-600 underline"
          >
            {showLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
