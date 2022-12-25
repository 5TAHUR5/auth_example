package com.example.server.model;


import java.util.Set;

public class UserForGetProfile {


    private String password;
    private String username;
    private String name;
    private String link;

    public UserForGetProfile() {}


    public UserForGetProfile(String username, String password, String name, String link) {
        this.password = password;
        this.username = username;
        this.name = name;
        this.link = link;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }


    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
