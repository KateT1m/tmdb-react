import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function RedirectRecovery() {
  const navigate = useNavigate();

  useEffect(() => {
    const redirect = sessionStorage.getItem("redirect");

    if (redirect) {
      sessionStorage.removeItem("redirect");
      setTimeout(() => {
        navigate(redirect);
      }, 50);
    }
  }, [navigate]);

  return null;
}
