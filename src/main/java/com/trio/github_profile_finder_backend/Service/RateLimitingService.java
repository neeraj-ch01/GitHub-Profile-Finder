package com.trio.github_profile_finder_backend.Service;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
public class RateLimitingService {

    private final Cache<String, Bucket> uuidBuckets = Caffeine.newBuilder()
            .expireAfterAccess(Duration.ofHours(1))
            .maximumSize(10000)
            .build();

    private final Cache<String, Bucket> ipBuckets = Caffeine.newBuilder()
            .expireAfterAccess(Duration.ofHours(1))
            .maximumSize(10000)
            .build();

    // 100 requests per hour for UUID
    private Bucket createNewUuidBucket() {
        Bandwidth limit = Bandwidth.builder().capacity(100).refillIntervally(100, Duration.ofHours(1)).build();
        return Bucket.builder().addLimit(limit).build();
    }

    // 600 requests per hour for IP
    private Bucket createNewIpBucket() {
        Bandwidth limit = Bandwidth.builder().capacity(600).refillIntervally(600, Duration.ofHours(1)).build();
        return Bucket.builder().addLimit(limit).build();
    }

    public Bucket resolveUuidBucket(String uuid) {
        return uuidBuckets.get(uuid, k -> createNewUuidBucket());
    }

    public Bucket resolveIpBucket(String ip) {
        return ipBuckets.get(ip, k -> createNewIpBucket());
    }
}
