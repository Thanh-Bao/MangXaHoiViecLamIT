package live.itjob.repository;

import live.itjob.entity.FrameworkEntity;
import live.itjob.entity.ProgramingLanguageEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProgramingLanguageRepo extends JpaRepository<ProgramingLanguageEntity,Integer> {
    ProgramingLanguageEntity findByTitle(String title);
    List<ProgramingLanguageEntity> findAllByTitleIn(List<String> id);
}
