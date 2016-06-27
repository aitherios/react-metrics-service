const handler = {
  get(target, name) {
    return target[name]
  },
}

class Client {
  constructor(middlewares) {
    this._middlewares = middlewares || []
  }

  get middlewares() {
    return this._middlewares
  }

  addMiddleware(newMiddleware) {
    this._middlewares.push(newMiddleware)
    return this
  }
}

const createClient = () => new Proxy(new Client(), handler)

export { createClient }
