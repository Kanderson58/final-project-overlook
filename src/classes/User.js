class User {
  constructor(userInfo) {
    this.id = userInfo.id
    this.name = userInfo.name;
    this.bookedRooms = [];
    this.totalSpent;
  }

  filterBookingByUser(allBookings) {
    this.bookedRooms = allBookings
      .filter(booking => booking.userID === this.id)
      .sort((a, b) => b.date.replaceAll('/', '') - a.date.replaceAll('/', ''));
    return this.bookedRooms;
  }

  filterOldBookings() {
    return this.bookedRooms.filter(booking => {
      return (new Date().toISOString().split('T')[0].replaceAll('-', '') > booking.date.replaceAll('/', ''));
    });
  }

  filterNewBookings() {
    return this.bookedRooms.filter(booking => {
      return (new Date().toISOString().split('T')[0].replaceAll('-', '') < booking.date.replaceAll('/', ''));
    });
  }

  getTotalCost(allRooms) {
    const totalPrice = this.bookedRooms
      .map(bookedRoom => bookedRoom.roomNumber)
      // look through all the booked rooms, which are objects with all the booking info, and return each room number that this user has booked
      .reduce((allBookedRooms, bookedNum) => {
        allBookedRooms.push(allRooms.filter(room => room.number === bookedNum))
      return allBookedRooms;
    }, [])
      // reduce that array of room numbers and within the reduce, filter through the allRooms data passed into the function in scripts that is a list of every room with all its prices, and pick out the ones that match the user's room number
      .flat()
      // make it a single array
      .reduce((price, bookedRoom) => {
        price += bookedRoom.costPerNight;
        return price;
      }, 0);
      // go through that array and accumulate the relevant prices to return a final total
      return Math.round(totalPrice).toLocaleString();
      // returns a rounded product with a comma added at the correct location
  }
}

export default User;