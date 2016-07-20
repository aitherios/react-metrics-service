/* eslint-disable quotes, camelcase */

const tealium = ({
  account = '',
  profile = '',
  env = '',
  utag_data = {},
  url,
}) => ({
  componentWillMount: () => {
    if (typeof document !== 'undefined') {
      window.utag_data = { ...utag_data }
    }
  },
  componentDidMount: () => {
    if (typeof document !== 'undefined') {
      const utagjs = url || `//tags.tiqcdn.com/utag/${account}/${profile}/${env}/utag.js`
      const elem = document.createElement('script')
      elem.type = 'text/javascript'
      elem.innerHTML =
      `
        (function(a,b,c,d){
        a='${utagjs}';
        b=document;c='script';d=b.createElement(c);d.src=a;
        d.type='text/java'+c;d.async=true;
        a=b.getElementsByTagName(c)[0];a.parentNode.insertBefore(d,a)
        })();
      `
      document.head.appendChild(elem)
    }
  },
  utagView: (...args) => {
    if (typeof document !== 'undefined'
      && typeof window !== 'undefined'
      && typeof window.utag !== 'undefined'
      && typeof window.utag.view !== 'undefined') {
      window.utag.view(...args)
    }
  },
  utagLink: (...args) => {
    if (typeof document !== 'undefined') {
      window.utag.link(...args)
    }
  },
})

export { tealium }
export default tealium
