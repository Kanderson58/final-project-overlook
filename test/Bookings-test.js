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

  it('should find available bookings based on a date', () => {
    expect(bookingsInst.findAvailable("2022/01/10").length).to.equal(9);
  });
});