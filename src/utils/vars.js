const Screen = {
    maxCapacity: 100
}

const Film = {
    ratings: {
        U: {
            name: 'PG',
            description: ''
        },
        PG: {
            name: 'PG',
            description: ''
        },
        12: {
            name: '12',
            description: ''
        },
        15: {
            name: '15',
            description: ''
        },
        18: {
            name: '18',
            description: ''
        }
    }
}

const validRatings = ["U", "PG", "12", "15", "18"]

module.exports = {
    ScreenVars: Screen,
    FilmVars: Film
}