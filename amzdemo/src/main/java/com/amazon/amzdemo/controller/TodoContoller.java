package com.amazon.amzdemo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.amazon.amzdemo.entity.Todo;
import com.amazon.amzdemo.service.TodoService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/todos")
public class TodoContoller {

    @Autowired
    private TodoService todoService;

    @GetMapping
    public List<Todo> getAll() {
        return todoService.getAllTodos();
    }

    @PostMapping
    public Todo create(@RequestBody Todo todo) {
        return todoService.createTodo(todo);
    }

    @PutMapping("/{id}")
    public Todo update(@PathVariable Integer id, @RequestBody Todo todo) {
        return todoService.updateTodo(id, todo);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        todoService.deleteTodo(id);
    }
}
