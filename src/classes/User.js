class User {
  constructor(userInfo) {
    this.name = userInfo.name;
    this.id = userInfo.id;
    this.bookedRooms = [];
    this.totalSpent;
    this.oldBookings = [];
    this.newBookings = [];
  }

  filterBookingByUser(allBookings) {
    this.bookedRooms = allBookings
      .filter(booking => booking.userID === this.id)
      .sort((a, b) => b.date.replaceAll('/', '') - a.date.replaceAll('/', ''));
    return this.bookedRooms;
  }

  sortByDate(date) {
    this.oldBookings = [];
    this.newBookings = [];

    this.bookedRooms.forEach(booking => {
      if(booking.date.replaceAll('/', '') >= date) {
        this.newBookings.push(booking);
      } else {
        this.oldBookings.push(booking);
      }
    })

    this.newBookings.sort((a, b) => a.date.replaceAll('/', '') - b.date.replaceAll('/', ''));
    this.oldBookings.sort((a, b) => b.date.replaceAll('/', '') - a.date.replaceAll('/', ''));
  }

  getTotalCost(allRooms) {
    const totalPrice = this.bookedRooms.reduce((total, bookedRoom) => {
      total += allRooms.find(room => room.number === bookedRoom.roomNumber).costPerNight
      return total;
    }, 0);
    
    return totalPrice.toLocaleString();
  }
}

export default User;