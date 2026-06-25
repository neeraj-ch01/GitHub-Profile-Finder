package com.trio.github_profile_finder_backend.Config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.config.CorsRegistry;
import org.springframework.web.reactive.config.WebFluxConfigurer;

@Configuration
public class WebConfig implements WebFluxConfigurer {

    @Value("${FRONTEND_URL}")
    private String frontendUrl;

    @Value("${GITHUB_TOKEN:}")
    private String githubToken;

    @Override
    public void addCorsMappings(@org.springframework.lang.NonNull CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(frontendUrl) // front-end URLs
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }

    @org.springframework.context.annotation.Bean
    public org.springframework.web.reactive.function.client.WebClient githubWebClient() {
        org.springframework.web.reactive.function.client.WebClient.Builder builder = org.springframework.web.reactive.function.client.WebClient.builder()
                .defaultHeader("User-Agent", "GithubProfileFinderApp");
        
        if (githubToken != null && !githubToken.trim().isEmpty()) {
            builder.defaultHeader("Authorization", "Bearer " + githubToken.trim());
        }
        
        return builder.build();
    }
}
