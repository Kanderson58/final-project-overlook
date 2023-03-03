import chai from 'chai';
import { bookings, customers, rooms } from '../src/sample-data/sample-data.js';
import Room from '../src/classes/Room';
const expect = chai.expect;

describe('Room', () => {
  let room;

  beforeEach(() => {
    room = new Room(rooms);
  });

  it('should be an instance of Room', () => {
    expect(room).to.be.an.instanceOf(Room);
  });

  it('should store all the rooms at the hotel', () => {
    expect(room.allRooms.length).to.equal(5);
  });

  it('should filter according to the already booked rooms for that date', () => {
    const nonbookedRooms = room.filterByBookedStatus([{
      "id": "5fwrgu4i7k55hl6t6",
      "userID": 3,
      "date": "2022/01/10",
      "roomNumber": 3
    }]);
    
    expect(nonbookedRooms).to.deep.equal([{
      "number": 1,
      "roomType": "residential suite",
      "bidet": true,
      "bedSize": "queen",
      "numBeds": 1,
      "costPerNight": 358.4
    },
    {
      "number": 2,
      "roomType": "suite",
      "bidet": false,
      "bedSize": "full",
      "numBeds": 2,
      "costPerNight": 477.38
    },
    {
      "number": 4,
      "roomType": "single room",
      "bidet": false,
      "bedSize": "queen",
      "numBeds": 1,
      "costPerNight": 429.44
    },
    {
      "number": 5,
      "roomType": "single room",
      "bidet": true,
      "bedSize": "queen",
      "numBeds": 2,
      "costPerNight": 340.17
    }]);
  })
});