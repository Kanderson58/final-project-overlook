class Bookings {
  constructor(bookingInfo) {
    this.bookings = bookingInfo;
  }
  filterBookingByUser(user) {
    return this.bookings.filter(booking => booking.userID === user.id)
  }
}

export default Bookings;