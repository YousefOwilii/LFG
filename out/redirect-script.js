// This script checks if we have a redirect path in the URL query parameters
// and navigates to that path if it exists
(function() {
  // Parse query string
  var query = window.location.search.substring(1);
  var params = {};
  
  query.split('&').forEach(function(part) {
    var item = part.split('=');
    params[item[0]] = decodeURIComponent(item[1]);
  });
  
  // If we have a path parameter, redirect to it
  if (params.p) {
    var path = params.p;
    var newUrl = window.location.origin + window.location.pathname.replace(/\/index\.html$/, '') + path;
    window.history.replaceState(null, null, newUrl);
  }
})(); 