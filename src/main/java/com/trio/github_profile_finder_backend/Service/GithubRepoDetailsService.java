package com.trio.github_profile_finder_backend.Service;

import com.trio.github_profile_finder_backend.DTOs.GithubRepoDTO;
import com.trio.github_profile_finder_backend.DTOs.GithubIssueDTO;
import com.trio.github_profile_finder_backend.DTOs.GithubCommitDTO;
import com.trio.github_profile_finder_backend.DTOs.GithubBranchDTO;
import com.trio.github_profile_finder_backend.DTOs.GithubReadmeDTO;
import java.util.Map;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class GithubRepoDetailsService {

    @Autowired
    private WebClient webClient;
    private final String GITHUB_API_URL = "https://api.github.com/repos/";

    public Mono<GithubRepoDTO> getRepositoryDetails(String owner, String repo) {
        String url = GITHUB_API_URL + owner + "/" + repo;
        return webClient.get()
                .uri(url)
                .retrieve()
                .bodyToMono(GithubRepoDTO.class)
                .onErrorResume(e -> {
                    e.printStackTrace();
                    return Mono.empty();
                });
    }

    public Mono<List<GithubIssueDTO>> getRepositoryIssues(String owner, String repo) {
        String url = GITHUB_API_URL + owner + "/" + repo + "/issues";
        return webClient.get()
                .uri(url)
                .retrieve()
                .bodyToMono(new org.springframework.core.ParameterizedTypeReference<List<GithubIssueDTO>>() {})
                .onErrorResume(e -> {
                    e.printStackTrace();
                    return Mono.empty();
                });
    }

    public Mono<List<GithubCommitDTO>> getRepositoryCommits(String owner, String repo) {
        String url = GITHUB_API_URL + owner + "/" + repo + "/commits";
        return webClient.get()
                .uri(url)
                .retrieve()
                .bodyToMono(new org.springframework.core.ParameterizedTypeReference<List<GithubCommitDTO>>() {})
                .onErrorResume(e -> {
                    e.printStackTrace();
                    return Mono.empty();
                });
    }

    public Mono<List<GithubBranchDTO>> getRepositoryBranches(String owner, String repo) {
        String url = GITHUB_API_URL + owner + "/" + repo + "/branches";
        return webClient.get()
                .uri(url)
                .retrieve()
                .bodyToMono(new org.springframework.core.ParameterizedTypeReference<List<GithubBranchDTO>>() {})
                .onErrorResume(e -> {
                    e.printStackTrace();
                    return Mono.empty();
                });
    }

    public Mono<GithubReadmeDTO> getRepositoryReadme(String owner, String repo) {
        String url = GITHUB_API_URL + owner + "/" + repo + "/readme";
        return webClient.get()
                .uri(url)
                .retrieve()
                .bodyToMono(GithubReadmeDTO.class)
                .onErrorResume(e -> {
                    e.printStackTrace();
                    return Mono.empty();
                });
    }

    public Mono<Map<String, Long>> getRepositoryLanguages(String owner, String repo) {
        String url = GITHUB_API_URL + owner + "/" + repo + "/languages";
        return webClient.get()
                .uri(url)
                .retrieve()
                .bodyToMono(new org.springframework.core.ParameterizedTypeReference<Map<String, Long>>() {})
                .onErrorResume(e -> {
                    e.printStackTrace();
                    return Mono.empty();
                });
    }
}
