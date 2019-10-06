const API_KEY = "e8146f65b965e0a1cb0600c774f8a2a6";

// fetching popular movies
export const popular_movie = async(e) => {
    const MOVIE_RESULTS = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
    return MOVIE_RESULTS.json();
}

// fetching top rated movies
export const toprated_movie = async(e) => {
    const MOVIE_RESULTS = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`);
    return MOVIE_RESULTS.json();
}

// fetching upcoming movies
export const upcoming_movie = async(e) => {
    const MOVIE_RESULTS = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`);
    return MOVIE_RESULTS.json();
}

// BASIC URLS
// UPCOMING
export const BASIC_UPCOMING_URL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=`;

// TOP RATED
export const BASIC_TOPRATED_URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=`;

// POPULAR
export const BASIC_POPULAR_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=`;

// SIDEBAR GENRES
export const BASIC_SIDEBAR_GENRES_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=e8146f65b965e0a1cb0600c774f8a2a6&language=en-US`;

// GENRES SORT FUNCTIONS
export const BASIC_GENRES_SORT_URL = `https://api.themoviedb.org/3/discover/movie?api_key=e8146f65b965e0a1cb0600c774f8a2a6&language=en-US&sort_by=`;

export const FILLER_GENRES_SORT_URL = `&include_adult=false&include_video=false&page=1&with_genres=`;

export const FILLER_GENRES_NAVBUTTON_SORT_URL = `&include_adult=false&include_video=false&page=`;

export const END_GENRES_SORT_URL = `&with_genres=`;