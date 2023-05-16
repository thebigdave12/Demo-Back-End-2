const movies = require('./db.json')

let globalId = 11

module.exports = {
    // utilize/writing endpoint functions 
    getAllMovies: (req, res) => {
        res.status(200).send(movies)
    },

    deleteMovie: (req, res) => {
        // console.log(req.body) // no body object so send's nothing
        // console.log(req.params) // parameter that we called 
        // console.log(req.query)
        const {id: paramId} = req.params
        
        let index = movies.findIndex((movie) => movie.id === +paramId)
        console.log(movies[index])
        movies.splice(index, 1)

        res.status(200).send(movies)
    },

    createMovie: (req, res) => {

        // destructuring -> const {title, rating, imageURL} = req.body

        // let newMovie = {
            // id: globalId,
            // title,
            // rating: +rating,
            // imageURL
        //}

        let newMovie = {
            id: globalId, 
            title: req.body.title, 
            rating: req.body.rating, 
            imageURL: req.body.imageURL 
        }

        movies.push(newMovie)

        globalId++

        res.status(200).send(movies)
    },

    updateMovie: (req, res) => {
        console.log(req.body) // no body object so send's nothing
        console.log(req.params) // parameter that we called 
        console.log(req.query)

        const {type} = req.body

        let index = movies.findIndex((movie) => movie.id === +req.params.id)


        if(type === 'plus' && movies[index].rating === 5) {
            res.status(400).send('Cannot go above 5')
        } else if (type === 'minus' && movies[index].rating === 0) {
            res.status(400).send('Cannot go below 0')
        } else if (type === 'plus') {
            movies[index].rating++
            res.status(200).send(movies)
        } else if (type === 'minus'){
            movies[index].rating--
            res.status(200).send(movies)
        }
        
    }
}