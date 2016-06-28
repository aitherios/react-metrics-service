const googleAnalytics = ({
  trackingID,
}) => ({
  componentDidMount: () => {
    if (document) {
      const elem = document.createElement('script')
      elem.type = 'text/javascript'
      elem.innerHTML =
      `
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

        ga('create', '${trackingID}', 'auto');
        ga('send', 'pageview');
      `
      document.head.appendChild(elem)
    }
  },
  gaSend: (...args) => {
    window.ga('send', ...args)
  },
  gaPageView: () => {
    window.ga('send', 'pageview')
  },
})

export { googleAnalytics }
export default googleAnalytics
