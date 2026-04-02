package com.trio.github_profile_finder_backend.Repository;

import com.trio.github_profile_finder_backend.Entity.UserDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDetailsRepository extends JpaRepository<UserDetails, Long>{

}

