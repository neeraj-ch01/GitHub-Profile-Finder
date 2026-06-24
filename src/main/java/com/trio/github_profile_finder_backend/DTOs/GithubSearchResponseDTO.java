package com.trio.github_profile_finder_backend.DTOs;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public class GithubSearchResponseDTO<T> {
    
    @JsonProperty("total_count")
    private Integer totalCount;
    
    @JsonProperty("incomplete_results")
    private Boolean incompleteResults;
    
    private List<T> items;

    public GithubSearchResponseDTO() {
    }

    public Integer getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(Integer totalCount) {
        this.totalCount = totalCount;
    }

    public Boolean getIncompleteResults() {
        return incompleteResults;
    }

    public void setIncompleteResults(Boolean incompleteResults) {
        this.incompleteResults = incompleteResults;
    }

    public List<T> getItems() {
        return items;
    }

    public void setItems(List<T> items) {
        this.items = items;
    }
}
