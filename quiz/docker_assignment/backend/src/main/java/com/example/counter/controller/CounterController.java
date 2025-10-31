package com.example.counter.controller;

import com.example.counter.entity.Counter;
import com.example.counter.service.CounterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/counter")
@CrossOrigin(origins = "*")
public class CounterController {

    @Autowired
    private CounterService counterService;

    @GetMapping
    public ResponseEntity<Counter> getCounter() {
        return ResponseEntity.ok(counterService.getCounter());
    }

    @PostMapping("/increment")
    public ResponseEntity<Counter> increment() {
        return ResponseEntity.ok(counterService.increment());
    }

    @PostMapping("/decrement")
    public ResponseEntity<Counter> decrement() {
        return ResponseEntity.ok(counterService.decrement());
    }

    @PostMapping("/reset")
    public ResponseEntity<Counter> reset() {
        return ResponseEntity.ok(counterService.reset());
    }
}
