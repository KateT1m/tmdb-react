import { CircularProgress, Container } from "@mui/material";
import { useEffect } from "react";
import { useCreateSessionMutation } from "../services/authApi";

export default function AuthPage() {
  const [createSession] = useCreateSessionMutation();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const requestToken = urlParams.get("request_token");

    if (!requestToken) return;

    createSession(requestToken)
      .unwrap()
      .then((res) => {
        localStorage.setItem("session_id", res.session_id);
        window.location.href = "/";
      });
  }, [createSession]);

  return (
    <Container>
      <CircularProgress />
    </Container>
  );
}
