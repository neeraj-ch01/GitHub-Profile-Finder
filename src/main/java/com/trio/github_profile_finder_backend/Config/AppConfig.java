package com.trio.github_profile_finder_backend.Config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class AppConfig {

    @Value("${GITHUB_TOKEN}")
    private String githubToken;

    @Bean
    public WebClient.Builder webClientBuilder() {
        return WebClient.builder()
                .baseUrl("https://api.github.com")
                .defaultHeader("Accept", "application/vnd.github.v3+json");
    }

    @Bean
    public WebClient webClient(WebClient.Builder builder) {
        if (githubToken != null && !githubToken.trim().isEmpty()) {
            builder.defaultHeader("Authorization", "Bearer " + githubToken.trim());
        }
        return builder.build();
    }
}
