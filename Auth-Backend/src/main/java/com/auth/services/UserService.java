package com.auth.services;

import com.auth.dtos.UserDTO;
import com.auth.entity.User;

import java.util.UUID;

public interface UserService {

    // create User
    UserDTO createUser(UserDTO userDTO);

    // get user by email
    UserDTO getUserByEmail(String email);

    // get user by id
    UserDTO getUserById(String userId);

    // update user
    UserDTO updateUser(UserDTO userDTO, String userId);

    // delete user
    void deleteUser(String userId);

    // get All Users
    Iterable<UserDTO> getAllUsers();
}
