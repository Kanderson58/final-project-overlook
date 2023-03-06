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

const postBooking = (userID, date, roomNum) => {
  fetch('http://localhost:3001/api/v1/bookings', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      "userID": userID, 
      "date": date, 
      "roomNumber": roomNum
    })
  });
}

const getSingleUser = (id) => {
  return fetch(`http://localhost:3001/api/v1/customers/${id}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
  });
}

const removeBooking = (bookingId) => {
  fetch(`http://localhost:3001/api/v1/bookings/${bookingId}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(response.status);
    }
});
}

export { fetchData, postBooking, getSingleUser, removeBooking };