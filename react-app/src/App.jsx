import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth } from '@supabase/auth-ui-react';
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Index from './Index.jsx';
import Data from './Data.jsx';

const supabase = createClient("https://ohvjoekcangwhrpwqcpw.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9odmpvZWtjYW5nd2hycHdxY3B3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxOTE0NzcsImV4cCI6MjA1ODc2NzQ3N30.NSkMSsN3lH0Bmgu6kuCinn0B7kY0L460D3Af142CEzc");



function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/Data.jsx" element={<Data />} />
    </Routes>
  );
}

export default App;
