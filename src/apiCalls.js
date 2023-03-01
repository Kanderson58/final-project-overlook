const getPromises = (url) => {
  return fetch(`http://localhost:3001/api/v1/${url}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
  });
}

const fetchData = () => {
  return Promise.all([
    getPromises('customers'),
    getPromises('rooms'),
    getPromises('bookings')
])
  .catch((error) => console.log(error));
}

export { fetchData };