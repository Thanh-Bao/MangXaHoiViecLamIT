package live.itjob.service.impl;

import live.itjob.DTO.user.UserDTO;
import live.itjob.entity.RoleEntity;
import live.itjob.entity.UserEntity;
import live.itjob.service.UserService;
import live.itjob.utility.Config;
import live.itjob.utility.DataMapperUtils;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import live.itjob.repository.RoleRepo;
import live.itjob.repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;


@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService, UserDetailsService {

    private final UserRepo userRepo;
    private final RoleRepo roleRepo;
    private final PasswordEncoder passwordEncoder;
    private final DataMapperUtils dataMapperUtils;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity user  = userRepo.findByUsername(username);
        if (user==null){
            throw new UsernameNotFoundException("UserEntity not found in the database");
        }
        Collection<SimpleGrantedAuthority> authrities = new ArrayList<>();
        user.getRoles().forEach(role -> {
            authrities.add(new SimpleGrantedAuthority(role.getName()));
        });
        return new org.springframework.security.core.userdetails.User(user.getUsername(),user.getPassword(),authrities);
    }

    @Override
    public boolean exists(String username) {
        return userRepo.existsByUsername(username);
    }

    @Override
    public UserDTO saveUser(UserEntity user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setActive(true);
        UserEntity userResult = userRepo.save(dataMapperUtils.map(user,UserEntity.class));
        return dataMapperUtils.map(userResult,UserDTO.class);
    }

    @Override
    public RoleEntity saveRole(RoleEntity role) {
        return roleRepo.save(role);
    }

    @Override
    public void addRoleToUser(String username, String roleName) {
        UserEntity userEntity =  userRepo.findByUsername(username);
        RoleEntity roleEntity = roleRepo.findByName(roleName);
        userEntity.getRoles().add(roleEntity);
    }

    @Override
    public UserEntity getUser(String username) {
        return userRepo.findByUsername(username);
    }

    @Override
    public List<UserDTO> getUsers() {
        Set<RoleEntity> roles = new HashSet();
        RoleEntity roleEntity = roleRepo.findByName(Config.ROLE.USER.getValue());
        roles.add(roleEntity);
        List<UserEntity> users = userRepo.findAllByRolesIn(roles);
        return dataMapperUtils.mapAll(users,UserDTO.class);
    }

    @Override
    public String getUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            return null;
        }
        return  authentication.getName();
    }

}
