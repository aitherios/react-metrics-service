let idCounter = 27000

class Client {
  constructor({ dispatchers } = {}) {
    this._dispatchers = dispatchers || []
  }

  get dispatchers() {
    return this._dispatchers
  }

  addDispatcher(newDispatcher) {
    if (!newDispatcher._dispatcherId) {
      newDispatcher._dispatcherId = ++idCounter // eslint-disable-line
    }
    if (!newDispatcher.componentWillMount) {
      newDispatcher.componentWillMount = () => {} // eslint-disable-line
    }
    if (!newDispatcher.componentDidMount) {
      newDispatcher.componentDidMount = () => {} // eslint-disable-line
    }
    if (!newDispatcher.componentWillUnmount) {
      newDispatcher.componentWillUnmount = () => {} // eslint-disable-line
    }
    this._dispatchers.push(newDispatcher)
    return this
  }

  removeDispatcher(scrapedDispatcher) {
    this._dispatchers = this.dispatchers.filter((item) =>
      item._dispatcherId !== scrapedDispatcher._dispatcherId
    )
    return this
  }

  callDispatchers(methodName, ...args) {
    let calledOnce = false
    const responses = []

    this.dispatchers.forEach((dispatcher) => {
      const func = dispatcher[methodName]

      if (!!(func && func.constructor && func.call && func.apply)) {
        responses.push(func(...args))
        calledOnce = true
      } else if (!!(dispatcher.prototype && dispatcher.prototype instanceof Proxy)) {
        func(...args)
      }
    })

    if (!calledOnce) {
      console.warn(`react-metrics-service: no dispatcher respond to ${methodName}`)
    }

    return responses
  }
}

const handler = {
  get(target, name) {
    if (target[name]) {
      return target[name]
    }
    return (...args) => target.callDispatchers(name, ...args)
  },
}

const createClient = (...props) => {
  let client

  try {
    client = new Proxy(new Client(...props), handler)
  } catch (e) {
    console.error("react-metrics-service: your javascript implementation doesn't support Proxy!" +
                  " instead of using 'createClient()', use 'new Client()'")
    client = new Client(...props)
  }

  return client
}

export { createClient, Client }
