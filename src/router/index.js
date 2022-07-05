import Home from '../pages/home';
import Trending from '../pages/trending';
import Movies from '../pages/movies';
import TvShows from '../pages/TvShows';
import Details from '../pages/details';
import WatchMovie from '../pages/watch/WatchMovie';
import WatchTv from '../pages/watch/WatchTv';
import Search from '../pages/search';
import SearchResult from '../pages/search/SearchResult';
import Login from '../pages/login';
import Favorites from '../pages/favorites';

export const publicRoutes = [
    {
        path: '/',
        element: Home,
    },
    {
        path: '/trending',
        element: Trending,
    },
    {
        path: '/movies',
        element: Movies,
    },
    {
        path: '/tvshows',
        element: TvShows,
    },
    {
        path: '/details/:mediaType/:id',
        element: Details,
    },
    {
        path: '/watch/movie/:id',
        element: WatchMovie,
    },
    {
        path: '/watch/tv/:id/season/:season/esp/:esp',
        element: WatchTv,
    },
    {
        path: '/search',
        element: Search,
    },
    {
        path: '/results',
        element: SearchResult,
    },
    {
        path: '/login',
        element: Login,
        layout: null,
    },
];

export const privateRoutes = [
    {
        path: '/favorites',
        element: Favorites,
    },
];
