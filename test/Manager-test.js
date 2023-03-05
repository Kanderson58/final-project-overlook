import chai from 'chai';
import { bookings, customers, rooms } from '../src/sample-data/sample-data.js';
import Manager from '../src/classes/Manager.js';
import Bookings from '../src/classes/Bookings.js';
import Room from '../src/classes/Room.js';
const expect = chai.expect;

describe('Manager', () => {
  let bookingsInst, roomsInst, manager, date;

  beforeEach(() => {
    const formatDate = (date) => {
      const year = date.toLocaleString("default", { year: "numeric" });
      const month = date.toLocaleString("default", { month: "2-digit" });
      const day = date.toLocaleString("default", { day: "2-digit" });
      return year + "-" + month + "-" + day;
    }

    bookingsInst = new Bookings(bookings);
    roomsInst = new Room(rooms);
    manager = new Manager(bookingsInst, roomsInst, customers);
    date = formatDate(new Date())
  })

  it('should be an instance of Manager', () => {
    expect(manager).to.be.an.instanceOf(Manager);
  });

  it('should store an instace of all the bookings', () => {
    expect(manager.bookingsInst).to.be.an.instanceOf(Bookings);
  });

  it('should store an instace of all the rooms', () => {
    expect(manager.roomsInst).to.be.an.instanceOf(Room);
  });

  it('should store all the users', () => {
    expect(manager.users.length).to.equal(5);
  });

  it('should get the rooms available on today\'s date', () => {
    manager.getRoomsAvailableToday(date);

    expect(manager.todaysAvailableRooms.length).to.equal(5);
  });

  it('should be able to calculate all the revenue for today', () => {
    expect(manager.calculateRevenue(date)).to.equal('0');
  });
});