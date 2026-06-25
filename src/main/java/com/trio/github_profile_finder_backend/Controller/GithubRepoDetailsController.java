package com.trio.github_profile_finder_backend.Controller;

import com.trio.github_profile_finder_backend.DTOs.GithubRepoDTO;
import com.trio.github_profile_finder_backend.DTOs.GithubIssueDTO;
import com.trio.github_profile_finder_backend.DTOs.GithubCommitDTO;
import com.trio.github_profile_finder_backend.DTOs.GithubBranchDTO;
import com.trio.github_profile_finder_backend.DTOs.GithubReadmeDTO;
import com.trio.github_profile_finder_backend.Service.GithubRepoDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/github/repos/{owner}/{repo}")
public class GithubRepoDetailsController {

    @Autowired
    private GithubRepoDetailsService githubRepoDetailsService;

    @GetMapping
    public Mono<ResponseEntity<GithubRepoDTO>> getRepositoryDetails(@PathVariable String owner, @PathVariable String repo) {
        return githubRepoDetailsService.getRepositoryDetails(owner, repo)
                .map(repoDetails -> new ResponseEntity<>(repoDetails, HttpStatus.OK))
                .defaultIfEmpty(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/issues")
    public Mono<ResponseEntity<List<GithubIssueDTO>>> getRepositoryIssues(@PathVariable String owner, @PathVariable String repo) {
        return githubRepoDetailsService.getRepositoryIssues(owner, repo)
                .map(issues -> new ResponseEntity<>(issues, HttpStatus.OK))
                .defaultIfEmpty(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/commits")
    public Mono<ResponseEntity<List<GithubCommitDTO>>> getRepositoryCommits(@PathVariable String owner, @PathVariable String repo) {
        return githubRepoDetailsService.getRepositoryCommits(owner, repo)
                .map(commits -> new ResponseEntity<>(commits, HttpStatus.OK))
                .defaultIfEmpty(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/branches")
    public Mono<ResponseEntity<List<GithubBranchDTO>>> getRepositoryBranches(@PathVariable String owner, @PathVariable String repo) {
        return githubRepoDetailsService.getRepositoryBranches(owner, repo)
                .map(branches -> new ResponseEntity<>(branches, HttpStatus.OK))
                .defaultIfEmpty(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/readme")
    public Mono<ResponseEntity<GithubReadmeDTO>> getRepositoryReadme(@PathVariable String owner, @PathVariable String repo) {
        return githubRepoDetailsService.getRepositoryReadme(owner, repo)
                .map(readme -> new ResponseEntity<>(readme, HttpStatus.OK))
                .defaultIfEmpty(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/languages")
    public Mono<ResponseEntity<Map<String, Long>>> getRepositoryLanguages(@PathVariable String owner, @PathVariable String repo) {
        return githubRepoDetailsService.getRepositoryLanguages(owner, repo)
                .map(languages -> new ResponseEntity<>(languages, HttpStatus.OK))
                .defaultIfEmpty(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
