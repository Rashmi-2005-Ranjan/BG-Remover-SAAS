package in.clearifypro.Repository;

import in.clearifypro.Entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity,Long> {
    Optional<UserEntity> findByClerkId(String clerkId);

    Boolean existsByClerkId(String clerkId);
}
