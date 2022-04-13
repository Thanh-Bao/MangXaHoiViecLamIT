package tech.thuexe;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import tech.thuexe.entity.RoleEntity;
import tech.thuexe.entity.UserEntity;
import tech.thuexe.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import tech.thuexe.utility.Config;

import java.util.HashSet;
import java.util.concurrent.TimeUnit;

@SpringBootApplication
public class Application implements WebMvcConfigurer {
	@Value("${FilePath}")
	private String imagePath;

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/static/**").addResourceLocations("/WEB-INF/static/")
				.setCacheControl(CacheControl.maxAge(2, TimeUnit.HOURS).cachePublic());
		registry.addResourceHandler("/images/**").addResourceLocations("file:" + System.getProperty("user.home") + imagePath);
	}

	@Bean
	BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public ModelMapper modelMapper(){
		return new ModelMapper();
	}

	@Bean
	public  ObjectMapper objectMapper() {return  new ObjectMapper();}

	@Bean
	CommandLineRunner run(UserService userService){
		return args -> {
		userService.saveRole(new RoleEntity( Config.ROLE.USER.getValue()));
		userService.saveRole(new RoleEntity( Config.ROLE.ADMIN.getValue()));

		userService.saveUser(new UserEntity("fds sdf fsd ", "baobao","0988766765" ,"1234", true,new HashSet<>()));
		//userService.addRoleToUser("john", Config.ROLE.USER.getValue());
		userService.addRoleToUser("baobao", Config.ROLE.ADMIN.getValue());

		userService.saveUser(new UserEntity("sdf dsfsd sdf", "john", "8767898789","1234",true, new HashSet<>()));
		userService.addRoleToUser("john", Config.ROLE.USER.getValue());
		};
	}
}
