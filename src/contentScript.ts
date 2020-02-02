// Listen for messages from the popup.
chrome.runtime.onMessage.addListener((request, sender, response) => {
  switch (request.type) {
    case 'getToken':
      const token = localStorage.getItem('accessToken');
      response(token);
      break;
  }
});
