// общие компоненты
import HomePage from 'app_components/pages/home-page/HomePage';
import NotFoundPage from 'app_components/pages/not-found-page/NotFoundPage';

// список пользователей
import UsersToolbar from 'app_components/pages/users-page/UsersToolbar';
import UsersPage from 'app_components/pages/users-page/UsersPage/UsersPage';

// карточка пользователя
import UserCardPage from 'app_components/pages/user-card-page/UserCardPage';

// список фильмов
import MoviesToolbar from 'app_components/pages/movies-page/MoviesToolbar/MoviesToolbar';
import MoviesList from 'app_components/pages/movies-page/MoviesList/MoviesList';
import MovieItem from 'app_components/pages/movies-page/MovieItem/MovieItem';
import MoviesPaging from 'app_components/pages/movies-page/MoviesPaging/MoviesPaging';

// карточка фильма
import MovieCard from 'app_components/pages/movie-details-page/MovieCard/MovieCard';
import Credits from 'app_components/pages/movie-details-page/Credits/Credits';
import CrewNames from 'app_components/pages/movie-details-page/CrewNames/CrewNames';
import MovieField from 'app_components/pages/movie-details-page/MovieField/MovieField';
import MoviePlayer from 'app_components/pages/movie-details-page/MoviePlayer/MoviePlayer';
import MovieTopInfo from 'app_components/pages/movie-details-page/MovieTopInfo/MovieTopInfo';

export {
  HomePage,
  NotFoundPage,

  UsersToolbar,
  UsersPage,
  UserCardPage,

  MoviesToolbar,
  MoviesList,
  MovieItem,
  MoviesPaging,

  MovieCard,
  Credits,
  CrewNames,
  MovieField,
  MoviePlayer,
  MovieTopInfo
};