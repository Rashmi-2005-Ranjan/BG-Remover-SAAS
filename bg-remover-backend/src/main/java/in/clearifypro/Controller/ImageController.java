package in.clearifypro.Controller;

import in.clearifypro.DTO.UserDTO;
import in.clearifypro.Response.RemoveBgResponse;
import in.clearifypro.Service.RemoveBackgroundService;
import in.clearifypro.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/images")
@RequiredArgsConstructor
public class ImageController {
    private final RemoveBackgroundService removeBackgroundService;
    private final UserService userService;


    @PostMapping("/remove-background")
    public ResponseEntity<?> removeBackground(@RequestParam("file") MultipartFile file , Authentication authentication) {
        RemoveBgResponse response = null;
        Map<String, Object> responseMap = new HashMap<> ( );
        try {
            // ==>  : Validation For User Authenticated Or Not
            if (authentication.getName ( ).isEmpty ( ) || authentication.getName ( ) == null) {
                response = RemoveBgResponse.builder ( )
                        .statusCode ( HttpStatus.FORBIDDEN )
                        .success ( false )
                        .data ( "User Doesn't Have Permission To Access This Resource" )
                        .build ( );
                return ResponseEntity.status ( HttpStatus.FORBIDDEN ).body ( response );
            }
            UserDTO userDTO = userService.getUserByClerkId ( authentication.getName ( ) );
            // ==>  : Validation For User Have Required Amount Of Credit Or Not
            if (userDTO.getCredits ( ) == 0) {
                responseMap.put ( "message" , "No Credit Balance" );
                responseMap.put ( "creditBalance" , userDTO.getCredits ( ) );
                response = RemoveBgResponse.builder ( )
                        .success ( false )
                        .data ( responseMap )
                        .statusCode ( HttpStatus.OK )
                        .build ( );
                return ResponseEntity.ok ( response );
            }
            byte[] bytes = removeBackgroundService.removeBackground ( file );
            String base64Image = Base64.getEncoder ( ).encodeToString ( bytes );
            userDTO.setCredits ( userDTO.getCredits ( ) - 1 );
            userService.saveUser ( userDTO );
            return ResponseEntity.ok ( )
                    .contentType ( MediaType.TEXT_PLAIN )
                    .body ( base64Image );
        } catch (Exception e) {
            response = RemoveBgResponse.builder ( )
                    .statusCode ( HttpStatus.INTERNAL_SERVER_ERROR )
                    .success ( false )
                    .data ( "Something Went Wrong" )
                    .build ( );
            return ResponseEntity.status ( HttpStatus.INTERNAL_SERVER_ERROR ).body ( response );
        }
    }
}
