/* eslint-disable quotes, camelcase */

const googleTagManager = ({
  containerID,
  dataLayer = {},
}) => ({
  componentDidMount: () => {
    if (document) {
      let elem = document.createElement('script')
      elem.type = 'text/javascript'
      elem.innerHTML =
      `
        dataLayer = [{
          ${
            Object.keys(dataLayer).map(
              (k) => `"${k}": "${dataLayer[k]}"`
            ).join(",\n")
          }
        }];
      `
      document.head.appendChild(elem)

      elem = document.createElement('noscript')
      elem.innerHTML =
      `
        <iframe src="//www.googletagmanager.com/ns.html?id=${containerID}"
        height="0" width="0" style="display:none;visibility:hidden">
      `
      document.head.appendChild(elem)

      elem = document.createElement('script')
      elem.type = 'text/javascript'
      elem.innerHTML =
      `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        '//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${containerID}');
      `
      document.head.appendChild(elem)
    }
  },
})

export { googleTagManager }
export default googleTagManager
