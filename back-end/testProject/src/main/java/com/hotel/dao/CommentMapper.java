package com.hotel.dao;

import com.hotel.pojo.Comment;

import java.util.List;

public interface CommentMapper {
    public void save(Comment comment);
    public List<Comment> getComments(int room_id);
    public void updateComment(Comment comment);
    public void deleteComment(int id);
}
