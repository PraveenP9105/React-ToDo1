package com.amazon.amzdemo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.amazon.amzdemo.entity.Todo;
import com.amazon.amzdemo.repo.TodoRepo;

@Service
public class TodoService {

    @Autowired
    private TodoRepo todoRepo;

    public List<Todo> getAllTodos() {
        return todoRepo.findAll();
    }

    public Todo createTodo(Todo todo) {
        return todoRepo.save(todo);
    }

    public Todo updateTodo(Integer id, Todo todo) {

        Todo existing = todoRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found"));

        existing.setName(todo.getName());
        existing.setDescription(todo.getDescription());
        existing.setStatus(todo.getStatus());

        return todoRepo.save(existing);
    }

    public void deleteTodo(Integer id) {
        todoRepo.deleteById(id);
    }
}
