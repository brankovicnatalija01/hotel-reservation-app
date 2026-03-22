package com.natalija.hotelapp.config;

import com.natalija.hotelapp.security.AuthTokenFilter;
import com.natalija.hotelapp.security.UserDetailsServiceImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
    private UserDetailsServiceImpl userDetailsService;

    public SecurityConfig(UserDetailsServiceImpl userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @Bean
    public AuthTokenFilter authenticationJwtTokenFilter() {
        return new AuthTokenFilter();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "Cache-Control"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) {
        private static final String ROLE_ADMIN = "ADMIN";
        private static final String ROLE_USER = "USER";
        private static final String RESERVATIONS_ALL = "/api/reservations/**";
        private static final String ROOMS_BY_ID = "/api/rooms/{id}";

        http.cors(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth ->
                        // --- PUBLIC
                        auth.requestMatchers("/api/auth/**").permitAll()
                                .requestMatchers(HttpMethod.GET, "/api/rooms", "/api/rooms/filter/**", "/api/amenities").permitAll()
                                .requestMatchers(HttpMethod.POST, "/api/rooms/search").permitAll()
                                .requestMatchers(HttpMethod.GET, "/api/reviews", "/api/reviews/room/**").permitAll()
                                .requestMatchers(HttpMethod.GET, "/api/room-types").permitAll()

                                // --- USER and ADMIN ---
                                .requestMatchers(HttpMethod.POST, "/api/reservations", "/api/reviews").hasAnyRole(ROLE_USER, ROLE_ADMIN)
                                .requestMatchers(HttpMethod.PUT, "/api/reviews/**", "/api/reservations/cancel/*").hasAnyRole(ROLE_USER, ROLE_ADMIN)
                                .requestMatchers(HttpMethod.DELETE, "/api/reviews/**").hasAnyRole(ROLE_USER, ROLE_ADMIN)
                                .requestMatchers(HttpMethod.GET, "/api/reviews/user/**", "/api/reservations/user/**").hasAnyRole(ROLE_USER, ROLE_ADMIN)

                                // --- ADMIN ONLY ---
                                .requestMatchers("/api/reservations/search").hasRole(ROLE_ADMIN)
                                .requestMatchers(HttpMethod.GET, RESERVATIONS_ALL, ROOMS_BY_ID).hasRole(ROLE_ADMIN)
                                .requestMatchers(HttpMethod.POST, "/api/rooms").hasRole(ROLE_ADMIN)
                                .requestMatchers(HttpMethod.PUT, RESERVATIONS_ALL, ROOMS_BY_ID).hasRole(ROLE_ADMIN)
                                .requestMatchers(HttpMethod.DELETE, RESERVATIONS_ALL, ROOMS_BY_ID).hasRole(ROLE_ADMIN)

                                .anyRequest().authenticated()
                );

        http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
