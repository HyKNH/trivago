package com.hotel.pojo;

public class Comment {
    private int id;
    private String user;
    private String message;
    private float rating;
    private int room_id;

    public Comment() { }

    public Comment(int id, String message, String user, float rating, int room_id) {
        this.id = id;
        this.message = message;
        this.user = user;
        this.rating = rating;
        this.room_id = room_id;
    }

    public int getRoom_id() { return room_id; }
    public float getRating() { return rating; }
    public String getUser() { return user; }
    public String getMessage() { return message; }
    public int getId() { return id; }

    public void setId(int id) { this.id = id; }
    public void setMessage(String message) { this.message = message; }
    public void setUser(String user) { this.user = user; }
    public void setRating(float rating) { this.rating = rating; }
    public void setRoom_id(int room_id) { this.room_id = room_id; }
}