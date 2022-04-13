package tech.thuexe.repository;
import tech.thuexe.entity.RoleEntity;
import tech.thuexe.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Set;

public interface UserRepo extends JpaRepository<UserEntity,Integer> {
    UserEntity findByUsername(String username);
    boolean existsByUsername(String username);
    List<UserEntity> findAllByRolesIn(Set<RoleEntity> roles);
}
