import chai from 'chai';
import { bookings, customers, rooms } from '../src/sample-data/sample-data.js';
import Bookings from '../src/classes/Bookings';
const expect = chai.expect;

describe('Bookings', () => {
  let bookingsInst;

  beforeEach(() => {
    bookingsInst = new Bookings(bookings);
  });

  it('should be an instance of Bookings', () => {
    expect(bookingsInst).to.be.an.instanceOf(Bookings);
  });

  it('should store all existing bookings', () => {
    expect(bookingsInst.bookings.length).to.equal(10);
  });

  it('should find taken bookings based on a date', () => {
    expect(bookingsInst.findTaken("2022/01/10")).to.deep.equal([{
      "id": "5fwrgu4i7k55hl6t6",
      "userID": 3,
      "date": "2022/01/10",
      "roomNumber": 3
    }]);
  });
});