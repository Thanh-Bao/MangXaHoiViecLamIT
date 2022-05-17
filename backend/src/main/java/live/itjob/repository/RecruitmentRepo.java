package live.itjob.repository;

import live.itjob.entity.RecruitmentPostEntity;
import live.itjob.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecruitmentRepo extends JpaRepository<RecruitmentPostEntity, Integer> {
    List<RecruitmentPostEntity> findAllByUser(UserEntity id);

    List<RecruitmentPostEntity> findAllByType(boolean type);

    List<RecruitmentPostEntity> findAll();

}
