package com.hotel.service;

import com.hotel.pojo.Room;

import java.util.List;

public interface RoomService {
    void addRoom(Room room);
    void deleteRoom(int id);
    void updateRoom(Room room);
    List<Room> getRoomByLocation(String location);
    List<Room> getAllRooms();
    List<Room> getRoomsByTravelers(int travelers);
    void book(int id);
}
