/* eslint-disable quotes, camelcase */

const tealium = ({
  account,
  profile,
  env,
  utag_data = {},
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

      elem = document.createElement('script')
      elem.type = 'text/javascript'
      elem.innerHTML =
      `
        (function(a,b,c,d){
        a='//tags.tiqcdn.com/utag/${account}/${profile}/${env}/utag.js';
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
