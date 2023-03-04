class Manager {
  constructor(bookingsInst, roomsInst, users) {
    this.bookingsInst = bookingsInst;
    this.roomsInst = roomsInst;
    this.users = users;
    this.todaysAvailableRooms;
  }

  // new Date().toISOString().split('T')[0].replaceAll('-', '/');
  // replace hardcoded dates

  getRoomsAvailableToday() {
    this.todaysAvailableRooms = this.roomsInst.filterByBookedStatus(this.bookingsInst.findTaken('2022/02/24'));
    return this.todaysAvailableRooms
  }

  calculateRevenue() {
    return this.roomsInst.rooms.filter(room => this.bookingsInst.findTaken('2022/02/24').map(booking => booking.roomNumber).includes(room.number)).reduce((acc, room) => {
      acc += room.costPerNight;
      return acc;
    }, 0)
  }

}

export default Manager;