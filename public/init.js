let sessionData = {}

if(username !== null && room != null) {
  sessionData = {username,room}
  sessionStorage.setItem('chat-session',JSON.stringify(sessionData))
}
else {
  sessionData = JSON.parse(sessionStorage.getItem('chat-session'));
  if( ! sessionData)
    window.location.href = '/';
}