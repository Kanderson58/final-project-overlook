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
  .catch((error) => handleError(error));
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
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(response.status);
    }
  })
  .catch(error => handleError(error));
}

const getSingleUser = (id) => {
  return fetch(`http://localhost:3001/api/v1/customers/${id}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
  })
  .catch(error => handleError(error));
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
  })
  .catch(error => handleError(error));
}

const handleError = (error) => {
  const findRoomSection = document.getElementById('findRoom');
  const availableRooms = document.getElementById('availableRooms');
  const allAvailableManager = document.getElementById('allAvailableManager');
  const userInfo = document.getElementById('userInfo');
  [findRoomSection, availableRooms, allAvailableManager, userInfo].forEach(element => {
    element.innerHTML = `<p class="error">Sorry, we can't load your page right now!  Please try reloading.  Error: ${error}</p>`
  })
}

export { fetchData, postBooking, getSingleUser, removeBooking };