const API_KEY = "e8146f65b965e0a1cb0600c774f8a2a6";

// fetching popular movies
export const UNUSED_popular_movie = async(e) => {
    const MOVIE_RESULTS = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
    return MOVIE_RESULTS.json();
}

// fetching top rated movies
export const UNUSED_toprated_movie = async(e) => {
    const MOVIE_RESULTS = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`);
    return MOVIE_RESULTS.json();
}

// fetching upcoming movies
export const UNUSED_upcoming_movie = async(e) => {
    const MOVIE_RESULTS = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`);
    return MOVIE_RESULTS.json();
}

// fetching popular
export const popular_movie = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=`;
// fetching top rated
export const toprated_movie = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=`;
// fetching upcoming movies
export const upcoming_movie = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=`;

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

export const FILLER_GENRES_SORT_URL = `&include_adult=false&include_video=false&page=1&with_genres=`;

export const FILLER_GENRES_NAVBUTTON_SORT_URL = `&include_adult=false&include_video=false&page=`;

export const END_GENRES_SORT_URL = `&with_genres=`;

/*
sortChangeTitleAsc = async () => {
    this.setState({ MOVIES: []})
    sort = 'original_title.asc'
    fetch(`${BASIC_GENRES_SORT_URL}${sort}${FILLER_GENRES_SORT_URL}${count}${END_GENRES_SORT_URL}${this.props.match.params.name}`)
    .then(response => response.json())
    .then(DATA => this.setState({ MOVIES: DATA.results }))
}

sortChangePopular = async () => {
    this.setState({ MOVIES: []})
    sort = 'popularity.desc'
    fetch(`${BASIC_GENRES_SORT_URL}${sort}${FILLER_GENRES_SORT_URL}${count}${END_GENRES_SORT_URL}${this.props.match.params.name}`)
    .then(response => response.json())
    .then(DATA => this.setState({ MOVIES: DATA.results }))
}

sortChangeVoteAvg = async () => {
    this.setState({ MOVIES: []})
    sort = 'vote_average.desc'
    fetch(`${BASIC_GENRES_SORT_URL}${sort}${FILLER_GENRES_SORT_URL}${count}${END_GENRES_SORT_URL}${this.props.match.params.name}`)
    .then(response => response.json())
    .then(DATA => this.setState({ MOVIES: DATA.results }))
}

sortChangeReleaseDate = async () => {
    this.setState({ MOVIES: []})
    sort = 'release_date.desc'
    fetch(`${BASIC_GENRES_SORT_URL}${sort}${FILLER_GENRES_SORT_URL}${count}${END_GENRES_SORT_URL}${this.props.match.params.name}`)
    .then(response => response.json())
    .then(DATA => this.setState({ MOVIES: DATA.results }))
}
*/