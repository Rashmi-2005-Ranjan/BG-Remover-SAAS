package in.clearifypro;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class BgRemoverBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run ( BgRemoverBackendApplication.class , args );
    }

}
