import { DateTime } from 'luxon';

class Booking {
    constructor(bookingData, rooms) {
        this.id = bookingData.id;
        this.userID = bookingData.userID;
        this.date = bookingData.date;
        this.roomNumber = bookingData.roomNumber;
        this.room = this.setRoom(rooms);
        this.dateInstance =  DateTime.fromFormat(this.date, 'yyyy/MM/dd')
    }
    setRoom(rooms) {
        return rooms.find(room => room.number === this.roomNumber);
    }
    formatDate() {
        return this.dateInstance.toLocaleString(DateTime.DATE_MED);
    }
}
export default Booking;