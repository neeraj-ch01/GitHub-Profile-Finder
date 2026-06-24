package com.trio.github_profile_finder_backend.Controller;

import com.trio.github_profile_finder_backend.DTOs.GithubSearchResponseDTO;
import com.trio.github_profile_finder_backend.DTOs.GithubUserProfileDTO;
import com.trio.github_profile_finder_backend.DTOs.GithubRepoDTO;
import com.trio.github_profile_finder_backend.Service.GithubSearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/github/search")
public class GithubSearchController {

    @Autowired
    private GithubSearchService githubSearchService;

    @GetMapping("/users")
    public ResponseEntity<GithubSearchResponseDTO<GithubUserProfileDTO>> searchUsers(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String language,
            @RequestParam(required = false) String company,
            @RequestParam(required = false) Integer minRepos,
            @RequestParam(required = false, defaultValue = "1") Integer page,
            @RequestParam(required = false, defaultValue = "30") Integer size) {

        GithubSearchResponseDTO<GithubUserProfileDTO> results = githubSearchService.searchUsers(
                name, location, language, company, minRepos, page, size);

        if (results != null) {
            return new ResponseEntity<>(results, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/repositories")
    public ResponseEntity<GithubSearchResponseDTO<GithubRepoDTO>> searchRepositories(
            @RequestParam String q,
            @RequestParam(required = false, defaultValue = "1") Integer page,
            @RequestParam(required = false, defaultValue = "30") Integer size) {

        GithubSearchResponseDTO<GithubRepoDTO> results = githubSearchService.searchRepositories(q, page, size);

        if (results != null) {
            return new ResponseEntity<>(results, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
