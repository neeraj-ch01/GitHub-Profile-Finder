package com.trio.github_profile_finder_backend.Controller;

import com.trio.github_profile_finder_backend.Entity.UserRepo;
import com.trio.github_profile_finder_backend.Service.UserRepoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserRepoController {

    @Autowired
    private UserRepoService userRepoService;

    @GetMapping("api/github/repos")
    public ResponseEntity<String> getRepositories(@RequestParam String userName){
        userRepoService.fetchAndStoreRepositories(userName);
        return new ResponseEntity<>("Repositories fetch and store success", HttpStatus.OK);
    }

    @GetMapping("api/github/repos/allrepos")
    public ResponseEntity<List<UserRepo>> getAllRepositories(){
        List<UserRepo> repositories = userRepoService.getAllRepositories();
        return new ResponseEntity<>(repositories, HttpStatus.OK);
    }


}
