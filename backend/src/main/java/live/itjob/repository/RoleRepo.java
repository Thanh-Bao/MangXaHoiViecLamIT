package live.itjob.repository;

import live.itjob.entity.RoleEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepo extends JpaRepository<RoleEntity,Integer> {
    RoleEntity findByName(String name);
}
