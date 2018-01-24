let MovieData = require('./datastore.json');

class MovieStore {

    all() {
        return MovieData;
    }

    has(title) {
        let results = MovieData.filter(m => m.Title === title);

        return results.length > 0;
    }

    add(movie) {
        MovieData.push(movie);
    }

    find(title) {
        return MovieData.filter(m => m.Title === title);
    }

    searchByTitle(title) {
        return MovieData.filter(m => m.Title.includes(title));
    }

    update(title, updateMovie) {
        let movies = MovieData.filter(m => m.Title === title);

        if(movies.length < 0) {
            return false;
        } else {
            let movie = movies.pop();
            movie = Object.assign(movie, updateMovie);

            let otherMovies = MovieData.filter(m => m.Title !== title);
            MovieData = [movie, ...otherMovies];
            return true;
        }
    }

    remove(title) {
        MovieData = MovieData.filter(m => m.Title !== title);
    }
}

module.exports = new MovieStore();