package com.trio.github_profile_finder_backend.Service;

import com.trio.github_profile_finder_backend.DTOs.GithubUserProfileDTO;
import com.trio.github_profile_finder_backend.DTOs.GithubEventDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Service
public class UserDetailsService {

    @Autowired
    private WebClient webClient;

    public Mono<GithubUserProfileDTO> fetchUserDetails(String userName) {
        String url = "https://api.github.com/users/" + userName;
        return webClient.get()
                .uri(url)
                .retrieve()
                .bodyToMono(GithubUserProfileDTO.class)
                .onErrorResume(e -> Mono.empty());
    }

    public Mono<List<GithubEventDTO>> fetchUserEvents(String userName) {
        String url = "https://api.github.com/users/" + userName + "/events/public";
        return webClient.get()
                .uri(url)
                .retrieve()
                .bodyToMono(new org.springframework.core.ParameterizedTypeReference<List<GithubEventDTO>>() {})
                .onErrorResume(e -> Mono.empty());
    }
}
