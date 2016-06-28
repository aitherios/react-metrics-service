const debugLog = new Proxy({}, {
  get(target, name) {
    return (...args) => {
      console.warn(`react-metrics-service: called ${name} with:`, ...args)
      return null
    }
  },
})

export { debugLog }
export default debugLog
