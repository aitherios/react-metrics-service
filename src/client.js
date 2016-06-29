let idCounter = 27000

class Client {
  constructor({ dispatchers, dispatcher } = {}) {
    this._dispatchers = []
    if (dispatchers && dispatchers.forEach) {
      dispatchers.forEach((d) => {
        this.addDispatcher(d)
      })
    }
    if (dispatcher && typeof dispatcher === 'object') {
      this.addDispatcher(dispatcher)
    }
  }

  get dispatchers() {
    return this._dispatchers
  }

  addDispatcher(newDispatcher) {
    function noop() {}
    this._dispatchers.push({
      ...{
        _dispatcherId: ++idCounter,
        componentWillMount: noop,
        componentDidMount: noop,
        componentWillUnmount: noop,
      },
      ...newDispatcher,
    })
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
