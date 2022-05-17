package live.itjob.service;

import live.itjob.DTO.recruitment.RecruitmentDTO;
import live.itjob.DTO.recruitment.RecruitmentReadingDTO;
import live.itjob.DTO.user.UserDTO;
import live.itjob.entity.RoleEntity;
import live.itjob.entity.UserEntity;

import java.util.List;

public interface RecruitmentService {
    RecruitmentDTO saveRecruitment(RecruitmentDTO recruitment);
    RecruitmentDTO deleteRecruitment(RecruitmentDTO recruitment);
    List<RecruitmentReadingDTO> getAllRecruitment();
    List<RecruitmentReadingDTO> getRecruitmentByUser(String userName);
}
