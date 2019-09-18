const API_KEY = "e8146f65b965e0a1cb0600c774f8a2a6";


// fetching popular movies
export const movie = async(e) => {
    const MOVIE_RESULTS = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
    return MOVIE_RESULTS.json();
}