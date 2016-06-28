/* eslint-disable quotes, camelcase */

const tealium = ({
  account,
  profile,
  env,
  utag_data = {},
  url,
}) => ({
  componentDidMount: () => {
    if (document) {
      let elem = document.createElement('script')
      elem.type = 'text/javascript'
      elem.innerHTML =
      `
        var utag_data = {
          ${
            Object.keys(utag_data).map(
              (k) => `"${k}": "${utag_data[k]}"`
            ).join(",\n")
          }
        };
      `
      document.head.appendChild(elem)

      const utagjs = url || `//tags.tiqcdn.com/utag/${account}/${profile}/${env}/utag.js`
      elem = document.createElement('script')
      elem.type = 'text/javascript'
      elem.innerHTML =
      `
        (function(a,b,c,d){
        a='${utagjs}';
        b=document;c='script';d=b.createElement(c);d.src=a;
        d.type='text/java’+c;d.async=true;
        a=b.getElementsByTagName(c)[0];a.parentNode.insertBefore(d,a)
        })();
      `
      document.head.appendChild(elem)
    }
  },
  utagView: (...args) => {
    window.utag.view(...args)
  },
  utagLink: (...args) => {
    window.utag.link(...args)
  },
})

export { tealium }
export default tealium
