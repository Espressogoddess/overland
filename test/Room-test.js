import { expect } from 'chai';
import Room from '../src/classes/Room';
import sampleRoomData from '../src/data/room-data';

describe('Room', () => {
    let room;

    beforeEach(() => {
        room = new Room(sampleRoomData[0]);
    });

    it('should be a function', () => {
        expect(Room).to.be.a('function');
    });

    it('should be an instance of Room', () => {
        expect(room).to.be.an.instanceOf(Room);
    });

    it('should have a number', () => {
        expect(room.number).to.equal(1);
    });

    it('should have a room type', () => {
        expect(room.type).to.equal('residential suite');
    });

    it('should have a bidet property', () => {
        expect(room.hasBidet).to.equal(true)
    });

    it('should have a bed size', () => {
        expect(room.bedSize).to.equal('queen')
    })

    it('should have a number of beds property', () => {
        expect(room.numBeds).to.have.equal(1)
    });

    it('should have a cost per night', () => {
        expect(room.costPerNight).to.equal(358.4)
    });

})