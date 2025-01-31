package com.forum.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration // Marks this class as a configuration class for Spring
public class WebConfig {

    @Bean // Defines a Spring bean for WebMvcConfigurer
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                // Configure Cross-Origin Resource Sharing (CORS) settings

                registry.addMapping("/**") // Apply CORS settings to all endpoints
                        .allowedOrigins("http://localhost:3000") // Allow requests from this frontend URL (replace with production URL)
                        .allowedMethods("*") // Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
                        .allowedHeaders("*"); // Allow all headers
            }
        };
    }
}
