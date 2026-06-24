package com.trio.github_profile_finder_backend.Controller;

import com.trio.github_profile_finder_backend.DTOs.GithubRepoDTO;
import com.trio.github_profile_finder_backend.Service.UserRepoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
public class UserRepoController {

    @Autowired
    private UserRepoService userRepoService;

    @GetMapping("/api/github/users/{userName}/repos")
    public Mono<ResponseEntity<List<GithubRepoDTO>>> getUserRepositories(@PathVariable String userName) {
        return userRepoService.fetchUserRepositories(userName)
                .map(repositories -> new ResponseEntity<>(repositories, HttpStatus.OK))
                .defaultIfEmpty(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
