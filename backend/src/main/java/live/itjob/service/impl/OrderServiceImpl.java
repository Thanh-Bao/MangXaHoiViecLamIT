package live.itjob.service.impl;

import live.itjob.entity.OrderEntity;
import live.itjob.entity.PostEntity;
import live.itjob.entity.UserEntity;
import live.itjob.service.OrderService;
import live.itjob.service.PostService;
import live.itjob.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import live.itjob.repository.OrderRepo;

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
