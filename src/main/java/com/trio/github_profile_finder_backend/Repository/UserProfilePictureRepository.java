package com.trio.github_profile_finder_backend.Repository;

import com.trio.github_profile_finder_backend.Entity.UserProfilePicture;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserProfilePictureRepository extends JpaRepository<UserProfilePicture, Long> {
}
