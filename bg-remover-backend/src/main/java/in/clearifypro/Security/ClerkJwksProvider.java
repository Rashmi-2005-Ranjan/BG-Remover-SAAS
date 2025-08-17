package in.clearifypro.Security;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.math.BigInteger;
import java.net.URL;
import java.security.KeyFactory;
import java.security.PublicKey;
import java.security.spec.RSAPublicKeySpec;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@Component
public class ClerkJwksProvider {
    @Value("${clerk.jwks-url}")
    private String jwksUrl;

    private final Map<String, PublicKey> keyCache = new HashMap<> ( );
    private long lastFetchedTime = 0;
    private static final long CACHE_EXPIRATION_TIME = 3600000; // 1 hour in milliseconds

    public PublicKey getPublicKey(String kid) throws Exception {
        if (keyCache.containsKey ( kid ) && System.currentTimeMillis ( ) - lastFetchedTime < CACHE_EXPIRATION_TIME) {
            return keyCache.get ( kid );
        } else {
            refreshKeys ( );
            return keyCache.get ( kid );
        }
    }

    private void refreshKeys() throws Exception {
        ObjectMapper mapper = new ObjectMapper ( );
        JsonNode jwks = mapper.readTree ( new URL ( jwksUrl ) );
        JsonNode keys = jwks.get ( "keys" );
        for (JsonNode keyNode : keys) {
            String kid = keyNode.get ( "kid" ).asText ( );
            String kty = keyNode.get ( "kty" ).asText ( );
            String alg = keyNode.get ( "alg" ).asText ( );
            if ("RSA".equals ( kty ) && "RSA256".equals ( alg )) {
                String modulus = keyNode.get ( "n" ).asText ( );
                String exponent = keyNode.get ( "e" ).asText ( );
                PublicKey publicKey = createPublicKey ( modulus , exponent );
                keyCache.put ( kid , publicKey );
            }
        }
        lastFetchedTime = System.currentTimeMillis ( );
    }

    private PublicKey createPublicKey(String modulus , String exponent) throws Exception {
        byte[] modulusBytes = Base64.getUrlDecoder ( ).decode ( modulus );
        byte[] exponentBytes = Base64.getUrlDecoder ( ).decode ( exponent );
        BigInteger modulusBigInt = new BigInteger ( 1 , modulusBytes );
        BigInteger exponentBigInt = new BigInteger ( 1 , exponentBytes );
        RSAPublicKeySpec spec = new RSAPublicKeySpec ( modulusBigInt , exponentBigInt );
        KeyFactory factory = KeyFactory.getInstance ( "RSA" );
        return factory.generatePublic ( spec );
    }
}
