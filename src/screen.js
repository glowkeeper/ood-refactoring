const maxCapacity = 100

class Screen {

  #name
  #capacity
  #showings

  constructor(name, capacity) {
    this.#name = name
    this.#capacity = capacity
    this.#showings = []
  }

  get () {
      return this
  }

  getName() {
      return this.#name
  }

  getCapacity() {
      return this.#capacity
  }

  getShowings() {
    return this.#showings
  }

  getFilmShowings(name) {
    return this.#showings.filter(showing => showing.film === name)
  }

  getShowing(time) {
    return this.#showings.filter(showing => showing.startTime === time)
  }

  setName(name) {
      this.#name = name
  }

  setCapacity(capacity) {
      this.#capacity = capacity
  }

  setShowing(film, startTime) {
    const info = {
      film: film,
      startTime: startTime
    }
    this.#showings.push(info)
  }
}

module.exports = Screen