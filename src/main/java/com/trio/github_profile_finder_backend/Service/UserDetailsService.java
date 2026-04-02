package com.trio.github_profile_finder_backend.Service;

import com.trio.github_profile_finder_backend.Entity.UserDetails;
import com.trio.github_profile_finder_backend.Repository.UserDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;

@Service
public class UserDetailsService {

    @Autowired
    private UserDetailsRepository userDetailsRepository;

    @Autowired
    private UserProfilePictureService userProfilePictureService;

    public UserDetails fetchAndStoreUserDetails(String userName) {
        String url = "https://api.github.com/users/" + userName;
        RestTemplate restTemplate = new RestTemplate();
        UserDetails userDetails = restTemplate.getForObject(url, UserDetails.class);

        if (userDetails != null) {
            UserDetails savedUserDetails = userDetailsRepository.save(userDetails);
            userProfilePictureService.saveUserProfilePicture(savedUserDetails);
            // Save user details to the database
            return savedUserDetails;
        }
        return null;
    }

    public Optional<UserDetails> getUserDetailsById(Long userId){
        return userDetailsRepository.findById(userId);
    }

}

