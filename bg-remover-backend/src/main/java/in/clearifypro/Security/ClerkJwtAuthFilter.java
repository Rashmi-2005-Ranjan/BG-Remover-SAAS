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
        String authHeader = request.getHeader ( "Authorization" );
        if (authHeader == null || !authHeader.startsWith ( "Bearer " )) {
            response.sendError ( HttpServletResponse.SC_FORBIDDEN , "Authorization Header Missing/Invalid" );
            return;
        }
        try {
            String token = authHeader.substring ( 7 );

            //Extract Key Id From Token Header
            // Split The Token Into 3 Parts i.e header.payload.signature
            String[] chunks = token.split ( "\\." );
            //chunks[0] --> Header , chunks[1] --> payload , chunks[2] ---> signature

            //Decoding the header for getting the key id
            String headerJson = new String ( Base64.getUrlDecoder ( ).decode ( chunks[0] ) );
            ObjectMapper mapper = new ObjectMapper ( );
            JsonNode headerNode = mapper.readTree ( headerJson );
            String kid = headerNode.get ( "kid" ).asText ( );

            //Get The correct Public Key
            PublicKey publicKey = jwksProvider.getPublicKey ( kid );

            //Verify The Token
            Claims claims = Jwts.parserBuilder ( )
                    .setSigningKey ( publicKey )
                    .setAllowedClockSkewSeconds ( 60 )
                    .requireIssuer ( clerkIssuer )
                    .build ( )
                    .parseClaimsJws ( token )
                    .getBody ( );

            String clerkUserid = claims.getSubject ( );

            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken (
                    clerkUserid , null , Collections.singletonList (
                    new SimpleGrantedAuthority ( "ROLE_ADMIN" )
            ) );

            SecurityContextHolder.getContext ( ).setAuthentication ( authenticationToken );
            filterChain.doFilter ( request , response );
        } catch (Exception ex) {
            response.sendError ( HttpServletResponse.SC_FORBIDDEN , "Invalid JWT Token" );
        }
    }
}
