package in.clearifypro.Service.Implementation;

import in.clearifypro.DTO.UserDTO;
import in.clearifypro.Entity.UserEntity;
import in.clearifypro.Repository.UserRepository;
import in.clearifypro.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImplementation implements UserService {
    private final UserRepository userRepository;

    @Override
    public UserDTO saveUser(UserDTO userDTO) {
        Optional<UserEntity> optionalUser = userRepository.findByClerkId ( userDTO.getClerkId ( ) );
        if (optionalUser.isPresent ( )) {
            UserEntity existingUser = optionalUser.get ( );
            existingUser.setEmail ( userDTO.getEmail ( ) );
            existingUser.setFirstName ( userDTO.getFirstName ( ) );
            existingUser.setLastName ( userDTO.getLastName ( ) );
            existingUser.setPhotoUrl ( userDTO.getPhotoUrl ( ) );
            if (userDTO.getCredits ( ) != null) {
                existingUser.setCredits ( userDTO.getCredits ( ) );
            }
            existingUser = userRepository.save ( existingUser );
            return mapToDto ( existingUser );
        }
        UserEntity newUser = mapToEntity ( userDTO );
        userRepository.save ( newUser );
        return mapToDto ( newUser );
    }

    @Override
    public UserDTO getUserByClerkId(String clerkId) {
        UserEntity userEntity = userRepository.findByClerkId ( clerkId )
                .orElseThrow ( () -> new UsernameNotFoundException ( "User Not Found" ) );
        return mapToDto ( userEntity );
    }

    @Override
    public void deleteUserByClerkId(String clerkId) {
        UserEntity userEntity = userRepository.findByClerkId ( clerkId )
                .orElseThrow ( () -> new UsernameNotFoundException ( "User Not Found" ) );
        userRepository.delete ( userEntity );
    }

    private UserDTO mapToDto(UserEntity newUser) {
        return UserDTO.builder ( )
                .clerkId ( newUser.getClerkId ( ) )
                .email ( newUser.getEmail ( ) )
                .firstName ( newUser.getFirstName ( ) )
                .lastName ( newUser.getLastName ( ) )
                .credits ( newUser.getCredits ( ) )
                .build ( );
    }

    private UserEntity mapToEntity(UserDTO userDTO) {
        return UserEntity.builder ( )
                .clerkId ( userDTO.getClerkId ( ) )
                .email ( userDTO.getEmail ( ) )
                .firstName ( userDTO.getFirstName ( ) )
                .lastName ( userDTO.getLastName ( ) )
                .photoUrl ( userDTO.getPhotoUrl ( ) )
                .build ( );
    }
}
