package live.itjob.repository;
import live.itjob.entity.PostEntity;
import live.itjob.entity.RoleEntity;
import live.itjob.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Set;

public interface UserRepo extends JpaRepository<UserEntity,Integer> {
    UserEntity findByUsername(String username);
    boolean existsByUsername(String username);

    List<UserEntity> findAllByRolesIn(Set<RoleEntity> roles);
}
