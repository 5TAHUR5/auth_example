package com.example.server.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class WaitingValidateUser {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String username;

    private String validateCod;

    public WaitingValidateUser() {}

    public WaitingValidateUser(String username, String validateCod) {
        this.username = username;
        this.validateCod = validateCod;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return username;
    }

    public void setEmail(String email) {
        this.username = email;
    }

    public String getValidateCod() {
        return validateCod;
    }

    public void setValidateCod(String validateCod) {
        this.validateCod = validateCod;
    }
}
