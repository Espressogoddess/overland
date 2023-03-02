import { expect } from 'chai';
import Room from '../src/classes/Room';
import sampleRoomData from '../src/data/room-data';
import sampleBookingData from '../src/data/booking-data';
import Hotel from "../src/classes/Hotel";

describe('Hotel', () => {
    let hotel;

    beforeEach(() => {
        hotel = new Hotel(sampleRoomData, sampleBookingData);
    });

    it('should be a function', () => {
        expect(Hotel).to.be.a('function');
    });

    it('should be an instance of Hotel', () => {
        expect(hotel).to.be.an.instanceOf(Hotel);
    });

    it('should be able to instantiate Rooms', () => {
        expect(hotel.rooms[0]).to.be.an.instanceOf(Room);
        expect(hotel.rooms).to.have.lengthOf(7);
    });

    it('should be able to filter available rooms by date', () => {
        const availableRooms = hotel.filterByDate("2022/01/25");
        expect(availableRooms).to.have.lengthOf(6);
        expect(availableRooms[0].number).to.equal(1);
        expect(availableRooms[1].number).to.equal(3);
        expect(availableRooms[2].number).to.equal(4);
        expect(availableRooms[3].number).to.equal(5);
        expect(availableRooms[4].number).to.equal(6);
        expect(availableRooms[5].number).to.equal(7);
    });

    it('should be able to filter available rooms by room type', () => {
   
    });

});