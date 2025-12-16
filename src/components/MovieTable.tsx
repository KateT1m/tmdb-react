import { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";

import { useGetPopularMoviesQuery } from "../services/movieApi";

import MovieTableUI from "./MovieTableUI";
import { createControlPanelConfig } from "../configs/createControlPanelConfig";

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

  const controlFields = [
    {
      type: "text" as const,
      label: "Год",
      key: "year",
    },
    {
      type: "text" as const,
      label: "Минимальный рейтинг",
      key: "rating",
    },
    {
      type: "select" as const,
      label: "Жанр",
      key: "genre",
      menuItems: [
        { value: "", label: "Все жанры" },
        ...genresList.map((genre) => ({
          value: genre.id.toString(),
          label: genre.name,
        })),
      ],
    },
    {
      type: "select" as const,
      label: "Язык",
      key: "language",
      menuItems: [
        { value: "", label: "Все языки" },
        { value: "en", label: "Английский" },
        { value: "fr", label: "Французский" },
        { value: "de", label: "Немецкий" },
        { value: "it", label: "Итальянский" },
        { value: "ru", label: "Русский" },
      ],
    },
    {
      type: "select" as const,
      label: "Сортировка",
      key: "sortBy",
      menuItems: [
        { value: "popularity.desc", label: "Популярность ↓" },
        { value: "popularity.asc", label: "Популярность ↑" },
        { value: "vote_average.desc", label: "Рейтинг ↓" },
        { value: "vote_average.asc", label: "Рейтинг ↑" },
        { value: "release_date.desc", label: "Дата ↓" },
        { value: "release_date.asc", label: "Дата ↑" },
      ],
    },
  ];

  const ControlPanelItems = createControlPanelConfig(
    controlFields,
    { year, rating, genre, language, sortBy },
    {
      year: setYear,
      rating: setRating,
      genre: setGenre,
      language: setLanguage,
      sortBy: setSortBy,
    }
  );

  useEffect(() => {
    setPage(1);
  }, [year, rating, genre, language, sortBy]);

  if (isLoading) return <CircularProgress />;

  return (
    <MovieTableUI
      data={data?.results || []}
      page={page}
      totalPages={totalPages}
      isFetching={isFetching}
      controlPanelItems={ControlPanelItems}
      columnsNumber={5}
      controlPanelNumber={ControlPanelItems.length}
      onChangePage={(value: number) => {
        setPage(value);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    />
  );
}
