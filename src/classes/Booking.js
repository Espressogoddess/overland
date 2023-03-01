import Room from './Room';

class Booking {
    constructor(bookingData) {
        this.id = bookingData.id;
        this.userID = bookingData.userID;
        this.date = bookingData.date;
        this.roomNumber = bookingData.roomNumber;
    }
    getRoom(rooms) {
        const room = rooms.find(room => room.number === this.roomNumber)
        if (!room) {
            return
        }
        return new Room(room)
    }
}
export default Booking;