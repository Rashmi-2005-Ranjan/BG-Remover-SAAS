package in.clearifypro.Security;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.security.PublicKey;
import java.util.Base64;
import java.util.Collections;

@Component
@RequiredArgsConstructor
public class ClerkJwtAuthFilter extends OncePerRequestFilter {

    @Value("${clerk.issuer}")
    private String clerkIssuer;

    private final ClerkJwksProvider jwksProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request , HttpServletResponse response , FilterChain filterChain) throws ServletException, IOException {
        if (request.getRequestURI ( ).contains ( "/api/webhooks" )) {
            filterChain.doFilter ( request , response );
            return;
        }
        String authHeader = request.getHeader ( "Authorization" );
        System.out.println ( "🔎 [DEBUG] Incoming Authorization Header: " + authHeader );

        if (authHeader == null || !authHeader.startsWith ( "Bearer " )) {
            System.out.println ( "❌ [DEBUG] Missing or invalid Authorization header" );
            response.sendError ( HttpServletResponse.SC_FORBIDDEN , "Authorization Header Missing/Invalid" );
            return;
        }

        try {
            String token = authHeader.substring ( 7 );
            System.out.println ( "🔎 [DEBUG] Extracted JWT: " + token );

            // Split token to get header, payload, signature
            String[] chunks = token.split ( "\\." );
            String headerJson = new String ( Base64.getUrlDecoder ( ).decode ( chunks[0] ) );
            String payloadJson = new String ( Base64.getUrlDecoder ( ).decode ( chunks[1] ) );

            System.out.println ( "🔎 [DEBUG] JWT Header: " + headerJson );
            System.out.println ( "🔎 [DEBUG] JWT Payload: " + payloadJson );

            ObjectMapper mapper = new ObjectMapper ( );
            JsonNode headerNode = mapper.readTree ( headerJson );
            String kid = headerNode.get ( "kid" ).asText ( );
            System.out.println ( "🔎 [DEBUG] Key ID (kid): " + kid );

            // Get the public key
            PublicKey publicKey = jwksProvider.getPublicKey ( kid );
            System.out.println ( "🔎 [DEBUG] Loaded Public Key: " + publicKey );

            // Verify the token
            Claims claims = Jwts.parserBuilder ( )
                    .setSigningKey ( publicKey )
                    .setAllowedClockSkewSeconds ( 60 )
                    .requireIssuer ( clerkIssuer )
                    .build ( )
                    .parseClaimsJws ( token )
                    .getBody ( );

            System.out.println ( "✅ [DEBUG] JWT Successfully Verified!" );
            System.out.println ( "🔎 [DEBUG] Claims: " + claims );

            String clerkUserid = claims.getSubject ( );
            System.out.println ( "🔎 [DEBUG] Clerk User ID (sub): " + clerkUserid );

            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken (
                    clerkUserid , null , Collections.singletonList ( new SimpleGrantedAuthority ( "ROLE_ADMIN" ) )
            );

            SecurityContextHolder.getContext ( ).setAuthentication ( authenticationToken );
            filterChain.doFilter ( request , response );

        } catch (Exception ex) {
            System.out.println ( "❌ [DEBUG] JWT Validation Failed: " + ex.getMessage ( ) );
            ex.printStackTrace ( );
            response.sendError ( HttpServletResponse.SC_FORBIDDEN , "Invalid JWT Token" );
        }
    }
}
