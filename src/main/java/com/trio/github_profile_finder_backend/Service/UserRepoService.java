package com.trio.github_profile_finder_backend.Service;

import com.trio.github_profile_finder_backend.DTOs.GithubRepoDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class UserRepoService {

    @Autowired
    private WebClient webClient;

    public Mono<List<GithubRepoDTO>> fetchUserRepositories(String userName) {
        String url = "https://api.github.com/users/" + userName + "/repos";
        return webClient.get()
                .uri(url)
                .retrieve()
                .bodyToMono(new org.springframework.core.ParameterizedTypeReference<List<GithubRepoDTO>>() {})
                .onErrorResume(e -> Mono.empty());
    }
}
