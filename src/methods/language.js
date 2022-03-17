function getCookie(cookieName) {
  let cookie = {};
  document.cookie.split(';').forEach(function(el) {
    let [key,value] = el.split('=');
    cookie[key.trim()] = value;
  })
  return cookie[cookieName];
}

let language = getCookie('language') || navigator.language.split('-')[0];

if(!['en'].includes(language))
  language = "en";

export default require(`../language/${language}.json`);