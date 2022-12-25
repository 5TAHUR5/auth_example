package com.example.server.repos;

import com.example.server.domain.WaitingValidateUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


public interface WaitingValidateUserRepo extends JpaRepository<WaitingValidateUser, Long> {

    WaitingValidateUser findByUsername(String username);
    WaitingValidateUser findByValidateCod(String validateCod);


}
