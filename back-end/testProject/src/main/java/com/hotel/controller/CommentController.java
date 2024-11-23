package com.hotel.controller;

import com.hotel.pojo.Comment;
import com.hotel.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/comment")
public class CommentController {

    @Autowired
    CommentService commentService;

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public void save(Comment comment) {
        commentService.save(comment);
    }

    @RequestMapping("/delete")
    public void deleteComment(int id) {
        commentService.deleteComment(id);
    }

    @RequestMapping(value = "/getAll", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Comment> getComments(int room_id) {
        return commentService.getComments(room_id);
    }

    @RequestMapping("/update")
    public void updateComment(Comment comment) {
        commentService.updateComment(comment);
    }
}