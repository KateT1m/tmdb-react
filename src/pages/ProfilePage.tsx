import { Container, Typography, Avatar, Button } from "@mui/material";
import { useGetAccountQuery } from "../services/authApi";
import { Link } from "react-router-dom";

export default function ProfilePage() {
  const sessionId = localStorage.getItem("session_id");
  const { data, isLoading } = useGetAccountQuery(sessionId || "");

  if (!sessionId) return <Typography>Нет доступа</Typography>;
  if (isLoading) return <Typography>Загрузка...</Typography>;
  if (!data) return <Typography>Ошибка загрузки профиля</Typography>;

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
        component={Link}
        to="/"
      >
        Главная
      </Button>
      <Avatar
        sx={{ width: 120, height: 120, mx: "auto", mb: 2 }}
        src={
          data.avatar?.tmdb?.avatar_path
            ? `https://image.tmdb.org/t/p/w200${data.avatar.tmdb.avatar_path}`
            : undefined
        }
      />

      <Typography variant="h4">{data.username}</Typography>
      <Typography variant="subtitle1">ID: {data.id}</Typography>

      <Button
        variant="contained"
        color="secondary"
        sx={{ mt: 3 }}
        onClick={() => {
          localStorage.removeItem("session_id");
          window.location.href = "/";
        }}
      >
        Выйти
      </Button>
    </Container>
  );
}
