package com.trio.github_profile_finder_backend.DTOs;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.Date;

public class GithubIssueDTO {
    
    private Long id;
    private String title;
    private String state;
    
    @JsonProperty("html_url")
    private String htmlUrl;
    
    @JsonProperty("created_at")
    private Date createdAt;
    
    private GithubUserProfileDTO user;

    public GithubIssueDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getHtmlUrl() {
        return htmlUrl;
    }

    public void setHtmlUrl(String htmlUrl) {
        this.htmlUrl = htmlUrl;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public GithubUserProfileDTO getUser() {
        return user;
    }

    public void setUser(GithubUserProfileDTO user) {
        this.user = user;
    }
}
