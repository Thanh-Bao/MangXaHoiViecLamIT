package live.itjob.repository;

import live.itjob.entity.CVEntity;
import live.itjob.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CVRepo extends JpaRepository<CVEntity,Integer> {
    public CVEntity getByUser (UserEntity user);
}
