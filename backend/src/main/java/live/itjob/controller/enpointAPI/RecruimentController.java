package live.itjob.controller.enpointAPI;

import live.itjob.DTO.recruitment.RecruitmentDTO;
import live.itjob.DTO.recruitment.RecruitmentReadingDTO;
import live.itjob.DTO.user.UserDTO;
import live.itjob.entity.UserEntity;
import live.itjob.service.RecruitmentService;
import live.itjob.service.UserService;
import live.itjob.utility.Config;
import live.itjob.utility.CustomException;
import live.itjob.utility.DataMapperUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "${APIVersion}/recruitment")
@Validated
public class RecruimentController {
    private final RecruitmentService recruitmentService;
    private final DataMapperUtils dataMapperUtils;
    private final UserService userService;

    @GetMapping("/all")
    public ResponseEntity<List<RecruitmentReadingDTO>> getAllRecruitment() throws CustomException {

        return ResponseEntity.ok().body(recruitmentService.getAllRecruitment());
    }

    @GetMapping("/all/{username}")
    public ResponseEntity<List<RecruitmentReadingDTO>> getRecruitmentByUser(@PathVariable String username) throws CustomException {

        return ResponseEntity.ok().body(recruitmentService.getRecruitmentByUser(username));
    }

    @PostMapping("/save")
    public ResponseEntity<RecruitmentDTO> addRecruitment(@Valid @RequestBody RecruitmentDTO recruitmentDTO) throws CustomException {
        return ResponseEntity.ok().body(recruitmentService.saveRecruitment(recruitmentDTO));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<RecruitmentDTO> deleteRecruitment(@Valid @RequestBody RecruitmentDTO recruitmentDTO) throws CustomException {
        return ResponseEntity.ok().body(recruitmentService.deleteRecruitment(recruitmentDTO));
    }

}
