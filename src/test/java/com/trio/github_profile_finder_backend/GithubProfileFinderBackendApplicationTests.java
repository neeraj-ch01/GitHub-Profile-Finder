package com.trio.github_profile_finder_backend;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class GithubProfileFinderBackendApplicationTests {

	@org.springframework.beans.factory.annotation.Value("${FRONTEND_URL}")
	private String frontendUrl;

	@Test
	void contextLoads() {
		System.out.println("FRONTEND_URL Loaded from .env: " + frontendUrl);
		org.junit.jupiter.api.Assertions.assertEquals("http://localhost:3000", frontendUrl);
	}
}
