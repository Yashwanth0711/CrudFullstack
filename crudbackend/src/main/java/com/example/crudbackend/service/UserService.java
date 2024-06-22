package com.example.crudbackend.service;

import com.example.crudbackend.exception.UserNotFoundException;
import com.example.crudbackend.model.User;
import com.example.crudbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User newUser(User user) {
        return userRepository.save(user);
    }

    public List<User> getAllUser(){
        return userRepository.findAll();
    }

    public User getUserById(Long id){
        return userRepository.findById(id)
                .orElseThrow(()->new UserNotFoundException(id));
    }

    public User updateUser(Long id, User newUser){
        return userRepository.findById(id)
                .map(user->{
                            user.setName(newUser.getName());
                            user.setUsername(newUser.getUsername());
                            user.setEmail(newUser.getEmail());
                            return userRepository.save(user);
                        }
                ).orElseThrow(()->new UserNotFoundException(id));
    }

    public String deleteUser(Long id){
        if(!userRepository.existsById(id)){
            throw new UserNotFoundException(id);
        }
            userRepository.deleteById(id);
        return "User with id "+id+"deleted";
    }
}
