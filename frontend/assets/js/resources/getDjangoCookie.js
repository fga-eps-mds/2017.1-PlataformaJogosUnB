export const getDjangoCookie = (token_name) => {
  var cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      if (cookie.substring(0, token_name.length + 1) === (token_name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(token_name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
