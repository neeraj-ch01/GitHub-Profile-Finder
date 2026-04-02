package com.trio.github_profile_finder_backend.Service;

import com.trio.github_profile_finder_backend.Entity.UserDetails;
import com.trio.github_profile_finder_backend.Entity.UserProfilePicture;
import com.trio.github_profile_finder_backend.Repository.UserProfilePictureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.Optional;

@Service
public class UserProfilePictureService {

    @Autowired
    private UserProfilePictureRepository userProfilePictureRepository;

    public void saveUserProfilePicture(UserDetails userDetails) {
        try {
            byte[] imageBytes = fetchImageFromUrl(userDetails.getAvatarUrl());

            UserProfilePicture profilePicture = new UserProfilePicture();
            profilePicture.setAvatarUrl(userDetails.getAvatarUrl());
            profilePicture.setImage(imageBytes);
            profilePicture.setUserDetails(userDetails);

            userProfilePictureRepository.save(profilePicture);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public Optional<UserProfilePicture> getUserProfilePictureByUserId(Long userId) {
        return userProfilePictureRepository.findById(userId);
    }

    private byte[] fetchImageFromUrl(String imageUrl) throws IOException {
        URL url = new URL(imageUrl);
        try (InputStream inputStream = url.openStream()) {
            return inputStream.readAllBytes();
        }
    }
}
