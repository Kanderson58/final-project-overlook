import chai from 'chai';
import { bookings, customers, rooms } from '../src/sample-data/sample-data.js';
import Room from '../src/classes/Room';
const expect = chai.expect;

describe('Room', () => {
  let room, nonbookedRooms;
  
  beforeEach(() => {
    room = new Room(rooms);
    nonbookedRooms = room.filterByBookedStatus([{
      "id": "5fwrgu4i7k55hl6t6",
      "userID": 3,
      "date": "2022/01/10",
      "roomNumber": 3
    }]);
  });

  it('should be an instance of Room', () => {
    expect(room).to.be.an.instanceOf(Room);
  });

  it('should store all the rooms at the hotel', () => {
    expect(room.rooms.length).to.equal(5);
  });
  
  it('should list all the room types', () => {
    expect(room.getAllRoomTypes()).to.deep.equal(['residential suite', 'suite', 'single room', 'junior suite']);
  });

  it('should filter according to the already booked rooms for that date', () => {
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
      "roomType": "junior suite",
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
  });

  it('should find all rooms of a certain type', () => {
    expect(room.filterByRoomType('junior suite')).to.deep.equal([{
      "number": 4,
      "roomType": "junior suite",
      "bidet": false,
      "bedSize": "queen",
      "numBeds": 1,
      "costPerNight": 429.44
    }]);
  });

  it('should check for a bidet', () => {
    expect(room.filterByBidet()).to.deep.equal([{
      "number": 1,
      "roomType": "residential suite",
      "bidet": true,
      "bedSize": "queen",
      "numBeds": 1,
      "costPerNight": 358.4
    },
    {
      "number": 5,
      "roomType": "single room",
      "bidet": true,
      "bedSize": "queen",
      "numBeds": 2,
      "costPerNight": 340.17
    }]);
  });

  it('should check for a given bed size', () => {
    expect(room.filterByBedSize('full')).to.deep.equal([{
      "number": 2,
      "roomType": "suite",
      "bidet": false,
      "bedSize": "full",
      "numBeds": 2,
      "costPerNight": 477.38
    }]);
  });

  it('should check for a given number of beds', () => {
    expect(room.filterByNumBeds(2)).to.deep.equal([{
      "number": 2,
      "roomType": "suite",
      "bidet": false,
      "bedSize": "full",
      "numBeds": 2,
      "costPerNight": 477.38
    },
    {
      "number": 5,
      "roomType": "single room",
      "bidet": true,
      "bedSize": "queen",
      "numBeds": 2,
      "costPerNight": 340.17
    }]);
  });

  it('should check for a maximum room price', () => {
    expect(room.filterByCost(350)).to.deep.equal([{
      "number": 5,
      "roomType": "single room",
      "bidet": true,
      "bedSize": "queen",
      "numBeds": 2,
      "costPerNight": 340.17
    }]);
  });
});