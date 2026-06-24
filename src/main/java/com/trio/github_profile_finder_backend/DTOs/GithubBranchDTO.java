package com.trio.github_profile_finder_backend.DTOs;

public class GithubBranchDTO {
    
    private String name;
    
    private BranchCommit commit;

    public GithubBranchDTO() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BranchCommit getCommit() {
        return commit;
    }

    public void setCommit(BranchCommit commit) {
        this.commit = commit;
    }

    public static class BranchCommit {
        private String sha;
        private String url;

        public String getSha() {
            return sha;
        }

        public void setSha(String sha) {
            this.sha = sha;
        }

        public String getUrl() {
            return url;
        }

        public void setUrl(String url) {
            this.url = url;
        }
    }
}
