package com.hotel.service;

import com.hotel.pojo.Comment;

import java.util.List;

public interface CommentService {
    public void save(Comment comment);
    public List<Comment> getComments(int room_id);
    public void updateComment(Comment comment);
    public void deleteComment(int id);
}
