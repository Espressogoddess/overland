import Room from "./Room";
import Booking from "./Booking";

class Hotel {
    constructor(roomData, bookingData) {
        this.rooms = roomData.map(room => new Room(room));
        this.bookings = bookingData.map(booking => new Booking(booking, this.rooms))
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
    addNewBooking(selectedRoom, customer, date) {
        console.log(selectedRoom)
        this.bookings.push(new Booking({
           "id": Date.now(),
           "userID":  customer.id,
           "date": date,
            "roomNumber": selectedRoom.number
        }, this.rooms));
    }
    getSelectedRoom(roomNumber) {
        return this.rooms.find(room => room.number === roomNumber);
    }
}

export default Hotel;