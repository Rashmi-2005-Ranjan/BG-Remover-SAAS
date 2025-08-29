package in.clearifypro.Controller;

import com.razorpay.Order;
import com.razorpay.RazorpayException;
import in.clearifypro.DTO.RazorpayOrderDto;
import in.clearifypro.Response.RemoveBgResponse;
import in.clearifypro.Service.OrderService;
import in.clearifypro.Service.RazorpayService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;
    private final RazorpayService razorpayService;

    @PostMapping
    public ResponseEntity<?> createOrder(@RequestParam String planId , Authentication authentication) throws RazorpayException {
        Map<String, Object> responseMap = new HashMap<> ( );
        RemoveBgResponse response = null;
        //Validation
        if (authentication.getName ( ).isEmpty ( ) || authentication.getName ( ) == null) {
            response = RemoveBgResponse.builder ( )
                    .statusCode ( HttpStatus.FORBIDDEN )
                    .success ( false )
                    .data ( "User Doesn't Have Permission To Access This Resource" )
                    .build ( );
            return ResponseEntity.status ( HttpStatus.FORBIDDEN ).body ( response );
        }
        try {
            Order order = orderService.createOrder ( planId , authentication.getName ( ) );
            RazorpayOrderDto responseDto = convertToDto ( order );
            response = RemoveBgResponse.builder ( )
                    .success ( true )
                    .data ( responseDto )
                    .statusCode ( HttpStatus.CREATED )
                    .build ( );
            return ResponseEntity.ok ( response );
        } catch (Exception e) {
            response = RemoveBgResponse.builder ( )
                    .success ( false )
                    .data ( "Error Creating Order: " + e.getMessage ( ) )
                    .statusCode ( HttpStatus.INTERNAL_SERVER_ERROR )
                    .build ( );
            return ResponseEntity.status ( HttpStatus.INTERNAL_SERVER_ERROR ).body ( response );
        }
    }

    private RazorpayOrderDto convertToDto(Order order) {
        return RazorpayOrderDto.builder ( )
                .id ( order.get ( "id" ) )
                .entity ( order.get ( "entity" ) )
                .amount ( order.get ( "amount" ) )
                .currency ( order.get ( "currency" ) )
                .receipt ( order.get ( "receipt" ) )
                .status ( order.get ( "status" ) )
                .created_at ( order.get ( "created_at" ) )
                .build ( );
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyOrder(@RequestBody Map<String, Object> request) throws RazorpayException {
        try {
            String razorpayOrderId = request.get ( "razorpay_order_id" )
                    .toString ( );
            Map<String, Object> returnValue = razorpayService.verifyPayment ( razorpayOrderId );
            return ResponseEntity.ok ( returnValue );
        } catch (RazorpayException e) {
            Map<String, Object> errorResponse = new HashMap<> ( );
            errorResponse.put ( "success" , false );
            errorResponse.put ( "message" , "Error Verifying Payment: " + e.getMessage ( ) );
            return ResponseEntity.status ( HttpStatus.INTERNAL_SERVER_ERROR ).body ( errorResponse );
        }
    }
}
