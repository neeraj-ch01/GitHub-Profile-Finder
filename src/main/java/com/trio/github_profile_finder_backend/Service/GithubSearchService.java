package com.trio.github_profile_finder_backend.Service;

import com.trio.github_profile_finder_backend.DTOs.GithubSearchResponseDTO;
import com.trio.github_profile_finder_backend.DTOs.GithubUserProfileDTO;
import com.trio.github_profile_finder_backend.DTOs.GithubRepoDTO;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class GithubSearchService {

    private final RestTemplate restTemplate = new RestTemplate();

    public GithubSearchResponseDTO<GithubUserProfileDTO> searchUsers(
            String name, String location, String language, String company, Integer minRepos, Integer page, Integer size) {
        
        StringBuilder query = new StringBuilder();
        
        if (name != null && !name.trim().isEmpty()) {
            query.append(name).append(" in:name ");
        }
        if (location != null && !location.trim().isEmpty()) {
            query.append("location:").append(location).append(" ");
        }
        if (language != null && !language.trim().isEmpty()) {
            query.append("language:").append(language).append(" ");
        }
        if (company != null && !company.trim().isEmpty()) {
            query.append("company:").append(company).append(" ");
        }
        if (minRepos != null) {
            query.append("repos:>=").append(minRepos).append(" ");
        }

        // If no query parameters were provided, return an empty result or generic search
        if (query.toString().trim().isEmpty()) {
            return new GithubSearchResponseDTO<>();
        }

        String url = UriComponentsBuilder.fromHttpUrl("https://api.github.com/search/users")
                .queryParam("q", query.toString().trim())
                .queryParam("page", page != null ? page : 1)
                .queryParam("per_page", size != null ? size : 30)
                .toUriString();

        try {
            ResponseEntity<GithubSearchResponseDTO<GithubUserProfileDTO>> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    null,
                    new ParameterizedTypeReference<GithubSearchResponseDTO<GithubUserProfileDTO>>() {}
            );
            return response.getBody();
        } catch (Exception e) {
            return null;
        }
    }

    public GithubSearchResponseDTO<GithubRepoDTO> searchRepositories(String queryStr, Integer page, Integer size) {
        if (queryStr == null || queryStr.trim().isEmpty()) {
            return new GithubSearchResponseDTO<>();
        }

        String url = UriComponentsBuilder.fromHttpUrl("https://api.github.com/search/repositories")
                .queryParam("q", queryStr.trim())
                .queryParam("page", page != null ? page : 1)
                .queryParam("per_page", size != null ? size : 30)
                .toUriString();

        try {
            ResponseEntity<GithubSearchResponseDTO<GithubRepoDTO>> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    null,
                    new ParameterizedTypeReference<GithubSearchResponseDTO<GithubRepoDTO>>() {}
            );
            return response.getBody();
        } catch (Exception e) {
            return null;
        }
    }
}
