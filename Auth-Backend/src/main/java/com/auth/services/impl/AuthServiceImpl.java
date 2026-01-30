package com.auth.services.impl;

import com.auth.dtos.UserDTO;
import com.auth.services.AuthService;
import com.auth.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDTO registerUser(UserDTO userDTO) {

        // logic here
        // role assign

        if (userDTO.getEnable() == null) {
            userDTO.setEnable(false);
        }

        userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        return userService.createUser(userDTO);
    }
}
