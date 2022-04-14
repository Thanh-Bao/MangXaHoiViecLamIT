package live.itjob.repository;

import live.itjob.entity.PostEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepo extends JpaRepository<PostEntity, Integer> {
    List<PostEntity> findAllByOrderByCreatedAtDesc();
}
