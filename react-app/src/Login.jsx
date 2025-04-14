import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa} from '@supabase/auth-ui-shared'
import './Login.css'

const supabase = createClient("https://ohvjoekcangwhrpwqcpw.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9odmpvZWtjYW5nd2hycHdxY3B3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxOTE0NzcsImV4cCI6MjA1ODc2NzQ3N30.NSkMSsN3lH0Bmgu6kuCinn0B7kY0L460D3Af142CEzc");

function findButtonText() {
    const collection = document.getElementsByClassName("supabase-auth-ui_ui-button");
    for (let i = 0; i < collection.length; i++) {
      const innerHTML = collection[i].innerHTML.split(" ");
      if (innerHTML[0] === "Sign") {
        return(innerHTML[1]);
      }
    }
};

const Login = () => {
    const [title, setTitle] = useState("in");
  
    useEffect(() => {
        document.body.addEventListener('click', () => {
            if (event.target.tagName.toLowerCase() === 'a') {
                setTitle(findButtonText());
            }
        });
    }, []);
  
    return (
      <>
        <h1>Sign {title || "in"}</h1>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          providers={['spotify']}
        />
      </>
    );
  }

export default Login