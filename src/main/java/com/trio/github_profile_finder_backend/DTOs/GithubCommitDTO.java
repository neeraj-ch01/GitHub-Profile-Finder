package com.trio.github_profile_finder_backend.DTOs;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.Date;

public class GithubCommitDTO {
    
    private String sha;
    
    @JsonProperty("html_url")
    private String htmlUrl;
    
    private CommitDetails commit;
    
    private GithubUserProfileDTO author;

    public GithubCommitDTO() {
    }

    public String getSha() {
        return sha;
    }

    public void setSha(String sha) {
        this.sha = sha;
    }

    public String getHtmlUrl() {
        return htmlUrl;
    }

    public void setHtmlUrl(String htmlUrl) {
        this.htmlUrl = htmlUrl;
    }

    public CommitDetails getCommit() {
        return commit;
    }

    public void setCommit(CommitDetails commit) {
        this.commit = commit;
    }

    public GithubUserProfileDTO getAuthor() {
        return author;
    }

    public void setAuthor(GithubUserProfileDTO author) {
        this.author = author;
    }

    public static class CommitDetails {
        private String message;
        private CommitAuthor author;

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }

        public CommitAuthor getAuthor() {
            return author;
        }

        public void setAuthor(CommitAuthor author) {
            this.author = author;
        }
    }

    public static class CommitAuthor {
        private String name;
        private String email;
        private Date date;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public Date getDate() {
            return date;
        }

        public void setDate(Date date) {
            this.date = date;
        }
    }
}
