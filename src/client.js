const handler = {
  get(target, name) {
    return target[name]
  },
}

let idCounter = 27000

class Client {
  constructor({ middlewares } = {}) {
    this._middlewares = middlewares || []
  }

  get middlewares() {
    return this._middlewares
  }

  addMiddleware(newMiddleware) {
    if (!newMiddleware._middlewareId) {
      newMiddleware._middlewareId = ++idCounter // eslint-disable-line
    }
    this._middlewares.push(newMiddleware)
    return this
  }

  removeMiddleware(scrapedMiddleware) {
    this._middlewares = this.middlewares.filter((item) =>
      item._middlewareId !== scrapedMiddleware._middlewareId
    )
    return this
  }
}

const createClient = () => new Proxy(new Client(), handler)

export { createClient }
