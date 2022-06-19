const Screen = require("../src/screen")
const Film = require("../src/film")
const { ScreenVars, FilmVars } = require("./utils/vars")

class Cinema {

  #films
  #screens

  constructor() {
    this.#films = []
    this.#screens = []
  }

  convertToSeconds(time) {
    const [hours, minutes] = time.split(':')
    return Number(hours) * 60 * 60 + Number(minutes) * 60
  }

  isValidStartTime(filmName, screenName, startTime) {

    const filmInfo = this.getFilmInfo(filmName)
    const durationSeconds = this.convertToSeconds(filmInfo.duration)
    const startTimeSeconds = this.convertToSeconds(startTime)
    const endTimeSeconds = startTimeSeconds + durationSeconds
    //console.log('start', startTime, startTimeSeconds, filmInfo.duration, durationSeconds, endTimeSeconds)
   
    const thisScreen = this.getScreen(screenName)
    const showings = thisScreen.getShowings()
    //console.log('showings', showings)
    for (let i = 0; i < showings.length; i++) {
      const showingStartTimeSeconds = this.convertToSeconds(showings[i].startTime)
      const cleaningSeconds = this.convertToSeconds("0:20")
      const showingEndTimeSeconds = showingStartTimeSeconds + durationSeconds + cleaningSeconds
      //console.log('this showing', showings[i].startTime, showingStartTimeSeconds, showingEndTimeSeconds)
      if((startTimeSeconds >= showingStartTimeSeconds && startTimeSeconds <= showingEndTimeSeconds) || 
         (endTimeSeconds >= showingStartTimeSeconds && endTimeSeconds <= showingEndTimeSeconds) ||
         (startTimeSeconds <= showingStartTimeSeconds && endTimeSeconds >= showingEndTimeSeconds)) {
        return false
      }
    }
    return true
  }

  isValidTime(time) {
    return /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(time) 
  }

  isValidDuration(duration) {

    if ( !Number(duration.replace(':','')) ) {
      return false
    }

    return /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(duration)  
  }

  isValidRating(rating) {

    return Object.keys(FilmVars.ratings).includes(rating)
  }

  getScreenExists(name) {

    return this.#screens.some(screen => screen.getName() === name);
  }

  getScreens() {
    return this.#screens
  }

  getScreen(name) {
    return this.#screens.find(screen => screen.getName() === name)
  }

  getScreensInfo() {
    const screenInfo = []
    this.#screens.forEach(screen => {
      const info = {
        name: screen.getName(),
        capacity: screen.getCapacity(),
        showings: screen.getShowings()
      }
      screenInfo.push(info)
    })
    return screenInfo
  }

  getScreenInfo(name) {
    const thisScreen = this.#screens.find(screen => screen.getName() === name)
    const info = {
      name: thisScreen.getName(),
      capacity: thisScreen.getCapacity(),
      showings: thisScreen.getShowings()
    }
    return info
  }

  //Add a new screen
  addScreen(name, capacity) {
    if (this.getScreenExists(name) ) {
      return false
    } 
    this.#screens.push(new Screen(name, capacity))
    return true
  }

  getFilmExists(name) {

    return this.#films.some(film => film.getName() === name);
  }

  getFilms() {
    return this.#films
  }

  getFilm(name) {
    return this.#films.find(film => film.getName() === name)
  }

  getFilmsInfo() {
    const filmInfo = []
    this.#films.forEach(film => {
      const info = {
        name: film.getName(),
        rating: film.getRating(),
        duration: film.getDuration()
      }
      filmInfo.push(info)
    })
    return filmInfo
  }

  getFilmInfo(name) {
    const thisFilm = this.#films.find(film => film.getName() === name)
    const info = {
      name: thisFilm.getName(),
      rating: thisFilm.getRating(),
      duration: thisFilm.getDuration()
    }
    return info
  }

  //Add a new film
  addFilm(name, rating, duration) {

    if (this.getFilmExists(name) || 
        !this.isValidRating(rating) || 
        !this.isValidDuration(duration)) {
      return false
    } 
    this.#films.push(new Film(name, rating, duration))
    return true
  }

  //Add a showing for a specific film to a screen at the provided start time
  addShowing(filmName, screenName, startTime) {

    if(!this.getFilmExists(filmName) || 
       !this.getScreenExists(screenName) || 
       !this.isValidTime(startTime) || 
       !this.isValidStartTime(filmName, screenName, startTime)) {
      return false
    }

    const thisScreen = this.#screens.find(screen => screen.getName() === screenName)

    thisScreen.setShowing(filmName, startTime)
    return true  
  } 

  getShowings() {

    const showingsInfo = []
    this.#screens.forEach(screen => {
     
      const showings = screen.getShowings()
      showings.forEach(showing => {

        const filmInfo = this.getFilmInfo(showing.film)
        const info = {
          film: showing.film,
          screen: screen.getName(),
          startTime: showing.startTime,
          rating: filmInfo.rating,
          duration: filmInfo.duration
        }

        showingsInfo.push(info)
      })
    })

    //console.log('showings', showingsInfo)
    return showingsInfo
  }
}

module.exports = Cinema