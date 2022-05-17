package live.itjob.repository;

import live.itjob.entity.LanguageEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LanguageRepo extends JpaRepository<LanguageEntity,Integer> {
    List<LanguageEntity> findAllByTitleIn(List<String> id);
}
