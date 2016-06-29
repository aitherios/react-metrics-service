/* eslint-disable quotes, camelcase */

const tealium = ({
  account = '',
  profile = '',
  env = '',
  utag_data = {},
  url,
}) => ({
  componentDidMount: () => {
    if (document) {
      window.utag_data = { ...utag_data }

      const utagjs = url || `//tags.tiqcdn.com/utag/${account}/${profile}/${env}/utag.js`
      const elem = document.createElement('script')
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
