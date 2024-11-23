package com.hotel.controller;

import com.hotel.pojo.Room;
import com.hotel.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/room")
public class RoomController {

    @Autowired
    RoomService roomService;

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public void add(Room room) {
        roomService.addRoom(room);
    }

    @RequestMapping(value = "/getAll", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Room> getAllRooms() {
        return roomService.getAllRooms();
    }

    @RequestMapping("/delete")
    public void deleteRoom(int id) {
        try {
            roomService.deleteRoom(id);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @RequestMapping("/update")
    public void updateRoom(Room room) {
        try {
            roomService.updateRoom(room);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @RequestMapping(value = "/getByLocation", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Room> getRoomByLocation(String location) {
        return roomService.getRoomByLocation(location);
    }

    @RequestMapping(value = "/getByTravelers", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Room> getRoomByTravelers(int travelers) {
        return roomService.getRoomsByTravelers(travelers);
    }
}