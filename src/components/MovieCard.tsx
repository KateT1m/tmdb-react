import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { IMovie } from "../types/types";

export default function MovieCard({ movie }: { movie: IMovie }) {
  return (
    <Card
      key={movie.id}
      sx={{
        p: 1,
        borderRadius: 2,
        boxShadow: "0px 4px 10px rgba(0,0,0,0.05)",
      }}
    >
      <CardMedia
        component="img"
        sx={{
          width: "100%",
          height: 240,
          objectFit: "cover",
          borderRadius: 1,
        }}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
            : "https://via.placeholder.com/300x450?text=No+Image"
        }
      />

      <CardContent>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          {movie.title}
        </Typography>
        <Typography variant="body2">⭐ {movie.vote_average}</Typography>
        <Typography variant="body2">📅 {movie.release_date}</Typography>
      </CardContent>
    </Card>
  );
}
