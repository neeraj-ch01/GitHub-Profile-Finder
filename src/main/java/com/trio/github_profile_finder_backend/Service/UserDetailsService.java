package com.trio.github_profile_finder_backend.Service;

import com.trio.github_profile_finder_backend.DTOs.GithubUserProfileDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class UserDetailsService {

    private final WebClient webClient = WebClient.create();

    public Mono<GithubUserProfileDTO> fetchUserDetails(String userName) {
        String url = "https://api.github.com/users/" + userName;
        return webClient.get()
                .uri(url)
                .retrieve()
                .bodyToMono(GithubUserProfileDTO.class)
                .onErrorResume(e -> Mono.empty());
    }
}
