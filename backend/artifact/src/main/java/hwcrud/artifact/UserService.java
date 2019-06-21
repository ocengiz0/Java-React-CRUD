package hwcrud.artifact;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

@Service
public class UserService {

	private static List<User> UserList = new ArrayList<>();

	public Result findAll() {
		return new Result(true, null, UserList);
	}

	public Result add(User data) {
		for (User user : UserList) {
			if (user.getFullName().equals(data.getFullName())) {
				return new Result(false, "User name and surname must be unique", null);
			}
			if (user.getEmail().equals(data.getEmail())) {
				return new Result(false, "User email must be unique", null);
			}
		}
		if (!data.isValidEmail()) {
			return new Result(false, "User email is not valid", null);
		}

		if(data.getId() == null) {
			data.setId(UUID.randomUUID());
		}
		
		UserList.add(data);
		return new Result(true, null, data);
	}

	public Result update(UUID id, User data) {
		Result deleteResult = delete(id);

		if (!deleteResult.isSuccess())
			return deleteResult;

		data.setId(id);
		return add(data);
	}

	public Result delete(UUID id) {
		Result userResult = get(id);

		if (!userResult.isSuccess())
			return new Result(false, "User not found", null);

		User user = (User) userResult.getData();
		if (UserList.remove(user)) {
			return new Result(true, null, user);
		}

		return new Result(false, "Delete operation failed", null);
	}

	public Result get(UUID id) {
		for (User user : UserList) {
			if (user.getId().equals(id)) {
				return new Result(true, null, user);
			}
		}
		return new Result(false, null, null);

	}
}
