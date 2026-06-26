package com.trio.github_profile_finder_backend.Filter;

import com.trio.github_profile_finder_backend.Service.RateLimitingService;
import io.github.bucket4j.Bucket;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;
import org.springframework.lang.NonNull;

@Component
public class RateLimitWebFilter implements WebFilter {

    private final RateLimitingService rateLimitingService;

    public RateLimitWebFilter(RateLimitingService rateLimitingService) {
        this.rateLimitingService = rateLimitingService;
    }

    @Override
    @NonNull
    public Mono<Void> filter(@NonNull ServerWebExchange exchange, @NonNull WebFilterChain chain) {
        String path = exchange.getRequest().getURI().getPath();

        if (path.startsWith("/api/")) {
            String clientId = exchange.getRequest().getHeaders().getFirst("X-Client-ID");
            String clientIp = null;
            
            java.net.InetSocketAddress remoteAddress = exchange.getRequest().getRemoteAddress();
            if (remoteAddress != null && remoteAddress.getAddress() != null) {
                clientIp = remoteAddress.getAddress().getHostAddress();
            }

            if (clientIp == null) {
                clientIp = "unknown-ip";
            }

            Bucket ipBucket = rateLimitingService.resolveIpBucket(clientIp);
            if (!ipBucket.tryConsume(1)) {
                exchange.getResponse().setStatusCode(HttpStatus.TOO_MANY_REQUESTS);
                return exchange.getResponse().setComplete();
            }

            if (clientId != null && !clientId.trim().isEmpty()) {
                Bucket uuidBucket = rateLimitingService.resolveUuidBucket(clientId);
                if (!uuidBucket.tryConsume(1)) {
                    exchange.getResponse().setStatusCode(HttpStatus.TOO_MANY_REQUESTS);
                    return exchange.getResponse().setComplete();
                }
            }
        }

        return chain.filter(exchange);
    }
}
