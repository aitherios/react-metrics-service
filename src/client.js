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

  callMiddlewares(methodName, ...args) {
    let calledOnce = false

    this.middlewares.forEach((middleware) => {
      const func = middleware[methodName]
      if (!!(func && func.constructor && func.call && func.apply)) {
        func(...args)
        calledOnce = true
      }
    })

    if (!calledOnce) {
      console.warn(`react-metrics-service: no middleware respond to ${methodName}`)
    }

    return this
  }
}

const handler = {
  get(target, name) {
    if (target[name]) {
      return target[name]
    }
    return (...args) => target.callMiddlewares(name, ...args)
  },
}

const createClient = (...props) => new Proxy(
  new Client(...props), handler
)

export { createClient, Client }
