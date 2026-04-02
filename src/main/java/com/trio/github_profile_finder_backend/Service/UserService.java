package com.trio.github_profile_finder_backend.Service;

import com.trio.github_profile_finder_backend.Entity.User;
import com.trio.github_profile_finder_backend.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    public User saveUser(User user){
        return userRepository.save(user);
    }

    public Optional<User> findById(Long id){
        return userRepository.findById(id);
    }
    public Optional<User> findByEmail(String email){
        return userRepository.findByEmail(email);
    }

    public Boolean loginUser(String email, String password){
        Optional<User> userOptional = userRepository.findByEmail(email);
        if(userOptional.isPresent()){
            User user = userOptional.get();
            if(user.getPassword().equals(password)){
                user.setLoggedIn(true);
                userRepository.save(user);
                return true;
            }
        }
        return false;
    }

    public void logoutUser(Long id){
        Optional<User> userOptional = userRepository.findById(id);
        if(userOptional.isPresent()){
            User user = userOptional.get();
            user.setLoggedIn(false);
            userRepository.save(user);
        }
    }


}
