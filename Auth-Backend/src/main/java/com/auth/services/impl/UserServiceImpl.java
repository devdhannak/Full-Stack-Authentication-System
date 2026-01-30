package com.auth.services.impl;
import com.auth.dtos.UserDTO;
import com.auth.entity.Provider;
import com.auth.entity.User;
import com.auth.exceptions.ResourceNotFoundException;
import com.auth.helpers.UserHelper;
import com.auth.repositories.UserRepository;
import com.auth.services.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    @Override
    @Transactional
    public UserDTO createUser(UserDTO userDTO) {

        if(userDTO.getEmail() == null || userDTO.getEmail().isBlank()){
            throw new IllegalArgumentException("Email is required");
        }
        if(userRepository.existsByEmail(userDTO.getEmail())){
            throw  new IllegalArgumentException("Email already exists");
        }

        User user = modelMapper.map(userDTO, User.class);
        user.setProvider(userDTO.getProvider() != null ? userDTO.getProvider() : Provider.LOCAL) ;

        // TODO:
        // Role Assigning here to new user for authorization
        User savedUser = userRepository.save(user);
        return modelMapper.map(savedUser,UserDTO.class);
    }

    @Override
    public UserDTO getUserByEmail(String email) {

       User user = userRepository
                .findByEmail(email)
                .orElseThrow(()-> new ResourceNotFoundException("User not found with give email Id" ));

        return modelMapper.map(user,UserDTO.class);
    }

    @Override
    public UserDTO getUserById(String userId) {
        User user = userRepository.findById(UserHelper.parseUUID(userId)).orElseThrow(()-> new ResourceNotFoundException("User is not found with the given id: " + userId));
        return modelMapper.map(user,UserDTO.class);
    }

    @Override
    public UserDTO updateUser(UserDTO userDTO, String userId) {
        UUID id  = UserHelper.parseUUID(userId);
        User user = userRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("No user found with this id: " + id));

        // we are not going to change the email id for this project
        if(userDTO.getName() != null) user.setName(userDTO.getName());
        if(userDTO.getImage() != null) user.setImage(userDTO.getImage());
        if(userDTO.getProvider() != null) user.setProvider(userDTO.getProvider());
        // TODO: change the password updation logic
        if(userDTO.getPassword() != null) user.setPassword(userDTO.getPassword());
        user.setEnable(userDTO.getEnable());
        user.setUpdatedAt(Instant.now());
        User updatedUser = userRepository.save(user);
        return modelMapper.map(updatedUser,UserDTO.class);

    }

    @Override
    public void deleteUser(String userId) {
        UUID id = UserHelper.parseUUID(userId);
       User user =  userRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("User is not found with the given id: " + id));
       userRepository.delete(user);
    }

    @Override
    @Transactional
    public Iterable<UserDTO> getAllUsers() {
        return userRepository
                .findAll()
                .stream()
                .map((user) -> modelMapper.map(user, UserDTO.class))
                .toList();
    }
}
