import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom';
import Index from './Index.jsx';
import Data from './Data.jsx';
import Login from "./Login.jsx";

const supabase = createClient("https://ohvjoekcangwhrpwqcpw.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9odmpvZWtjYW5nd2hycHdxY3B3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxOTE0NzcsImV4cCI6MjA1ODc2NzQ3N30.NSkMSsN3lH0Bmgu6kuCinn0B7kY0L460D3Af142CEzc");

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const checkSession = async () => {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !sessionData.session) {
        //console.warn("No session found:", sessionError);
        setSession(null);
      } else {
        setSession(sessionData.session);
      }
      setLoading(false);
    };
    checkSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/home" element={<Index />} />
      <Route path="/login" element={session ? <Navigate to="/home" replace /> : <Login />} />
      <Route path="/Data.jsx" element={session ? <Data /> : <Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
