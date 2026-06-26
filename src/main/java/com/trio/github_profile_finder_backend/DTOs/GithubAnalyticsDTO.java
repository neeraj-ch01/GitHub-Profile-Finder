package com.trio.github_profile_finder_backend.DTOs;

import java.util.List;
import java.util.Map;

public class GithubAnalyticsDTO {
    private Map<String, Integer> languageDistribution;
    private List<GithubRepoDTO> topStarredRepos;
    private List<GithubRepoDTO> topForkedRepos;
    private String avatarUrl;

    public GithubAnalyticsDTO() {}

    public GithubAnalyticsDTO(Map<String, Integer> languageDistribution, List<GithubRepoDTO> topStarredRepos, List<GithubRepoDTO> topForkedRepos, String avatarUrl) {
        this.languageDistribution = languageDistribution;
        this.topStarredRepos = topStarredRepos;
        this.topForkedRepos = topForkedRepos;
        this.avatarUrl = avatarUrl;
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
}
