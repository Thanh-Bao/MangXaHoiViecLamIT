package live.itjob.repository;

import live.itjob.entity.SubmitCVEntity;
import live.itjob.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepo extends JpaRepository<SubmitCVEntity, Integer> {
    List<SubmitCVEntity> findAllByUser(UserEntity user);
}
