package com.forum.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf().disable() // Deaktiviert CSRF-Schutz (nur für Entwicklung, in Produktion aktivieren)
                .authorizeHttpRequests()
                // Öffentliche Routen, die keine Authentifizierung erfordern
                .requestMatchers("/api/auth/**").permitAll()
                // Alle anderen Routen erfordern Authentifizierung
                .anyRequest().authenticated()
                .and()
                // Standardmäßige HTTP-Basis-Authentifizierung
                .httpBasic();

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        // BCryptPasswordEncoder wird verwendet, um Passwörter sicher zu hashen
        return new BCryptPasswordEncoder();
    }
}
