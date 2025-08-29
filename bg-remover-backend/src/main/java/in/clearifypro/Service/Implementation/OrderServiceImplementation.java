package in.clearifypro.Service.Implementation;

import com.razorpay.Order;
import com.razorpay.RazorpayException;
import in.clearifypro.Entity.OrderEntity;
import in.clearifypro.Repository.OrderRepository;
import in.clearifypro.Service.OrderService;
import in.clearifypro.Service.RazorpayService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class OrderServiceImplementation implements OrderService {
    private final RazorpayService razorpayService;
    private final OrderRepository orderRepository;

    private static final Map<String, PlanDetails> PLAN_DETAILS = Map.of (
            "Basic" , new PlanDetails ( "Basic" , 300 , 499.00 ) ,
            "Premium" , new PlanDetails ( "Premium" , 800 , 899.00 ) ,
            "Ultimate" , new PlanDetails ( "Ultimate" , 1500 , 1499.00 )
    );

    private record PlanDetails(String name , int credits , double amount) {
    }

    @Override
    public Order createOrder(String planId , String clerkId) throws RazorpayException {
        PlanDetails details = PLAN_DETAILS.get ( planId );
        if (details == null) {
            throw new IllegalArgumentException ( "Invalid plan ID" + planId );
        }
        try {
            Order order = razorpayService.createOrder ( details.amount ( ) , "INR" );
            OrderEntity newOrder = OrderEntity.builder ( )
                    .clerkId ( clerkId )
                    .plan ( details.name ( ) )
                    .credits ( details.credits ( ) )
                    .amount ( details.amount ( ) )
                    .orderId ( order.get ( "id" ) )
                    .build ( );
            orderRepository.save ( newOrder );
            return order;
        } catch (RazorpayException e) {
            throw new RazorpayException ( "Razorpay Error: " + e.getMessage ( ) );
        }
    }
}
