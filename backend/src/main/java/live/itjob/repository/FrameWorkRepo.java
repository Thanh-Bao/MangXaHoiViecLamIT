package live.itjob.repository;

import live.itjob.entity.FrameworkEntity;
import live.itjob.entity.LanguageEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FrameWorkRepo extends JpaRepository<FrameworkEntity,Integer> {
    List<FrameworkEntity> findAllByTitleIn(List<String> id);
}
