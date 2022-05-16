function setHistoryMovie(movie, mediaType) {
    let historyMovies = JSON.parse(localStorage.getItem("recently-movies")) || [];
    let existMovie = historyMovies.find(historyMovie => historyMovie.id === movie.id);
    if (!existMovie) {
        historyMovies.push({ ...movie, mediaType });
        localStorage.setItem("recently-movies", JSON.stringify(historyMovies));
    }
}

function getHistoryMovies() {
    return JSON.parse(localStorage.getItem("recently-movies")) || [];
}


export { setHistoryMovie, getHistoryMovies }