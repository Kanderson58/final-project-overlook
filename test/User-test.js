import chai from 'chai';
import { bookings, customers, rooms } from '../src/sample-data/sample-data.js';
import User from '../src/classes/User.js';
const expect = chai.expect;

describe('User', () => {
  let user;

  beforeEach(() => {
    user = new User(customers[0]);
    user.filterBookingByUser(bookings);
  });

  it('should be an instance of User', () => {
    expect(user).to.be.an.instanceOf(User);
  });

  it('should have a name', () => {
    expect(user.name).to.equal('Leatha Ullrich');
  });

  it('should have an id', () => {
    expect(user.id).to.equal(1);
  });

  it('should have all the rooms that the user has booked', () => {
    expect(user.bookedRooms).to.deep.equal([{
      "id": "5fwrgu4i7k55hl6sz",
      "userID": 1,
      "date": "2023/04/22",
      "roomNumber": 1,
    }, {
      "id": "5fwrgu4i7k55hl6t9",
      "userID": 1,
      "date": "2023/01/14",
      "roomNumber": 1
    }]);
  });

  it('should calculate total cost spent', () => {
    expect(user.getTotalCost(rooms)).to.equal('716.8');
  });
});