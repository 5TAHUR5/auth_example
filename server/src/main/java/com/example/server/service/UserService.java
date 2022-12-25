package com.example.server.service;

import com.example.server.domain.User;
import com.example.server.repos.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) {
//        if ("test".equals(email)) {
//            return new org.springframework.security.core.userdetails.User("test", "123",
//                    new ArrayList<>());
//        } else {
//            throw new UsernameNotFoundException("User not found with username: " + email);
//        }
        User userFromDB = userRepo.findByUsername(username);
        if (userFromDB != null) {
            return userFromDB;
        } else {
            throw new UsernameNotFoundException("Пользователь не был найден");
        }
    }

    public boolean addUser(User user) {
        if (userRepo.findByUsername(user.getUsername()) != null) {
            return false;
        }
        user.setActive(true);
        userRepo.save(user);
        return true;
    }

}
