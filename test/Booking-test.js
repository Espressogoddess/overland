import { expect } from 'chai';
import Booking from '../src/classes/Booking';
import Room from '../src/classes/Room';
import sampleBookingData from '../src/data/booking-data';
import sampleRoomData from '../src/data/room-data';

describe('Booking', () => {
    let booking;

    beforeEach(() => {
        booking = new Booking(sampleBookingData[3]);
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
        expect(booking.date).to.equal("2022/02/16")
    });

    it('should have a room number', () => {
        expect(booking.roomNumber).to.equal(7)
    });

    it('should start off without a room', () => {
        expect(booking.room).to.equal(undefined);
    });

    it('should be able to get the room', () => {
        const room = booking.getRoom(sampleRoomData)
        expect(room).to.be.instanceOf(Room);
        expect(room.costPerNight).to.equal(231.46)
    });

    it('should not be able to get the wrong room', () => {
        booking = new Booking(sampleBookingData[0]);
        const room = booking.getRoom(sampleRoomData);
        expect(room).to.equal(undefined);
    })

});