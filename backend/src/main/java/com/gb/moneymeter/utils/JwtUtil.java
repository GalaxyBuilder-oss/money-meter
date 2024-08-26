package com.gb.moneymeter.utils;

import com.gb.moneymeter.entities.UserData;
import io.jsonwebtoken.*;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.concurrent.TimeUnit;

@Component
public class JwtUtil {

    private final String secretKey = "react2024";

    private final JwtParser jwtParser;

    public JwtUtil() {
        this.jwtParser = Jwts.parser().setSigningKey(secretKey);
    }

    public String generateToken(UserData user) {
        Claims claims = Jwts.claims().setSubject(user.getHashEmail());
        claims.put("email", user.getHashEmail());

        Date tokenCreateTime = new Date();
        long accessTokenValidity = 60L * 60L * 1000L;
        Date tokenValidity = new Date(tokenCreateTime.getTime() +
                TimeUnit.MINUTES.toMillis(accessTokenValidity));

        return Jwts.builder()
                .setClaims(claims)
                .setExpiration(tokenValidity)
                .signWith(SignatureAlgorithm.HS512, secretKey)
                .compact();
    }

    private Claims parseJwtClaims(String token) {
        return jwtParser.parseClaimsJws(token).getBody();
    }

    public Claims resolveClaims(HttpServletRequest req) {
        try {
            String token = resolveToken(req);
            if (token != null) {
                return parseJwtClaims(token);
            }
            return null;
        } catch (ExpiredJwtException ex) {
            req.setAttribute("expired", ex.getMessage());
            throw ex;
        } catch (Exception ex) {
            req.setAttribute("invalid", ex.getMessage());
            throw ex;
        }
    }

    public String resolveToken(HttpServletRequest request) {

        String TOKEN_HEADER = "Authorization";
        String bearerToken = request.getHeader(TOKEN_HEADER);
        String TOKEN_PREFIX = "Bearer ";
        if (bearerToken != null && bearerToken.startsWith(TOKEN_PREFIX)) {
            return bearerToken.substring(TOKEN_PREFIX.length());
        }
        return null;
    }

    public boolean validateClaims(Claims claims) {
        try {
            return claims.getExpiration().after(new Date());
        } catch (Exception e) {
            throw e;
        }
    }
}