import {API_KEY} from '../services/ignore_this'


// BASIC URLS
// UPCOMING
export const BASIC_UPCOMING_URL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=`;

// TOP RATED
export const BASIC_TOPRATED_URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=`;

// POPULAR
export const BASIC_POPULAR_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=`;

// SIDEBAR GENRES
export const BASIC_SIDEBAR_GENRES_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;

// GENRES SORT FUNCTIONS
export const BASIC_GENRES_SORT_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=`;

export const FILLER_GENRES_SORT_URL = `&include_adult=false&include_video=false&page=`;

export const FILLER_GENRES_NAVBUTTON_SORT_URL = `&include_adult=false&include_video=false&page=`;

export const END_GENRES_SORT_URL = `&with_genres=`;

// SEARCH FETCHING PARAMS
export const BASIC_SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=`

export const BASIC_SEARCH_PAGE = `&page=`;

export const BASIC_SEARCH_END = `&include_adult=false`;

// PERSON FETCHING 
export const BASIC_PERSON_URL = `https://api.themoviedb.org/3/person/`;

export const BASIC_PERSON_END_URL = `?api_key=${API_KEY}&language=en-US`;

export const BASIC_PERSON_PICTURE_URL = `https://image.tmdb.org/t/p/original`

// MOVIE DETAILS FETCHING
export const BASIC_MOVIE_URL = `https://api.themoviedb.org/3/movie/`

export const BASIC_MOVIE_END_URL = `?api_key=${API_KEY}&language=en-US`

export const BASIC_MOVIE_CAST_END_URL = `/credits?api_key=${API_KEY}`

export const BASIC_MOVIE_POSTER_URL = `https://image.tmdb.org/t/p/original`;

// dummy placeholder text
export var dummy = {
    movieName : 'This movie does not exist.',
    personName : 'This person does not exist.',
    errorName : 'This Page Does not Exist',
    searchError : 'No matched results'
}
