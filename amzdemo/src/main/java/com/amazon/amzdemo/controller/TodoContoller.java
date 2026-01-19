package com.amazon.amzdemo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.amazon.amzdemo.entity.Todo;
import com.amazon.amzdemo.repo.TodoRepo;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/todos")
public class TodoContoller {

    @Autowired
    private TodoRepo todoRepo;

    public TodoContoller(TodoRepo todoRepo) {
        this.todoRepo = todoRepo;
    }

    @GetMapping
    public List<Todo> getAll() {
        return todoRepo.findAll();
    }

    @PostMapping
    public Todo create(@RequestBody Todo todo) {
        return todoRepo.save(todo);
    }

    @PutMapping("/{id}")
    public Todo update(@PathVariable Integer id, @RequestBody Todo todo) {
        todo.setId(id);
        return todoRepo.save(todo);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        todoRepo.deleteById(id);
    }
}