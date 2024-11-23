package com.hotel.pojo;

public class Room {
    private int room_id;
    private int price;
    private int available;
    private int avg_rating;
    private int comment_id;
    private int accessibility;
    private int capacity;
    private String location;
    private String Check_in;
    private String Check_out;
    private String pictures;
    private String room_type;
    private String title;

    //private String brands;

    public Room() { }

    public Room(String location, int available, int room_id, int price, String pictures, String room_type, String title) {
        this.location = location;
        this.available = available;
        this.room_id = room_id;
        this.price = price;
        this.pictures = pictures;
        this.room_type = room_type;
        this.title = title;
    }

    public int getRoom_id() { return room_id; }
    public int getPrice() { return price; }
    public int getAvailable() { return available; }
    public int getAvg_rating() { return avg_rating; }
    public int getComment_id() { return comment_id; }
    public int getAccessibility() { return accessibility; }
    public int getCapacity() { return capacity; }
    public String getLocation() { return location; }
    public String getCheck_in() { return Check_in; }
    public String getCheck_out() { return Check_out; }
    public String getPictures() { return pictures; }
    public String getRoom_type() { return room_type; }
    public String getTitle() { return title; }

    public void setRoom_id(int room_id) { this.room_id = room_id; }
    public void setPrice(int price) { this.price = price; }
    public void setAvailable(int available) { this.available = available; }
    public void setAvg_rating(int avg_rating) { this.avg_rating = avg_rating; }
    public void setComment_id(int comment_id) { this.comment_id = comment_id; }
    public void setAccessibility(int accessibility) { this.accessibility = accessibility; }
    public void setCapacity(int capacity) { this.capacity = capacity; }
    public void setLocation(String location) { this.location = location; }
    public void setCheck_in(String check_in) { Check_in = check_in; }
    public void setCheck_out(String check_out) { Check_out = check_out; }
    public void setPictures(String pictures) { this.pictures = pictures; }
    public void setRoom_type(String room_type) { this.room_type = room_type; }
    public void setTitle(String title) { this.title = title; }

    @Override
    public String toString() {
        return "Room [Id=" + room_id +
                ", price=" + price +
                ", available=" + available +
                ", location=" + location +
                ", pictures=" + pictures +
                ", room_type=" + room_type +
                ", capacity=" + capacity + "]";
    }
}