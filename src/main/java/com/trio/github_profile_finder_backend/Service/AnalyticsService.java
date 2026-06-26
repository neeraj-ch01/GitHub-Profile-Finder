package com.trio.github_profile_finder_backend.Service;

import com.trio.github_profile_finder_backend.DTOs.GithubAnalyticsDTO;
import com.trio.github_profile_finder_backend.DTOs.GithubRepoDTO;
import com.trio.github_profile_finder_backend.DTOs.GithubUserProfileDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AnalyticsService {

    @Autowired
    private UserRepoService userRepoService;
    
    @Autowired
    private UserDetailsService userDetailsService;

    public Mono<GithubAnalyticsDTO> getAnalyticsForUser(String userName) {
        Mono<GithubUserProfileDTO> userMono = userDetailsService.fetchUserDetails(userName);
        Mono<List<GithubRepoDTO>> reposMono = userRepoService.fetchUserRepositories(userName);

        return Mono.zip(userMono, reposMono)
                .map(tuple -> {
                    GithubUserProfileDTO user = tuple.getT1();
                    List<GithubRepoDTO> repos = tuple.getT2();
                    
                    Map<String, Integer> languageDistribution = new HashMap<>();
                    Map<String, Integer> topicDistribution = new HashMap<>();
                    int totalStars = 0;
                    int totalForks = 0;
                    
                    for (GithubRepoDTO repo : repos) {
                        String lang = repo.getLanguage();
                        if (lang != null && !lang.trim().isEmpty()) {
                            languageDistribution.put(lang, languageDistribution.getOrDefault(lang, 0) + 1);
                        }

                        if (repo.getStargazersCount() != null) {
                            totalStars += repo.getStargazersCount();
                        }

                        if (repo.getForksCount() != null) {
                            totalForks += repo.getForksCount();
                        }

                        if (repo.getTopics() != null) {
                            for (String topic : repo.getTopics()) {
                                if (topic != null && !topic.trim().isEmpty()) {
                                    topicDistribution.put(topic, topicDistribution.getOrDefault(topic, 0) + 1);
                                }
                            }
                        }
                    }

                    List<GithubRepoDTO> topStarred = repos.stream()
                            .sorted(Comparator.comparing(GithubRepoDTO::getStargazersCount, Comparator.nullsFirst(Comparator.naturalOrder())).reversed())
                            .limit(5)
                            .collect(Collectors.toList());

                    List<GithubRepoDTO> topForked = repos.stream()
                            .sorted(Comparator.comparing(GithubRepoDTO::getForksCount, Comparator.nullsFirst(Comparator.naturalOrder())).reversed())
                            .limit(5)
                            .collect(Collectors.toList());

                    return new GithubAnalyticsDTO(languageDistribution, topStarred, topForked, user.getAvatarUrl(), totalStars, totalForks, topicDistribution);
                });
    }
}
