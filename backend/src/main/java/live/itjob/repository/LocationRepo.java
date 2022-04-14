package live.itjob.repository;

import live.itjob.entity.LocationEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocationRepo extends JpaRepository<LocationEntity, Integer> {
}
