/* eslint-disable*/
class ApiService {
  /**
   * @param {string} rootUrl
   */
  constructor(rootUrl) {
    this.rootUrl = rootUrl
  }

  getStations() {
    return fetch(`${this.rootUrl}/stations`)
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          throw 'Something went wrong'
        }
      })
      .catch(console.log)
  }

  getWagnum() {
    return fetch(`${this.rootUrl}/wagnums`)
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          throw 'Something went wrong'
        }
      })
      .catch(console.log)
  }
  getPeregon() {
    return fetch(`${this.rootUrl}/peregon`)
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          throw 'Something went wrong'
        }
      })
      .catch(console.log)
  }
}

export default ApiService
