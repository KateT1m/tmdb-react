import { AppBar, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          gap: 2,
          py: 2,
        }}
      >
        <Button component={Link} to="/" variant="contained">
          Главная
        </Button>
        <Button component={Link} to="/profile" variant="contained">
          Профиль
        </Button>
      </Toolbar>
    </AppBar>
  );
}
