package tech.thuexe.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tech.thuexe.entity.OrderEntity;
import tech.thuexe.entity.PostEntity;
import tech.thuexe.entity.UserEntity;
import tech.thuexe.repository.OrderRepo;
import tech.thuexe.service.OrderService;
import tech.thuexe.service.PostService;
import tech.thuexe.service.UserService;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final UserService userService;
    private final PostService postService;
    private final OrderRepo orderRepo;

    @Override
    public OrderEntity save(OrderEntity orderEntity, int postId) {
        PostEntity postEntity = postService.findById(postId);
        UserEntity user = userService.getUser(userService.getUsername());
        orderEntity.setUser(user);
        orderEntity.setPost(postEntity);
        return orderRepo.save(orderEntity);
    }

    @Override
    public List<OrderEntity> findAllByUser() {
        UserEntity user = userService.getUser(userService.getUsername());
        return orderRepo.findAllByUser(user);
    }
}
