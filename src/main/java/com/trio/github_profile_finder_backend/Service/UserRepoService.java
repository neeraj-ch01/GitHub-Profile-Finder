package com.trio.github_profile_finder_backend.Service;

import com.trio.github_profile_finder_backend.DTOs.GithubRepoDTO;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class UserRepoService {

    public List<GithubRepoDTO> fetchUserRepositories(String userName) {
        String url = "https://api.github.com/users/" + userName + "/repos";
        RestTemplate restTemplate = new RestTemplate();
        try {
            ResponseEntity<List<GithubRepoDTO>> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    null,
                    new ParameterizedTypeReference<List<GithubRepoDTO>>() {}
            );
            return response.getBody();
        } catch (Exception e) {
            // Handle exceptions such as 404 Not Found from GitHub API
            return null;
        }
    }
}
