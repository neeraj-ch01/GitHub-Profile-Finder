package com.trio.github_profile_finder_backend.Controller;

import com.trio.github_profile_finder_backend.DTOs.GithubRepoDTO;
import com.trio.github_profile_finder_backend.DTOs.GithubIssueDTO;
import com.trio.github_profile_finder_backend.DTOs.GithubCommitDTO;
import com.trio.github_profile_finder_backend.DTOs.GithubBranchDTO;
import com.trio.github_profile_finder_backend.Service.GithubRepoDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/github/repos/{owner}/{repo}")
public class GithubRepoDetailsController {

    @Autowired
    private GithubRepoDetailsService githubRepoDetailsService;

    @GetMapping
    public ResponseEntity<GithubRepoDTO> getRepositoryDetails(@PathVariable String owner, @PathVariable String repo) {
        GithubRepoDTO repoDetails = githubRepoDetailsService.getRepositoryDetails(owner, repo);
        if (repoDetails != null) {
            return new ResponseEntity<>(repoDetails, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/issues")
    public ResponseEntity<List<GithubIssueDTO>> getRepositoryIssues(@PathVariable String owner, @PathVariable String repo) {
        List<GithubIssueDTO> issues = githubRepoDetailsService.getRepositoryIssues(owner, repo);
        if (issues != null) {
            return new ResponseEntity<>(issues, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/commits")
    public ResponseEntity<List<GithubCommitDTO>> getRepositoryCommits(@PathVariable String owner, @PathVariable String repo) {
        List<GithubCommitDTO> commits = githubRepoDetailsService.getRepositoryCommits(owner, repo);
        if (commits != null) {
            return new ResponseEntity<>(commits, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/branches")
    public ResponseEntity<List<GithubBranchDTO>> getRepositoryBranches(@PathVariable String owner, @PathVariable String repo) {
        List<GithubBranchDTO> branches = githubRepoDetailsService.getRepositoryBranches(owner, repo);
        if (branches != null) {
            return new ResponseEntity<>(branches, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
