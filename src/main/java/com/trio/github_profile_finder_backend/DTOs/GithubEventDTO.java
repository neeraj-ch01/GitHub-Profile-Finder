package com.trio.github_profile_finder_backend.DTOs;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.Map;

@JsonIgnoreProperties(ignoreUnknown = true)
public class GithubEventDTO {
    private String id;
    private String type;
    private ActorDTO actor;
    private RepoDTO repo;
    private Map<String, Object> payload;
    
    @JsonProperty("public")
    private boolean isPublic;
    
    @JsonProperty("created_at")
    private String createdAt;

    public GithubEventDTO() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public ActorDTO getActor() {
        return actor;
    }

    public void setActor(ActorDTO actor) {
        this.actor = actor;
    }

    public RepoDTO getRepo() {
        return repo;
    }

    public void setRepo(RepoDTO repo) {
        this.repo = repo;
    }

    public Map<String, Object> getPayload() {
        return payload;
    }

    public void setPayload(Map<String, Object> payload) {
        this.payload = payload;
    }

    public boolean isPublic() {
        return isPublic;
    }

    public void setPublic(boolean isPublic) {
        this.isPublic = isPublic;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public static class ActorDTO {
        private Long id;
        private String login;
        
        @JsonProperty("display_login")
        private String displayLogin;
        
        @JsonProperty("avatar_url")
        private String avatarUrl;

        public ActorDTO() {
        }

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getLogin() {
            return login;
        }

        public void setLogin(String login) {
            this.login = login;
        }

        public String getDisplayLogin() {
            return displayLogin;
        }

        public void setDisplayLogin(String displayLogin) {
            this.displayLogin = displayLogin;
        }

        public String getAvatarUrl() {
            return avatarUrl;
        }

        public void setAvatarUrl(String avatarUrl) {
            this.avatarUrl = avatarUrl;
        }
    }

    public static class RepoDTO {
        private Long id;
        private String name;
        private String url;

        public RepoDTO() {
        }

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getUrl() {
            return url;
        }

        public void setUrl(String url) {
            this.url = url;
        }
    }
}
