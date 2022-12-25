package com.example.server.controller;

import com.example.server.config.JwtUtil;
import com.example.server.domain.User;
import com.example.server.domain.WaitingValidateUser;
import com.example.server.model.GetValidateCodeRequest;
import com.example.server.model.JwtRequest;
import com.example.server.model.RegistrationRequest;
import com.example.server.repos.UserRepo;
import com.example.server.repos.WaitingValidateUserRepo;
import com.example.server.service.MailSender;
import com.example.server.service.UserService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
public class UserAuthController {

    private final UserRepo userRepo;
    private final UserService userDetailsService;
    private final WaitingValidateUserRepo waitingValidateUserRepo;
    private final MailSender mailSender;
    private final JwtUtil jwtTokenUtil;

    public UserAuthController(JwtUtil jwtTokenUtil, UserRepo userRepo, UserService userDetailsService, WaitingValidateUserRepo waitingValidateUserRepo, MailSender mailSender) {
        this.jwtTokenUtil = jwtTokenUtil;
        this.userRepo = userRepo;
        this.userDetailsService = userDetailsService;
        this.waitingValidateUserRepo = waitingValidateUserRepo;
        this.mailSender = mailSender;
    }




    @RequestMapping(value = "/registration", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody RegistrationRequest authenticationRequest) {
        User emergingUser = new User(authenticationRequest.getUsername(),
                authenticationRequest.getName(),
                authenticationRequest.getPassword(),
                UUID.randomUUID().toString());
        if (!waitingValidateUserRepo
                .findByUsername(emergingUser.getUsername())
                .getValidateCod()
                .equals(authenticationRequest.getCode())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Неверный код потверждения");
        } else if (userDetailsService.addUser(emergingUser) &&
                authenticationRequest.getUsername() != null &&
                authenticationRequest.getName() != null &&
                authenticationRequest.getPassword() != null) {
            waitingValidateUserRepo.delete(waitingValidateUserRepo.findByUsername(emergingUser.getUsername()));
            return ResponseEntity.ok("Пользователь успешно создан");
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Пользователь с таким email существует");
        }
    }

    @RequestMapping(value = "/send_validate_code", method = RequestMethod.POST)
    public ResponseEntity<?> getValidateEmailCode(@RequestBody GetValidateCodeRequest request) {
        if (userRepo.findByUsername(request.getUsername()) == null) {
            String validationCode = "";
            validationCode = validationCode + (int) (Math.random() * 1000);
            validationCode = validationCode + (int) (Math.random() * 1000);
            validationCode = validationCode + (int) (Math.random() * 1000);
            System.out.println("Code" + validationCode);
            String message = String.format(
                    "Здравствуйте, %s! \n" +
                            "Ваш код подверждения почты: %s",
                    request.getName(),
                    validationCode
            );
            mailSender.send(request.getUsername(), "Activation Code", message);
            waitingValidateUserRepo.save(new WaitingValidateUser(request.getUsername(), validationCode));
            return ResponseEntity.ok("Сообщение отправлено");
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Пользователь с таким email уже существует");
        }
    }

    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) {
        try {
            User user = (User) userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
            if(user.getPassword().equals(authenticationRequest.getPassword())) {
                return ResponseEntity.ok(jwtTokenUtil.generateToken(user));
            } else {
                return  ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Неправильный email или пароль");
            }
        } catch (UsernameNotFoundException err) {
            err.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Неправильный email или пароль");
        }
    }

    @GetMapping("/check_jwt_token_to_expired")
    public ResponseEntity<?> checkTokenOnExpired(HttpServletResponse response) {
        try {
            if (response.getHeader(HttpHeaders.AUTHORIZATION).equals("Token_was_expired")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token_was_expired");
            } else {
                return ResponseEntity.ok("Token_is_valid");
            }
        } catch (Exception e) {
            return ResponseEntity.ok("Token_is_valid");
        }
    }

}
