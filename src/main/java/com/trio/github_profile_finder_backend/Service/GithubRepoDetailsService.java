package com.trio.github_profile_finder_backend.Service;

import com.trio.github_profile_finder_backend.DTOs.GithubRepoDTO;
import com.trio.github_profile_finder_backend.DTOs.GithubIssueDTO;
import com.trio.github_profile_finder_backend.DTOs.GithubCommitDTO;
import com.trio.github_profile_finder_backend.DTOs.GithubBranchDTO;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class GithubRepoDetailsService {

    private final RestTemplate restTemplate = new RestTemplate();
    private final String GITHUB_API_URL = "https://api.github.com/repos/";

    public GithubRepoDTO getRepositoryDetails(String owner, String repo) {
        String url = GITHUB_API_URL + owner + "/" + repo;
        try {
            return restTemplate.getForObject(url, GithubRepoDTO.class);
        } catch (Exception e) {
            return null;
        }
    }

    public List<GithubIssueDTO> getRepositoryIssues(String owner, String repo) {
        String url = GITHUB_API_URL + owner + "/" + repo + "/issues";
        try {
            ResponseEntity<List<GithubIssueDTO>> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    null,
                    new ParameterizedTypeReference<List<GithubIssueDTO>>() {}
            );
            return response.getBody();
        } catch (Exception e) {
            return null;
        }
    }

    public List<GithubCommitDTO> getRepositoryCommits(String owner, String repo) {
        String url = GITHUB_API_URL + owner + "/" + repo + "/commits";
        try {
            ResponseEntity<List<GithubCommitDTO>> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    null,
                    new ParameterizedTypeReference<List<GithubCommitDTO>>() {}
            );
            return response.getBody();
        } catch (Exception e) {
            return null;
        }
    }

    public List<GithubBranchDTO> getRepositoryBranches(String owner, String repo) {
        String url = GITHUB_API_URL + owner + "/" + repo + "/branches";
        try {
            ResponseEntity<List<GithubBranchDTO>> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    null,
                    new ParameterizedTypeReference<List<GithubBranchDTO>>() {}
            );
            return response.getBody();
        } catch (Exception e) {
            return null;
        }
    }
}
