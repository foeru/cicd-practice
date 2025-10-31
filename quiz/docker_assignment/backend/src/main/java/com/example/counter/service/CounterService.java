package com.example.counter.service;

import com.example.counter.entity.Counter;
import com.example.counter.repository.CounterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CounterService {

    @Autowired
    private CounterRepository counterRepository;

    public Counter getCounter() {
        return counterRepository.findById(1L)
                .orElseGet(() -> {
                    Counter counter = new Counter(0);
                    counter.setId(1L);
                    return counterRepository.save(counter);
                });
    }

    @Transactional
    public Counter increment() {
        Counter counter = getCounter();
        counter.increment();
        return counterRepository.save(counter);
    }

    @Transactional
    public Counter decrement() {
        Counter counter = getCounter();
        counter.decrement();
        return counterRepository.save(counter);
    }

    @Transactional
    public Counter reset() {
        Counter counter = getCounter();
        counter.setValue(0);
        return counterRepository.save(counter);
    }
}
