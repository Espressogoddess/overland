import { expect } from 'chai';
import Booking from '../src/classes/Booking';
import Room from '../src/classes/Room';
import sampleBookingData from '../src/data/booking-data';
import sampleRoomData from '../src/data/room-data';

describe('Booking', () => {
    let booking;

    beforeEach(() => {
        booking = new Booking(sampleBookingData[3], sampleRoomData.map(room => new Room(room)));
    });

    it('should be a function', () => {
        expect(Booking).to.be.a('function');
    });

    it('should be an instance of Booking', () => {
        expect(booking).to.be.an.instanceOf(Booking);
    });

    it('should have an id', () => {
        expect(booking.id).to.equal("5fwrgu4i7k55hl6t7");
    });

    it('should have a user ID', () => {
        expect(booking.userID).to.equal(20);
    });

    it('should have a date', () => {
        expect(booking.date).to.equal('2022/02/16');
    });

    it('should have a room number', () => {
        expect(booking.roomNumber).to.equal(7)
    });

    it('should have a room', () => {
        expect(booking.room).to.be.an.instanceOf(Room);
        expect(booking.room.costPerNight).to.equal(231.46)
    });

});