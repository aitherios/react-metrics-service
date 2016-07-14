const googleAnalyticsLegacy = ({
  trackingID = '',
}) => ({
  componentWillMount: () => {
    if (typeof window !== 'undefined') {
      window._gaq = window._gaq || []
      window._gaq.push(['_setAccount', trackingID])
    }
  },
  componentDidMount: () => {
    if (typeof document !== 'undefined') {
      const elem = document.createElement('script')
      elem.type = 'text/javascript'
      elem.innerHTML =
      `
        (function() {
          var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
          ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
          var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
        })();
      `
      document.head.appendChild(elem)
    }
  },
  gaPush: (...args) => {
    if (typeof window !== 'undefined') {
      window._gaq.push(...args)
    }
  },
  gaPageView: (...args) => {
    if (typeof window !== 'undefined') {
      window._gaq.push(['_trackPageview', ...args])
    }
  },
})

export { googleAnalyticsLegacy }
export default googleAnalyticsLegacy
