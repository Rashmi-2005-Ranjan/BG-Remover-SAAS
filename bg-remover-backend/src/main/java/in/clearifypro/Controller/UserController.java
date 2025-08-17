package in.clearifypro.Controller;

import in.clearifypro.DTO.UserDTO;
import in.clearifypro.Response.RemoveBgResponse;
import in.clearifypro.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping
    public ResponseEntity<?> createOrUpdateUser(@RequestBody UserDTO userDTO , Authentication authentication) {
        RemoveBgResponse response = null;
        try {
            if (!authentication.getName ( ).equals ( userDTO.getClerkId ( ) )) {
                response = RemoveBgResponse.builder ( )
                        .success ( false )
                        .data ( "User Does Not Have Permission To Access The Resource" )
                        .statusCode ( HttpStatus.FORBIDDEN )
                        .build ( );
                return ResponseEntity.status ( HttpStatus.FORBIDDEN ).body ( response );
            }
            UserDTO user = userService.saveUser ( userDTO );
            response = RemoveBgResponse.builder ( )
                    .success ( true )
                    .statusCode ( HttpStatus.OK )
                    .data ( user )
                    .build ( );
            return ResponseEntity.status ( HttpStatus.OK ).body ( response );
        } catch (Exception e) {
            response = RemoveBgResponse.builder ( )
                    .success ( false )
                    .statusCode ( HttpStatus.INTERNAL_SERVER_ERROR )
                    .data ( e.getMessage ( ) )
                    .build ( );
            return ResponseEntity.status ( HttpStatus.INTERNAL_SERVER_ERROR ).body ( response );
        }
    }
}
