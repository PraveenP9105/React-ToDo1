package com.amazon.amzdemo.repo;
import org.springframework.data.jpa.repository.JpaRepository;

import com.amazon.amzdemo.entity.Todo;

public interface TodoRepo extends JpaRepository<Todo, Integer> {

}
