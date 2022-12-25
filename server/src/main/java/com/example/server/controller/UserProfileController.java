package com.example.server.controller;


import com.example.server.model.UserForGetProfile;
import com.example.server.repos.UserRepo;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
public class UserProfileController {

    private final UserRepo userRepo;

    public UserProfileController(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @GetMapping("/get_profile")
    @CrossOrigin(origins = "*", maxAge = 3600)
    public ResponseEntity<?> getPeopleProfile(@AuthenticationPrincipal UserDetails user) {
        try {
            UserForGetProfile userForGetProfile = userRepo.findByUsername(user.getUsername()).getParametersForGetProfile();
            return ResponseEntity.ok().body(userForGetProfile);
        } catch (NullPointerException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Пользователь не найден");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Нечто странное происходит в этом мире");
        }
    }




}
