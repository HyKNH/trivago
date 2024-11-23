package com.hotel.service;

import com.hotel.dao.CommentMapper;
import com.hotel.pojo.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    CommentMapper commentMapper;

    @Override
    public void save(Comment comment) { commentMapper.save(comment); }

    @Override
    public List<Comment> getComments(int room_id) { return commentMapper.getComments(room_id); }

    @Override
    public void updateComment(Comment comment) { commentMapper.updateComment(comment); }

    @Override
    public void deleteComment(int id) { commentMapper.deleteComment(id); }
}
