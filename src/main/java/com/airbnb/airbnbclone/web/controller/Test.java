package com.airbnb.airbnbclone.web.controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
public class Test {
        @GetMapping("/")
        public String home() {
            return "Backend is working!";
        }
    }

