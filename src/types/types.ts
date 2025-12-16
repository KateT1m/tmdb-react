export interface IMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  popularity: number;
}

export interface IPopularMovies {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface IAccount {
  id: number;
  name: string | null;
  username: string;
  iso_3166_1: string;
  iso_639_1: string;
  include_adult: boolean;
  avatar: {
    gravatar: {
      hash: string | null;
    };
    tmdb: {
      avatar_path: string | null;
    };
  };
}

export interface MoviesQueryParams {
  page?: number;
  release_year?: number;
  rating_gte?: number;
  genre?: string;
  language?: string;
  sort_by?: string;
}

export interface IMenuItem {
  value: string;
  label: string;
}

export interface IControlItem {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  controlType: "text" | "select";
  menuItems?: IMenuItem[];
}
