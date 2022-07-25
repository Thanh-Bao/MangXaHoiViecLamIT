package live.itjob.service;

import live.itjob.DTO.CV.CVReadDTO;
import live.itjob.DTO.CV.CVWriteDTO;
import live.itjob.entity.CVEntity;
import live.itjob.entity.UserEntity;
import org.springframework.stereotype.Service;

import java.util.List;


public interface CVService {
 public void save (CVWriteDTO cv) throws Exception;
 public List<CVReadDTO> getAll ();
 public CVReadDTO getByUser(UserEntity user);
 public void delete(int id );
}
