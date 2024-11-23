package com.hotel.service;

import com.hotel.dao.RoomMapper;
import com.hotel.pojo.Room;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.Collections;
import java.util.List;

@Service
public class RoomServiceImpl implements RoomService {

    @Autowired
    RoomMapper roomMapper;

    @Override
    public void addRoom(Room room) {
        roomMapper.addRoom(room);
    }

    @Override
    public void deleteRoom(int id) {
        roomMapper.deleteRoom(id);
    }

    @Override
    public void updateRoom(Room room) {
        roomMapper.updateRoom(room);
    }

    @Override
    public List<Room> getRoomByLocation(String location) { return roomMapper.getRoomByLocation(location); }

    @Override
    public List<Room> getAllRooms() { return roomMapper.getAllRooms(); }

    @Override
    public List<Room> getRoomsByTravelers(int travelers) { return Collections.emptyList(); }

    @Override
    public void Book(int id) {

    }
}
