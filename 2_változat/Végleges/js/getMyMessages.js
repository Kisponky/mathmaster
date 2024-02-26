fetch("http://localhost:8000/api/admin/archived-messages", {
    method: 'GET',
    headers: {
        'Authorization': localStorage.getItem('token'),
        'Content-Type': 'application/json',
    }
})
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data); // itt kezelheted a kapott adatokat
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });
