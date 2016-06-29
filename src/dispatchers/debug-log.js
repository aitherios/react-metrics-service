const debugLog = (() => {
  let dispatcher

  try {
    dispatcher = new Proxy({},
      {
        get(target, name) {
          return (...args) => {
            console.warn(`react-metrics-service: called ${name} with:`, ...args)
            return null
          }
        },
      }
    )
  } catch (e) {
    console.error("react-metrics-service: your javascript implementation doesn't support Proxy!" +
                  ' debugLog will not work!')
    dispatcher = {}
  }

  return dispatcher
})()

export { debugLog }
export default debugLog
