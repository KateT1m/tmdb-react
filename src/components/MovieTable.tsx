import { useState, useEffect } from "react";
import { CircularProgress, Typography, Box, Pagination } from "@mui/material";

import { useGetPopularMoviesQuery } from "../services/movieApi";
import { IMovie } from "../types/types";
import MovieCard from "./MovieCard";
import ControlPanel, { IControlItem } from "./ControlPanel";

export default function MoviesList() {
  const [page, setPage] = useState<number>(1);
  const [year, setYear] = useState("");
  const [rating, setRating] = useState("");
  const [genre, setGenre] = useState("");
  const [language, setLanguage] = useState("");
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [genresList, setGenresList] = useState<{ id: number; name: string }[]>(
    []
  );

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${
        import.meta.env.VITE_API_KEY
      }`
    )
      .then((r) => r.json())
      .then((d) => setGenresList(d.genres));
  }, []);

  const { data, isFetching, isLoading } = useGetPopularMoviesQuery({
    page,
    release_year: year ? Number(year) : undefined,
    rating_gte: rating ? Number(rating) : undefined,
    genre: genre || undefined,
    language: language || undefined,
    sort_by: sortBy,
  });

  const totalPages = Math.min(data?.total_pages ?? 1, 500);

  const ControlPanelItems: IControlItem[] = [
    {
      label: "Год",
      value: year,
      onChange: (value: string | number) => setYear(value as string),
      controlType: "text",
    },
    {
      label: "Минимальный рейтинг",
      value: rating,
      onChange: (value: string | number) => setRating(value as string),
      controlType: "text",
    },
    {
      label: "Жанр",
      value: genre,
      onChange: (value: string | number) => setGenre(value as string),
      controlType: "select",
      menuItems: [
        { value: "", label: "Все жанры" },
        ...genresList.map((g) => ({
          value: g.id.toString(),
          label: g.name ?? g.id.toString(),
        })),
      ],
    },
    {
      label: "Язык",
      value: language,
      onChange: (value: string | number) => setLanguage(value as string),
      controlType: "select",
      menuItems: [
        { value: "", label: "Любой" },
        { value: "en", label: "Английский" },
        { value: "ru", label: "Русский" },
        { value: "fr", label: "Французский" },
      ],
    },
    {
      label: "Сортировка",
      value: sortBy,
      onChange: (value: string | number) => setSortBy(value as string),
      controlType: "select",
      menuItems: [
        { value: "popularity.desc", label: "Популярность ↓" },
        { value: "popularity.asc", label: "Популярность ↑" },
        { value: "vote_average.desc", label: "Рейтинг ↓" },
        { value: "vote_average.asc", label: "Рейтинг ↑" },
        { value: "release_date.desc", label: "Дата ↓" },
        { value: "release_date.asc", label: "Дата ↑" },
        { value: "title.asc", label: "Название A→Z" },
        { value: "title.desc", label: "Название Z→A" },
      ],
    },
  ];

  useEffect(() => {
    setPage(1);
  }, [year, rating, genre, language, sortBy]);

  if (isLoading) return <CircularProgress />;

  return (
    <div style={{ width: "100%", margin: 20 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Популярные фильмы
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 2,
          mb: 4,
        }}
      >
        <ControlPanel items={ControlPanelItems} />
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 3,
        }}
      >
        {data?.results.map((movie: IMovie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination
          page={page}
          count={totalPages}
          color="primary"
          onChange={(_, value) => {
            setPage(value);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      </Box>
      {isFetching && (
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <CircularProgress />
        </Box>
      )}
    </div>
  );
}
