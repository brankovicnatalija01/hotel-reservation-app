package com.natalija.hotelapp.security;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.natalija.hotelapp.entity.User;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

public class UserDetailsImpl implements UserDetails {
        @Getter
        private Long id;
        private String email;
        @JsonIgnore
        private String password;
        private Collection<? extends GrantedAuthority> authorities;

        public UserDetailsImpl(Long id, String email, String password, Collection<? extends GrantedAuthority> authorities) {
            this.id = id;
            this.email = email;
            this.password = password;
            this.authorities = authorities;
        }

    /**
     * Factory method to build UserDetailsImpl from our User entity.
     * Handles role prefixing for Spring Security compatibility.
     */
    public static UserDetailsImpl build(User user) {
        // Get role name from entity, handle potential nulls safely
        String roleName = Optional.ofNullable(user.getRole())
                .map(role -> role.getName())
                .orElse("USER");

        // Spring Security requires roles to start with "ROLE_" prefix
        if (!roleName.startsWith("ROLE_")) {
            roleName = "ROLE_" + roleName;
        }

        List<GrantedAuthority> authorities = Collections.singletonList(
                new SimpleGrantedAuthority(roleName)
        );

        return new UserDetailsImpl(
                user.getId(),
                user.getEmail(),
                user.getPassword(),
                authorities);
    }

        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            return authorities;
        }
        @Override
        public String getPassword() {
            return password;
        }
        @Override
        public String getUsername() {
            return email; // Email as the username for authentication
        }
        @Override
        public boolean isAccountNonExpired() {
            return true;
        }
        @Override
        public boolean isAccountNonLocked() {
            return true;
        }
        @Override
        public boolean isCredentialsNonExpired() {
            return true;
        }
        @Override
        public boolean isEnabled() {
            return true;
        }
    }

