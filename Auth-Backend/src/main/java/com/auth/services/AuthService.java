package com.auth.services;

import com.auth.dtos.UserDTO;

public interface AuthService {

    UserDTO registerUser(UserDTO userDTO);

}
