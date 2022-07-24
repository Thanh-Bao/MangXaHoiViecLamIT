package live.itjob.service.impl;

import live.itjob.DTO.CV.CVReadDTO;
import live.itjob.DTO.CV.CVWriteDTO;
import live.itjob.entity.CVEntity;
import live.itjob.entity.UserEntity;
import live.itjob.repository.CVRepo;
import live.itjob.service.CVService;
import live.itjob.service.UserService;
import live.itjob.utility.FileHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
@Service
@Transactional
@RequiredArgsConstructor
public class CVImpl implements CVService {
    private final CVRepo cvRepo ;
    private final UserService userService;
    private final FileHandler fileHandler;

    @Override
    public void save(CVWriteDTO cv) throws Exception {
       cvRepo.save(tranTo(cv));
    }

    @Override
    public List<CVReadDTO> getAll() {
        List<CVReadDTO> list = new ArrayList<>();
        for(CVEntity cv :cvRepo.findAll())
            list.add(CVReadDTO.tranTo(cv));
        return list;
    }

    @Override
    public CVReadDTO getByUser(UserEntity user) {
        return CVReadDTO.tranTo(cvRepo.getByUser(user));
    }

    @Override
    public void delete(int id) {
        cvRepo.deleteById(id);
    }

    public CVEntity tranTo(CVWriteDTO cv) throws Exception {
       return new CVEntity(cv.getTitle(),cv.getSkill(),cv.getEducation(),fileHandler.storeFile(cv.getLink()),
               userService.getUser(cv.getUsername()) );
    }
}
