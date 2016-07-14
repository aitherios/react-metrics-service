const googleAnalytics = ({
  trackingID = '',
}) => ({
  componentWillMount: () => {
    if (typeof window !== 'undefined') {
      window['ga'] = window['ga'] || function () {  //eslint-disable-line
        (window['ga'].q = window['ga'].q || []).push(arguments) //eslint-disable-line
      }
      window.ga('create', trackingID, 'auto')
    }
  },
  componentDidMount: () => {
    if (typeof document !== 'undefined') {
      const elem = document.createElement('script')
      elem.type = 'text/javascript'
      elem.innerHTML =
      `
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
      `
      document.head.appendChild(elem)
    }
  },
  gaSend: (...args) => {
    if (typeof window !== 'undefined') {
      window.ga('send', ...args)
    }
  },
  gaPageView: (...args) => {
    if (typeof window !== 'undefined') {
      window.ga('send', 'pageview', ...args)
    }
  },
})

export { googleAnalytics }
export default googleAnalytics
