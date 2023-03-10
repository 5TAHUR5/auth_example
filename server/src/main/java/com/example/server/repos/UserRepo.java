package com.example.server.repos;

import com.example.server.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User, Long> {
    User findByUsername(String username);
    User findByName(String name);
    User findByLink(String link);


}
