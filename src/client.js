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
    /* eslint-disable no-param-reassign */
    if (!newDispatcher._dispatcherId) { newDispatcher._dispatcherId = ++idCounter }
    if (!newDispatcher.componentWillMount) { newDispatcher.componentWillMount = noop }
    if (!newDispatcher.componentDidMount) { newDispatcher.componentDidMount = noop }
    if (!newDispatcher.componentWillUnmount) { newDispatcher.componentWillUnmount = noop }
    /* eslint-enable no-param-reassign */

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
        responses.push(func.apply(dispatcher, args))
        calledOnce = true
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
