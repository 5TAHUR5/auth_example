package com.example.server.model;

import java.io.Serializable;

public class RegistrationRequest implements Serializable {

    private static final long serialVersionUID = 5926468583005150707L;

    private String username;
    private String name;
    private String password;

    private String code;

    public RegistrationRequest() {

    }
    public RegistrationRequest(String username, String name, String password, String code) {
        this.username = username;
        this.name = name;
        this.password = password;
        this.code = code;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}