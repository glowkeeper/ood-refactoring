const Screen = {
    maxCapacity: 100,
    cleanTime: "0:20"
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

module.exports = {
    ScreenVars: Screen,
    FilmVars: Film
}