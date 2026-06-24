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

import java.net.URI;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

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

        URI uri = UriComponentsBuilder.fromHttpUrl("https://api.github.com/search/users")
                .queryParam("q", query.toString().trim())
                .queryParam("page", page != null ? page : 1)
                .queryParam("per_page", size != null ? size : 30)
                .build().encode().toUri();

        try {
            ResponseEntity<GithubSearchResponseDTO<GithubUserProfileDTO>> response = restTemplate.exchange(
                    uri,
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

        URI uri = UriComponentsBuilder.fromHttpUrl("https://api.github.com/search/repositories")
                .queryParam("q", queryStr.trim())
                .queryParam("page", page != null ? page : 1)
                .queryParam("per_page", size != null ? size : 30)
                .build().encode().toUri();

        try {
            ResponseEntity<GithubSearchResponseDTO<GithubRepoDTO>> response = restTemplate.exchange(
                    uri,
                    HttpMethod.GET,
                    null,
                    new ParameterizedTypeReference<GithubSearchResponseDTO<GithubRepoDTO>>() {}
            );
            return response.getBody();
        } catch (Exception e) {
            return null;
        }
    }

    public GithubSearchResponseDTO<GithubRepoDTO> getTrendingRepositories(String language, String since, Integer page, Integer size) {
        LocalDate date = LocalDate.now();
        if ("daily".equalsIgnoreCase(since)) {
            date = date.minusDays(1);
        } else if ("monthly".equalsIgnoreCase(since)) {
            date = date.minusDays(30);
        } else {
            // default to weekly
            date = date.minusDays(7);
        }

        String formattedDate = date.format(DateTimeFormatter.ISO_LOCAL_DATE);
        StringBuilder query = new StringBuilder("created:>").append(formattedDate);
        
        if (language != null && !language.trim().isEmpty()) {
            query.append(" language:").append(language.trim());
        }

        URI uri = UriComponentsBuilder.fromHttpUrl("https://api.github.com/search/repositories")
                .queryParam("q", query.toString())
                .queryParam("sort", "stars")
                .queryParam("order", "desc")
                .queryParam("page", page != null ? page : 1)
                .queryParam("per_page", size != null ? size : 30)
                .build().encode().toUri();

        try {
            ResponseEntity<GithubSearchResponseDTO<GithubRepoDTO>> response = restTemplate.exchange(
                    uri,
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
