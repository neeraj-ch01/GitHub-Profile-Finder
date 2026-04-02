package com.trio.github_profile_finder_backend.Controller;

import com.trio.github_profile_finder_backend.Entity.User;
import com.trio.github_profile_finder_backend.Entity.UserDetails;
import com.trio.github_profile_finder_backend.Service.UserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Optional;

@RestController
public class UserDetailsController {

    @Autowired
    private UserDetailsService userDetailsService;

    @GetMapping("/api/github/save/user_details")
    public ResponseEntity<?> getUserDetails(@RequestParam String userName) {
        UserDetails userDetails = userDetailsService.fetchAndStoreUserDetails(userName);

        if(userDetails!=null){
            return new ResponseEntity<>(userDetails.getUserId(), HttpStatus.OK);
        }
        return new ResponseEntity<>("User details could not be fetched or stored", HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/api/github/get/user_details/{userId}")
    public ResponseEntity<UserDetails> getUserDetailsById(@PathVariable Long userId) {
        Optional<UserDetails> userDetails = userDetailsService.getUserDetailsById(userId);
        return userDetails.map(details -> new ResponseEntity<>(details,HttpStatus.OK))
                .orElseGet(()-> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}


