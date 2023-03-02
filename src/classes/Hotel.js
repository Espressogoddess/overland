import Room from "./Room";
import Booking from "./Booking";

class Hotel {
    constructor(roomData, bookingData) {
        this.rooms = roomData.map(room => new Room(room));
        this.bookings = bookingData.map(booking => new Booking(booking))
    }
    filterByDate(date) {
        const bookingsOnSelectedDate = this.bookings.filter(booking => booking.date === date);

        const filteredAvailableRooms = this.rooms.filter(room => {
            return bookingsOnSelectedDate.every(booking => {
                return booking.roomNumber !== room.number;
            });
        });
        if (!filteredAvailableRooms.length) {
            return;
        } else {
            return filteredAvailableRooms;
        }
    }
    filterByRoomType(roomType, date) {
        const availableRoomsOnSelectedDate = this.filterByDate(date);
        const filteredAvailableRooms = availableRoomsOnSelectedDate
            .filter(room => room.type === roomType);
        if (!filteredAvailableRooms.length) {
            return;
        } else {
            return filteredAvailableRooms;
        }
    }
}

export default Hotel;