package com.trio.github_profile_finder_backend.Filter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.lang.NonNull;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

@Component
public class ApiLoggingFilter implements WebFilter {

    private static final Logger logger = LoggerFactory.getLogger(ApiLoggingFilter.class);

    @Override
    @NonNull
    @SuppressWarnings("null")
    public Mono<Void> filter(@NonNull ServerWebExchange exchange, @NonNull WebFilterChain chain) {
        long startTime = System.currentTimeMillis();
        String method = exchange.getRequest().getMethod().name();
        String path = exchange.getRequest().getURI().getPath();

        logger.info("[Backend API Request] {} {}", method, path);

        return chain.filter(exchange).doOnSuccess(aVoid -> {
            long duration = System.currentTimeMillis() - startTime;
            var statusCode = exchange.getResponse().getStatusCode();
            int status = statusCode != null ? statusCode.value() : 200;
            logger.info("[Backend API Response] {} {} - Status: {} ({} ms)", method, path, status, duration);
        }).doOnError(throwable -> {
            long duration = System.currentTimeMillis() - startTime;
            logger.error("[Backend API Error] {} {} - Failed with {} ({} ms)", method, path, throwable.getMessage(), duration);
        });
    }
}
