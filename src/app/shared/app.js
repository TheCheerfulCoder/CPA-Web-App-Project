/* Make navigation within the app intuitive for optimal user experiance. */
// history.pushState(null, '', '/index.html');
// addEventListener('popstate', event => { location.reload() });
window.addEventListener('popstate', (event) => {
  console.log('The popstate event occured!');
});
