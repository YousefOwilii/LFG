// Single Page Apps for GitHub Pages
// https://github.com/rafgraph/spa-github-pages
// This script takes the current url and converts the path and query
// string into just a query string, and then redirects the browser
// to the new url with only a query string and hash fragment

(function() {
  // This works for GitHub Pages with a custom domain or with a repo name in the path
  var pathSegmentsToKeep = 1; // Set to 1 for repo name in path (e.g., /LFG/)

  var l = window.location;
  l.replace(
    l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
    l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
    l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
    (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
    l.hash
  );
})(); 