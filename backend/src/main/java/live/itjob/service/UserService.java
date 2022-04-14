package live.itjob.service;

import live.itjob.entity.RoleEntity;
import live.itjob.entity.UserEntity;
import live.itjob.DTO.user.UserDTO;

import java.util.List;

public interface UserService {
    boolean exists(String username);
    UserDTO saveUser(UserEntity user);
    RoleEntity saveRole(RoleEntity role);
    void addRoleToUser(String username, String roleName);
    UserEntity getUser(String username);
    List<UserDTO> getUsers();
    String getUsername();
}
