package tech.thuexe.service;

import tech.thuexe.entity.OrderEntity;

import java.util.List;

public interface OrderService {
    OrderEntity save(OrderEntity orderEntity, int postId);

    List<OrderEntity> findAllByUser();
}
