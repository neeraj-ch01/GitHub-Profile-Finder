package com.trio.github_profile_finder_backend.Controller;

import com.trio.github_profile_finder_backend.DTOs.GithubUserProfileDTO;
import com.trio.github_profile_finder_backend.Service.UserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
public class UserDetailsController {

    @Autowired
    private UserDetailsService userDetailsService;

    @GetMapping("/api/github/users/{userName}")
    public Mono<ResponseEntity<GithubUserProfileDTO>> getUserDetails(@PathVariable String userName) {
        return userDetailsService.fetchUserDetails(userName)
                .map(userDetails -> new ResponseEntity<>(userDetails, HttpStatus.OK))
                .defaultIfEmpty(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
