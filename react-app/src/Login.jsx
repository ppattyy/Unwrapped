import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
      const handler = (event) => {
        if (event.target.tagName.toLowerCase() === "a") {
          setTimeout(() => {
            setTitle(findButtonText());
          });
        }
      };
      document.body.addEventListener("click", handler);
  
      return () => document.body.removeEventListener("click", handler);
    }, []);

    useEffect(() => {
      const checkSession = async () => {
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          navigate("/home");
        }
      };
      checkSession();
    
      const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
        if (event === "SIGNED_IN") {
          navigate("/home");
        }
      });
    
      return () => {
        authListener.subscription.unsubscribe();
      };
    }, [navigate]);
  
    return (
      <>
        <div className="login-container">
        <h1 className="mb-10"><span className='accent text-5xl font-extrabold'>Unwrapped</span></h1>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          providers={[]}
        />
        </div>

      </>
    );
  }

export default Login