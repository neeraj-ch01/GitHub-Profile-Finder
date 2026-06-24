package com.trio.github_profile_finder_backend.Service;

import com.trio.github_profile_finder_backend.DTOs.GithubSearchResponseDTO;
import com.trio.github_profile_finder_backend.DTOs.GithubUserProfileDTO;
import com.trio.github_profile_finder_backend.DTOs.GithubRepoDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriComponentsBuilder;
import reactor.core.publisher.Mono;

import java.net.URI;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Service
public class GithubSearchService {

    private final WebClient webClient = WebClient.create();

    public Mono<GithubSearchResponseDTO<GithubUserProfileDTO>> searchUsers(
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
            return Mono.just(new GithubSearchResponseDTO<>());
        }

        URI uri = UriComponentsBuilder.fromHttpUrl("https://api.github.com/search/users")
                .queryParam("q", query.toString().trim())
                .queryParam("page", page != null ? page : 1)
                .queryParam("per_page", size != null ? size : 30)
                .build().encode().toUri();

        return webClient.get()
                .uri(uri)
                .retrieve()
                .bodyToMono(new org.springframework.core.ParameterizedTypeReference<GithubSearchResponseDTO<GithubUserProfileDTO>>() {})
                .onErrorResume(e -> Mono.empty());
    }

    public Mono<GithubSearchResponseDTO<GithubRepoDTO>> searchRepositories(String queryStr, Integer page, Integer size) {
        if (queryStr == null || queryStr.trim().isEmpty()) {
            return Mono.just(new GithubSearchResponseDTO<>());
        }

        URI uri = UriComponentsBuilder.fromHttpUrl("https://api.github.com/search/repositories")
                .queryParam("q", queryStr.trim())
                .queryParam("page", page != null ? page : 1)
                .queryParam("per_page", size != null ? size : 30)
                .build().encode().toUri();

        return webClient.get()
                .uri(uri)
                .retrieve()
                .bodyToMono(new org.springframework.core.ParameterizedTypeReference<GithubSearchResponseDTO<GithubRepoDTO>>() {})
                .onErrorResume(e -> Mono.empty());
    }

    public Mono<GithubSearchResponseDTO<GithubRepoDTO>> getTrendingRepositories(String language, String since, Integer page, Integer size) {
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

        return webClient.get()
                .uri(uri)
                .retrieve()
                .bodyToMono(new org.springframework.core.ParameterizedTypeReference<GithubSearchResponseDTO<GithubRepoDTO>>() {})
                .onErrorResume(e -> Mono.empty());
    }
}
