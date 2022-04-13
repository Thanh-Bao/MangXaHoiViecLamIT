package tech.thuexe.controller.enpointAPI;

import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import tech.thuexe.DTO.user.UserDTO;
import tech.thuexe.entity.UserEntity;
import tech.thuexe.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.thuexe.utility.Config;
import tech.thuexe.utility.CustomException;
import tech.thuexe.utility.DataMapperUtils;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@RestController @RequiredArgsConstructor @RequestMapping(path = "${APIVersion}/user") @Validated
public class UserController {

    private final UserService userService;
    private final DataMapperUtils dataMapperUtils;

    @GetMapping("/exist/{username}")
    public ResponseEntity<Boolean> checkUserExist(@PathVariable String username) {
        return  ResponseEntity.ok().body(userService.exists(username));
    }

    @GetMapping("/{username}")
    public ResponseEntity<UserDTO> getUser(@PathVariable String username) throws CustomException {
        if(!userService.exists(username)){
            throw new CustomException("Username không tồn tại, hãy kiểm tra lại", HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok().body(dataMapperUtils.map(userService.getUser(username), UserDTO.class));
    }

    @GetMapping("/isactive/{username}")
    public ResponseEntity<Boolean> checkUserIsActive(@PathVariable String username) throws CustomException {
        if(!userService.exists(username)){
            throw new CustomException("Username không tồn tại, hãy kiểm tra lại", HttpStatus.BAD_REQUEST);
        }
        boolean isActive = userService.getUser(username).isActive();
        return ResponseEntity.ok().body(isActive);
    }

    @PostMapping("/register")
    public ResponseEntity<UserDTO> saveUser(@Valid @RequestBody UserEntity user) throws CustomException {
        if(userService.exists(user.getUsername())){
            throw new CustomException("Tên tài khoản đã tồn tại trên hệ thống", HttpStatus.BAD_REQUEST);
        }
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path(null).toUriString());
        userService.saveUser(user);
        userService.addRoleToUser(user.getUsername(), Config.ROLE.USER.getValue());
        return ResponseEntity.created(uri).body(dataMapperUtils.map(userService.getUser(user.getUsername()), UserDTO.class));
    }

}


