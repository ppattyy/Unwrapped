import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth } from '@supabase/auth-ui-react';
import {
  // Import predefined theme
  ThemeSupa,
} from '@supabase/auth-ui-shared'
import './App.css'

const supabase = createClient("https://ohvjoekcangwhrpwqcpw.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9odmpvZWtjYW5nd2hycHdxY3B3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxOTE0NzcsImV4cCI6MjA1ODc2NzQ3N30.NSkMSsN3lH0Bmgu6kuCinn0B7kY0L460D3Af142CEzc");

const App = () => <Auth supabaseClient={supabase} />


```
  const [colors, setColors] = useState([]);
  useEffect(() => {
    getColors();
  }, []);
  async function getColors() {
    const { data } = await supabase.from("sandbox").select();
    setColors(data);
  }

  return (
<ul>
{colors.map((color) => (
  <li key={color.id}>{color.color}</li>
))}
</ul>
```

export default App
