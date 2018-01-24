var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var paginate = require('./utils').paginate;
var makeResponse = require('./utils').makeResponse;
var isInvalidString = require('./utils').isInvalidString;

app.use(bodyParser.json({
    type: 'application/json'
}));

var MovieStore = require('./datastore');

app.get('/movies', function(req, res) {
    let movies = MovieStore.searchByTitle(req.query.title);

    let page = parseInt(req.query.page) || 1;
    let size = parseInt(req.query.size) || 5;

    let results = paginate(movies, size, page);

    return res.json({
        total: movies.length,
        page: page,
        size: size,
        data: results,
    });
});

app.post('/movies', function (req, res) {
    if(isInvalidString(req.body.Title)) {
        return makeResponse(res, 400, {
            message: 'missing or invalid Title'
        });
    }

    if(MovieStore.has(req.body.Title)) {
        return makeResponse(res, 400, {
            message: 'movie already existed'
        })
    }

    MovieStore.add(req.body);

    return res.json({
        message: 'new movie created'
    });
});

app.delete('/movies/:title', function(req, res) {
    if(isInvalidString(req.body.Title)) {
        return makeResponse(res, 400, {
            message: 'missing or invalid Title'
        });
    }

    if(!MovieStore.has(req.params.title)) {
        return makeResponse(res, 404, {
            message: `movie with '${req.params.title}' not found`
        });
    }

    MovieStore.remove(req.params.title);

    return res.json({
        message: `movie with ${req.params.title} has been removed`
    });
});

app.put('/movies/:title', function (req, res) {
    if(isInvalidString(req.params.title)) {
        return makeResponse(res, 400, {
            message: 'missing or invalid Title'
        });
    }

    if(!MovieStore.has(req.params.title)) {
        return makeResponse(res, 404, {
            message: `movie with '${req.params.title}' not found`
        });
    }

    if(!MovieStore.update(req.params.title, req.body)) {

        return makeResponse(res, 500, {
            message: 'error updating movie info'
        });
    }

   return res.json({
       message: `movie with ${req.params.title} has been updated`
   });
});

app.listen(9999, () => {
    console.log('server started');
});

