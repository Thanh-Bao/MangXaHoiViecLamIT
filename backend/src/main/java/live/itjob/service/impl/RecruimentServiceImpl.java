package live.itjob.service.impl;

import live.itjob.DTO.recruitment.RecruitmentDTO;
import live.itjob.DTO.recruitment.RecruitmentReadingDTO;
import live.itjob.DTO.user.UserDTO;
import live.itjob.entity.*;
import live.itjob.repository.FrameWorkRepo;
import live.itjob.repository.LanguageRepo;
import live.itjob.repository.ProgramingLanguageRepo;
import live.itjob.repository.RecruitmentRepo;
import live.itjob.service.RecruitmentService;
import live.itjob.service.UserService;
import live.itjob.utility.DataMapperUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class RecruimentServiceImpl implements RecruitmentService {
    private final RecruitmentRepo recruitmentRepo;
    private final DataMapperUtils dataMapperUtils;
    private final UserService userService;
    private final LanguageRepo languageRepo;
    private final ProgramingLanguageRepo programingLanguageRepo;
    private final FrameWorkRepo frameWorkRepo;


    @Override
    public RecruitmentDTO saveRecruitment(RecruitmentDTO recruitment) {
        RecruitmentPostEntity recruitmentPostEntity;
        if (recruitment.getIdPost() == null) {
            recruitmentPostEntity = //
                    dataMapperUtils.map(recruitment, RecruitmentPostEntity.class);
        } else {
            recruitmentPostEntity = recruitmentRepo.getById(recruitment.getIdPost());
        }
        if (recruitmentPostEntity == null) return null;
        //map
        UserEntity user = userService.getUser(userService.getUsername());
        List<LanguageEntity> languageEntity = languageRepo.findAllByTitleIn(recruitment.getLanguageEntity()//
                .stream().map(value -> value.getTitle()).collect(Collectors.toList()));
        List<ProgramingLanguageEntity> proLanguageEntities = programingLanguageRepo.findAllByTitleIn(recruitment.getProgramingLanguageEntity()//
                .stream().map(value -> value.getTitle()).collect(Collectors.toList()));
        List<FrameworkEntity> frameworkEntities = frameWorkRepo.findAllByTitleIn(recruitment.getFrameworkEntities()//
                .stream().map(value -> value.getTitle()).collect(Collectors.toList()));

        recruitmentPostEntity.setFrameworkEntities(frameworkEntities);
        recruitmentPostEntity.setLanguageEntity(languageEntity);
        recruitmentPostEntity.setProgramingLanguageEntity(proLanguageEntities);
        recruitmentPostEntity.setUser(user);
        recruitmentPostEntity.setTitle(recruitment.getTitle());
        recruitmentPostEntity.setExperience(recruitment.getExperience());
        recruitmentPostEntity.setDescription(recruitment.getDescription());

        recruitmentPostEntity = recruitmentRepo.save(recruitmentPostEntity);
        recruitment = dataMapperUtils.map(recruitmentRepo.save(recruitmentPostEntity), RecruitmentDTO.class);
        recruitment.setIdPost(recruitmentPostEntity.getId());
        return recruitment;
    }

    @Override
    public RecruitmentDTO deleteRecruitment(RecruitmentDTO recruitment) {
        RecruitmentPostEntity recruitmentPostEntity = recruitmentRepo.getById(recruitment.getIdPost());
        recruitmentRepo.delete(recruitmentPostEntity);
        return recruitment;
    }


    @Override
    public List<RecruitmentReadingDTO> getAllRecruitment() {
        return dataMapperUtils.mapAll(recruitmentRepo.findAll(), RecruitmentReadingDTO.class);
    }

    @Override
    public List<RecruitmentReadingDTO> getRecruitmentByUser(String userName) {
        UserEntity user = userService.getUser(userName);

        return dataMapperUtils.mapAll(recruitmentRepo.findAllByUser(user), RecruitmentReadingDTO.class);
    }
}
