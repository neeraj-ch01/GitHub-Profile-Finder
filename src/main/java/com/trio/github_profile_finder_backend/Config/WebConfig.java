package com.trio.github_profile_finder_backend.Config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.config.CorsRegistry;
import org.springframework.web.reactive.config.WebFluxConfigurer;

@Configuration
public class WebConfig implements WebFluxConfigurer {

    @Value("${FRONTEND_URL}")
    private String frontendUrl;

    @Override
    public void addCorsMappings(@org.springframework.lang.NonNull CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(frontendUrl) // front-end URLs
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
