class Manager {
  constructor(bookingsInst, roomsInst, users) {
    this.bookingsInst = bookingsInst;
    this.roomsInst = roomsInst;
    this.users = users;
    this.todaysAvailableRooms;
  }

  getRoomsAvailableToday() {
    this.todaysAvailableRooms = this.roomsInst.filterByBookedStatus(this.bookingsInst.findTaken(new Date().toISOString().split('T')[0].replaceAll('-', '/')));
    return this.todaysAvailableRooms
  }

  calculateRevenue() {
    return this.roomsInst.rooms
      .filter(room => this.bookingsInst.findTaken(new Date().toISOString().split('T')[0].replaceAll('-', '/')).map(booking => booking.roomNumber).includes(room.number))
      .reduce((acc, room) => {
      acc += room.costPerNight;
      return acc;
    }, 0)
  }

}

export default Manager;