package com.trio.github_profile_finder_backend.Controller;

import com.trio.github_profile_finder_backend.Entity.User;
import com.trio.github_profile_finder_backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user){
        User savedUser = userService.saveUser(user);
        return new ResponseEntity<>("Registration Successfull", HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginUser(@RequestBody User user){
        boolean isAuthenticated = userService.loginUser(user.getEmail(), user.getPassword());
        Map<String, Object> response = new HashMap<>();
        if(isAuthenticated){
            Optional<User> loggedInUser = userService.findByEmail(user.getEmail());
            if(loggedInUser.isPresent()){
                response.put("message","Login Successful");
                response.put("id",loggedInUser.get().getId());
                return new ResponseEntity<>(response, HttpStatus.OK);
            }
        }
        response.put("message", "Invalid email or password");
        return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logoutUser(@RequestBody Map<String, Long>request){
        Long userId = request.get("id");
        Optional<User> userOptional = userService.findById(userId);
        if(userOptional.isPresent()){
            userService.logoutUser(userId);
            return new ResponseEntity<>("Logout Successful",HttpStatus.OK);

        }
        return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
    }
}
