class User {
  constructor(userInfo) {
    this.name = userInfo.name;
    this.id = userInfo.id;
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
    const totalPrice = this.bookedRooms.reduce((total, bookedRoom) => {
      total += allRooms.find(room => room.number === bookedRoom.roomNumber).costPerNight
      return total;
    }, 0);
    
    return totalPrice.toLocaleString();
  }
}

export default User;