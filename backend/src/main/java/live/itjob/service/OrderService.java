package live.itjob.service;

import live.itjob.entity.OrderEntity;

import java.util.List;

public interface OrderService {
    OrderEntity save(OrderEntity orderEntity, int postId);

    List<OrderEntity> findAllByUser();
}
