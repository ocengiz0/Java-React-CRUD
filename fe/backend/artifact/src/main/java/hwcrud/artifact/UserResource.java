package hwcrud.artifact;

import java.net.URI;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@CrossOrigin(origins = { "http://localhost:3000" })
@RestController
public class UserResource {

	@Autowired
	private UserService UserManagementService;

	@GetMapping("/users")
	public Result getAllUsers() {
		return UserManagementService.findAll();
	}

	@GetMapping("/users/{id}")
	public Result getUser(@PathVariable UUID id) {
		return UserManagementService.get(id);
	}

	@DeleteMapping("/users/{id}")
	public Result deleteUser(@PathVariable UUID id) {
		return UserManagementService.delete(id);
	}

	@PutMapping("/users/{id}")
	public Result updateUser(@PathVariable UUID id, @RequestBody User user) {
		return UserManagementService.update(id, user);
	}

	@PostMapping("/users")
	public Result createUser(@RequestBody User User) {
		return UserManagementService.add(User);
	}

}
