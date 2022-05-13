package live.itjob.service;

import live.itjob.entity.SubmitCVEntity;

import java.util.List;

public interface OrderService {
    SubmitCVEntity save(SubmitCVEntity orderEntity, int postId);

    List<SubmitCVEntity> findAllByUser();
}
