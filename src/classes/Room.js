class Room {
    constructor(roomData) {
        this.number = roomData.number;
        this.type = roomData.roomType;
        this.hasBidet = roomData.bidet;
        this.bedSize = roomData.bedSize;
        this.numBeds = roomData.numBeds;
        this.costPerNight = roomData.costPerNight;
    }
}

export default Room;