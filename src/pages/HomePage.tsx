import { Typography, Container } from "@mui/material";
import MovieTable from "../components/MovieTable";
import LogInPage from "./LogInPage";
import { useCreateRequestTokenQuery } from "../services/authApi";

export default function HomePage() {
  const sessionId = localStorage.getItem("session_id");
  const { data, isLoading } = useCreateRequestTokenQuery();

  if (isLoading) {
    return (
      <Container sx={{ mt: 5, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Загрузка...
        </Typography>
      </Container>
    );
  }

  const redirectUrl = `${window.location.origin}/auth`;
  const loginUrl = `https://www.themoviedb.org/authenticate/${data?.request_token}?redirect_to=${redirectUrl}`;

  return (
    <Container sx={{ mt: 5, textAlign: "center" }}>
      {!sessionId ? (
        <>
          <Typography variant="h5" gutterBottom>
            Пожалуйста, авторизуйтесь
          </Typography>
          <LogInPage isLoading={isLoading} loginUrl={loginUrl} />
        </>
      ) : (
        <MovieTable />
      )}
    </Container>
  );
}
