package com.mycompany.myapp.security;

/**
 * Constants for Spring Security authorities.
 */
public final class AuthoritiesConstants {

    public static final String ADMIN = "ROLE_ADMIN";

    public static final String USER = "ROLE_USER";

    public static final String ANONYMOUS = "ROLE_ANONYMOUS";

    public static final String APPROVER = "ROLE_APPROVER";

    public static final String ADMIN_COMP = "ROLE_ADMIN_COMP";

    private AuthoritiesConstants() {}
}
