import Room from './Room';

class Booking {
    constructor(bookingData, rooms) {
        this.id = bookingData.id;
        this.userID = bookingData.userID;
        this.date = bookingData.date;
        this.roomNumber = bookingData.roomNumber;
        this.room = this.setRoom(rooms);
    }
    setRoom(rooms) {
        return rooms.find(room => room.number === this.roomNumber);
    }
}
export default Booking;