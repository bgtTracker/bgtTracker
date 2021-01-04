package pl.edu.pw.bgtTracker.api.auth;

import com.auth0.jwt.JWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.UncheckedIOException;
import java.util.ArrayList;
import java.util.Date;

import static com.auth0.jwt.algorithms.Algorithm.HMAC512;
import static pl.edu.pw.bgtTracker.api.auth.SecurityConstants.*;

public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager manager;

    public JWTAuthenticationFilter(AuthenticationManager manager) {
        setFilterProcessesUrl(LOGIN_URL);
        this.manager = manager;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest req, HttpServletResponse res) throws AuthenticationException {
        try {
            UserCredentials creds = new ObjectMapper().readValue(req.getInputStream(), UserCredentials.class);
            return manager.authenticate(new UsernamePasswordAuthenticationToken(creds.getUsername(), creds.getPassword(), new ArrayList<>()));
        } catch (IOException e) {
            throw new UncheckedIOException(e);
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest req, HttpServletResponse res, FilterChain chain, Authentication auth) {
        String token = JWT.create()
                .withSubject(auth.getName())
                .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRATION_TIME_MILLIS))
                .sign(HMAC512(SECRET.getBytes()));
        res.addHeader(HEADER_STRING, TOKEN_PREFIX + token);
    }
}
