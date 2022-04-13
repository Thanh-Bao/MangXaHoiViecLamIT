package tech.thuexe.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tech.thuexe.entity.OrderEntity;
import tech.thuexe.entity.UserEntity;

import java.util.List;

public interface OrderRepo extends JpaRepository<OrderEntity, Integer> {
    List<OrderEntity> findAllByUser(UserEntity user);
}
