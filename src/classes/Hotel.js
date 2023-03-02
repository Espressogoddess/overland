import Room from "./Room";
import Booking from "./Booking";

class Hotel {
    constructor(roomData, bookingData) {
        this.rooms = roomData.map(room => new Room(room));
        this.bookings = bookingData.map(booking => new Booking(booking))
    }
    filterByDate(date) {
        const bookingsOnSelectedDate = this.bookings.filter(booking => booking.date === date);

        const availableRoomsOnSelectedDate = this.rooms.filter(room => {
            return bookingsOnSelectedDate.every(booking => {
                return booking.roomNumber !== room.number;
            });
        });
        if (!availableRoomsOnSelectedDate.length) {
            return;
        } else {
            return availableRoomsOnSelectedDate;
        }
    }
    addBooking()
}

export default Hotel;