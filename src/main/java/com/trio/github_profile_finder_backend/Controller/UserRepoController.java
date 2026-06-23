package com.trio.github_profile_finder_backend.Controller;

import com.trio.github_profile_finder_backend.DTOs.GithubRepoDTO;
import com.trio.github_profile_finder_backend.Service.UserRepoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserRepoController {

    @Autowired
    private UserRepoService userRepoService;

    @GetMapping("/api/github/users/{userName}/repos")
    public ResponseEntity<List<GithubRepoDTO>> getUserRepositories(@PathVariable String userName) {
        List<GithubRepoDTO> repositories = userRepoService.fetchUserRepositories(userName);
        
        if (repositories != null) {
            return new ResponseEntity<>(repositories, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
