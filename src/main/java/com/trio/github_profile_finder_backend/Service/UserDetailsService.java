package com.trio.github_profile_finder_backend.Service;

import com.trio.github_profile_finder_backend.DTOs.GithubUserProfileDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class UserDetailsService {

    public GithubUserProfileDTO fetchUserDetails(String userName) {
        String url = "https://api.github.com/users/" + userName;
        RestTemplate restTemplate = new RestTemplate();
        try {
            return restTemplate.getForObject(url, GithubUserProfileDTO.class);
        } catch (Exception e) {
            // Handle exceptions such as 404 Not Found from GitHub API
            return null;
        }
    }
}
