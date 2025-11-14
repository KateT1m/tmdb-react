import { Button, CircularProgress } from "@mui/material";
import { MyContainer } from "../components/MyContainer";
import React from "react";

interface LogInPageProps {
  isLoading: boolean;
  loginUrl: string;
}

const LogInPage: React.FC<LogInPageProps> = ({ isLoading, loginUrl }) => {
  return (
    <MyContainer sx={{ mt: 5, textAlign: "center" }}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Button variant="contained" color="primary" href={loginUrl}>
          Войти через TMDB
        </Button>
      )}
    </MyContainer>
  );
};

export default LogInPage;
