package tech.thuexe.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tech.thuexe.entity.LocationEntity;

public interface LocationRepo extends JpaRepository<LocationEntity, Integer> {
}
