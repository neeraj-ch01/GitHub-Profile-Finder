package com.trio.github_profile_finder_backend.Controller;

import com.trio.github_profile_finder_backend.Entity.UserProfilePicture;
import com.trio.github_profile_finder_backend.Service.UserProfilePictureService;
import com.trio.github_profile_finder_backend.Utility.ImageFormatUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/user-profile-pictures")
public class UserProfilePictureController {

    @Autowired
    private UserProfilePictureService userProfilePictureService;

    @GetMapping("/{userId}")
    public ResponseEntity<byte[]> getUserProfilePicture(@PathVariable Long userId) {
        Optional<UserProfilePicture> profilePictureOptional = userProfilePictureService.getUserProfilePictureByUserId(userId);

        if (profilePictureOptional.isPresent()) {
            UserProfilePicture profilePicture = profilePictureOptional.get();
            byte[] imageData = profilePicture.getImage();

            String imageFormat = ImageFormatUtil.getImageFormat(imageData);
            if(imageFormat==null){
                return new ResponseEntity<>(HttpStatus.UNSUPPORTED_MEDIA_TYPE);
            }

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.parseMediaType(imageFormat));
            headers.setContentLength(imageData.length);

            return new ResponseEntity<>(imageData, headers, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}

