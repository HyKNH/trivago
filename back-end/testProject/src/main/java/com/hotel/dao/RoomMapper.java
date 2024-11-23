package com.hotel.dao;

import com.hotel.pojo.Room;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface RoomMapper {
    void addRoom(Room room);
    void deleteRoom(int id);
    void updateRoom(Room room);
    List<Room> getRoomByLocation(String id);
    List<Room> getAllRooms();
    List<Room> getRoomsByTravelers(int travelers);
}