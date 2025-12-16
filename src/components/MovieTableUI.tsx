import { Box, CircularProgress, Pagination, Typography } from "@mui/material";
import ControlPanel from "./ControlPanel";
import MovieCard from "./MovieCard";
import { IControlItem, IMovie } from "../types/types";
import { MyContainer } from "./MyContainer";

interface IMovieTableUIProps {
  data: IMovie[];
  page: number;
  totalPages: number;
  isFetching: boolean;
  controlPanelItems: IControlItem[];
  onChangePage: (value: number) => void;
  controlPanelNumber: number;
  columnsNumber: number;
}

const MovieTableUI: React.FC<IMovieTableUIProps> = ({
  data,
  page,
  totalPages,
  isFetching,
  controlPanelItems,
  onChangePage,
  columnsNumber,
  controlPanelNumber,
}) => (
  <MyContainer>
    <Typography variant="h4" sx={{ mb: 3 }}>
      Популярные фильмы
    </Typography>
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: `repeat(${controlPanelNumber}, 1fr)`,
        gap: 2,
        mb: 4,
      }}
    >
      <ControlPanel items={controlPanelItems} />
    </Box>
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: `repeat(${columnsNumber}, 1fr)`,
        gap: 3,
      }}
    >
      {data?.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </Box>
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <Pagination
        page={page}
        count={totalPages}
        color="primary"
        onChange={(_, value) => onChangePage(value)}
      />
      {isFetching && (
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  </MyContainer>
);

export default MovieTableUI;
