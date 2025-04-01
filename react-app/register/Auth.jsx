import { useEffect} from "react"; 
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js"; // for supabase's function
import { ThemeSupa, Auth } from "@supabase/auth-ui-react"; // for Auth UI

const supabase = createClient(
  import.meta.env.VITE_REACT_APP_SUPABASE_URL,
  import.meta.env.VITE_REACT_APP_ANON
); 

const AuthUI = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate("/dashboard");
      }
    };
    checkSession();
  }, []);

  supabase.auth.onAuthStateChange((event) => {
    if (event == "SIGNED_IN") {
      navigate("/dashboard");
    }
  });

  return (
    <div className="auth">
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        theme="dark"
        providers={["github", "twitter"]}
        view="sign_in"
      />
    </div>
  );
};

export default AuthUI;