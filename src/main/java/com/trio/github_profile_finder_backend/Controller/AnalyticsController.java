package com.trio.github_profile_finder_backend.Controller;

import com.trio.github_profile_finder_backend.DTOs.GithubAnalyticsDTO;
import com.trio.github_profile_finder_backend.Service.AnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
public class AnalyticsController {

    @Autowired
    private AnalyticsService analyticsService;

    @GetMapping("/api/github/analytics/{userName}")
    public Mono<ResponseEntity<GithubAnalyticsDTO>> getAnalytics(@PathVariable String userName) {
        return analyticsService.getAnalyticsForUser(userName)
                .map(analytics -> new ResponseEntity<>(analytics, HttpStatus.OK))
                .defaultIfEmpty(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
