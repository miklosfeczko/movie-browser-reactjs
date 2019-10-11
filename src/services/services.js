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