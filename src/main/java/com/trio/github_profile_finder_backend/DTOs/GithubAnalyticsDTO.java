package com.trio.github_profile_finder_backend.DTOs;

import java.util.List;
import java.util.Map;

public class GithubAnalyticsDTO {
    private Map<String, Integer> languageDistribution;
    private List<GithubRepoDTO> topStarredRepos;
    private List<GithubRepoDTO> topForkedRepos;
    private String avatarUrl;
    private Integer totalStars;
    private Integer totalForks;
    private Map<String, Integer> topicDistribution;

    public GithubAnalyticsDTO() {}

    public GithubAnalyticsDTO(Map<String, Integer> languageDistribution, List<GithubRepoDTO> topStarredRepos, List<GithubRepoDTO> topForkedRepos, String avatarUrl, Integer totalStars, Integer totalForks, Map<String, Integer> topicDistribution) {
        this.languageDistribution = languageDistribution;
        this.topStarredRepos = topStarredRepos;
        this.topForkedRepos = topForkedRepos;
        this.avatarUrl = avatarUrl;
        this.totalStars = totalStars;
        this.totalForks = totalForks;
        this.topicDistribution = topicDistribution;
    }

    public Map<String, Integer> getLanguageDistribution() {
        return languageDistribution;
    }

    public void setLanguageDistribution(Map<String, Integer> languageDistribution) {
        this.languageDistribution = languageDistribution;
    }

    public List<GithubRepoDTO> getTopStarredRepos() {
        return topStarredRepos;
    }

    public void setTopStarredRepos(List<GithubRepoDTO> topStarredRepos) {
        this.topStarredRepos = topStarredRepos;
    }

    public List<GithubRepoDTO> getTopForkedRepos() {
        return topForkedRepos;
    }

    public void setTopForkedRepos(List<GithubRepoDTO> topForkedRepos) {
        this.topForkedRepos = topForkedRepos;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public Integer getTotalStars() {
        return totalStars;
    }

    public void setTotalStars(Integer totalStars) {
        this.totalStars = totalStars;
    }

    public Integer getTotalForks() {
        return totalForks;
    }

    public void setTotalForks(Integer totalForks) {
        this.totalForks = totalForks;
    }

    public Map<String, Integer> getTopicDistribution() {
        return topicDistribution;
    }

    public void setTopicDistribution(Map<String, Integer> topicDistribution) {
        this.topicDistribution = topicDistribution;
    }
}
