package com.trio.github_profile_finder_backend.Service;

import com.trio.github_profile_finder_backend.Entity.UserRepo;
import com.trio.github_profile_finder_backend.Repository.UserDetailsRepository;
import com.trio.github_profile_finder_backend.Repository.UserRepoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

@Service
public class UserRepoService {

    @Autowired
    private UserRepoRepository userRepoRepository;

    @Autowired
    private UserDetailsRepository userDetailsRepository;

    public void fetchAndStoreRepositories(String userName){
        String url = "https://api.github.com/users/"+userName+"/repos";
        RestTemplate restTemplate = new RestTemplate();
        UserRepo[] repositories = restTemplate.getForObject(url, UserRepo[].class);

        if(repositories!=null){
            List<UserRepo> repositoryList = Arrays.asList(repositories);
            repositoryList.forEach(repo->{
                repo.setId(null);
                userRepoRepository.save(repo);
            });
        }
    }

    public List<UserRepo> getAllRepositories(){

        return userRepoRepository.findAll();
    }
}
