package hwcrud.artifact;

import java.util.UUID;
import org.junit.Test;
import java.util.Map;
import static org.junit.Assert.*;


public class Tests {
	User user = new User(UUID.randomUUID(), "First Name", "Last Name", null, null, null);
	@Test
	public void TestValidEmail() {
		 /*Arrange*/
		user.setEmail("test@test.com");
        /*Act*/
        boolean result = user.isValidEmail();
        /*Assert*/
        assertTrue(result);
	}
	
	@Test
	public void TestInValidEmail() {
		 /*Arrange*/
		user.setEmail("test_test_com");
        /*Act*/
        boolean result = user.isValidEmail();
        /*Assert*/
        assertFalse(result);
	}

}
