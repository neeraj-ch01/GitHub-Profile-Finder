package com.trio.github_profile_finder_backend.Repository;

import com.trio.github_profile_finder_backend.Entity.UserRepo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepoRepository extends JpaRepository<UserRepo, Long> {
}
