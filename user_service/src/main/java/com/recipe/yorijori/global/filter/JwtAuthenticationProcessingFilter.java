package com.recipe.yorijori.global.filter;


import com.recipe.yorijori.data.domain.User;
import com.recipe.yorijori.repository.UserRepository;
import com.recipe.yorijori.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.mapping.GrantedAuthoritiesMapper;
import org.springframework.security.core.authority.mapping.NullAuthoritiesMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationProcessingFilter extends OncePerRequestFilter {

    private static final String NO_CHECK_URL = "/api/v1/users/login";
    private static final String NO_CHECK_URL2 = "/api/v1/users/refresh-token";
    private static final String NO_CHECK_URL3 = "/oauth2/authorization/naver";
    private static final String NO_CHECK_URL4 = "/login/oauth2/code/naver";
    private static final String NO_CHECK_URL5 = "/favicon.ico";
    private static final String NO_CHECK_URL6 = "/api/v1/users/common";
    private static final String NO_CHECK_URL7 = "/api/v1/users/simple";
    private static final String NO_CHECK_URL8 = "/api/v1/users/rank";
    private static final String NO_CHECK_URL9 = "/api/v1/users/user";
    private static final String NO_CHECK_URL10 = "/api/v1/users/recipe/other";
    private final JwtService jwtService;
    private final UserRepository userRepository;

    private GrantedAuthoritiesMapper authoritiesMapper = new NullAuthoritiesMapper();

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        log.info("Request URI: " + request.getRequestURI());
        if (request.getRequestURI().equals(NO_CHECK_URL) || request.getRequestURI().equals(NO_CHECK_URL2) ||
                request.getRequestURI().equals(NO_CHECK_URL3) || request.getRequestURI().equals(NO_CHECK_URL4) ||
                request.getRequestURI().equals(NO_CHECK_URL5) || request.getRequestURI().equals(NO_CHECK_URL6) ||
                request.getRequestURI().startsWith(NO_CHECK_URL7) || request.getRequestURI().equals(NO_CHECK_URL8) ||
                request.getRequestURI().startsWith(NO_CHECK_URL9) || request.getRequestURI().startsWith(NO_CHECK_URL10)) {
            log.info("No check URL : {}", request.getRequestURI());
            filterChain.doFilter(request, response);
            return;
        }


        String refreshToken = jwtService.extractRefreshToken(request)
                .filter(jwtService::isTokenValid)
                .orElse(null);

        if (refreshToken != null) {
            checkRefreshTokenAndReIssueAccessToken(response, refreshToken);
            return;
        }

        if (refreshToken == null) {
            boolean isAccessTokenValid = checkAccessTokenAndAuthentication(request, response, filterChain);
            if (!isAccessTokenValid) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("AccessToken is invalid or expired. Please provide a valid token.");
                return;
            }
        }

        filterChain.doFilter(request, response);

    }

    public void checkRefreshTokenAndReIssueAccessToken(HttpServletResponse response, String refreshToken) {
        userRepository.findByRefreshToken(refreshToken)
                .ifPresent(user -> {
                    String reIssuedRefreshToken = reIssueRefreshToken(user);
                    jwtService.sendAccessAndRefreshToken(response, jwtService.createAccessToken(user.getEmail()),
                            reIssuedRefreshToken);

                });
    }

    private String reIssueRefreshToken(User user) {
        String reIssuedRefreshToken = jwtService.createRefreshToken();
        user.updateRefreshToken(reIssuedRefreshToken);
        userRepository.saveAndFlush(user);
        return reIssuedRefreshToken;
    }

    public boolean checkAccessTokenAndAuthentication(HttpServletRequest request, HttpServletResponse response,
                                                     FilterChain filterChain) throws ServletException, IOException {
        boolean isValid = jwtService.extractAccessToken(request)
                .filter(jwtService::isTokenValid)
                .map(accessToken -> jwtService.extractEmail(accessToken)
                        .map(email -> userRepository.findByEmail(email)
                                .map(user -> {
                                    saveAuthentication(user);
                                    return true;
                                }).orElse(false))
                        .orElse(false))
                .orElse(false);

        return isValid;
    }

    public void saveAuthentication(User myUser) {
        String password = myUser.getPassword();
        if (password == null) {
            password = RandomStringUtils.randomAlphanumeric(10);
        }

        UserDetails userDetailsUser = org.springframework.security.core.userdetails.User.builder()
                .username(myUser.getEmail())
                .password(password)
                .roles(myUser.getRole().name())
                .build();

        Authentication authentication =
                new UsernamePasswordAuthenticationToken(userDetailsUser, null,
                        authoritiesMapper.mapAuthorities(userDetailsUser.getAuthorities()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}