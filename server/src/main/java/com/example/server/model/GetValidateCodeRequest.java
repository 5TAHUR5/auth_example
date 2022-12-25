package com.example.server.model;

import java.io.Serializable;

public class GetValidateCodeRequest implements Serializable {

    private static final long serialVersionUID = 5926468583005150707L;

    private String username;

    private String name;

    //need default constructor for JSON Parsing
    public GetValidateCodeRequest() {

    }

    public GetValidateCodeRequest(String name, String username) {
        this.name = name;
        this.username = username;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
