package live.itjob.repository;

import live.itjob.entity.OrderEntity;
import live.itjob.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepo extends JpaRepository<OrderEntity, Integer> {
    List<OrderEntity> findAllByUser(UserEntity user);
}
