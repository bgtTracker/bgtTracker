package pl.edu.pw.bgtTracker.api.auth;

public class SecurityConstants {
    public static final String SECRET = "bgtTracker Secret Key";
    public static final long EXPIRATION_TIME_MILLIS = 10 * 24 * 3600 * 1000;
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final String REGISTER_URL = "/api/auth/register";
    public static final String LOGIN_URL = "/api/auth/login";
}
