package in.clearifypro.Service;

import in.clearifypro.DTO.UserDTO;

public interface UserService {
    UserDTO saveUser(UserDTO userDTO);
    UserDTO getUserByClerkId(String clerkId);
    void deleteUserByClerkId(String clerkId);
}
