class Manager {
  constructor(bookingsInst, roomsInst, users) {
    this.bookingsInst = bookingsInst;
    this.roomsInst = roomsInst;
    this.users = users;
    this.todaysAvailableRooms;
  }

  getRoomsAvailableToday(date) {
    this.todaysAvailableRooms = this.roomsInst.filterByBookedStatus(this.bookingsInst.findTaken(date.replaceAll('-', '/')));
    return this.todaysAvailableRooms
  }

  calculateRevenue(date) {
    return this.roomsInst.rooms
      .filter(room => this.bookingsInst.findTaken(date.replaceAll('-', '/')).map(booking => booking.roomNumber).includes(room.number))
      .reduce((acc, room) => {
      acc += room.costPerNight;
      return acc;
    }, 0).toFixed(2).toLocaleString();
  }

  findUser(name) {
    return this.users.find(user => user.name.toLowerCase() === name.toLowerCase());
  }
}

export default Manager;