package com.openclassrooms.starterjwt;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

@SpringBootTest
public class SpringBootSecurityJwtApplicationTests {

	@Test
	@DisplayName("test that the context is loaded.")
	public void contextLoads() {
	}

	@Test
	@DisplayName("test that the application will be launched without error.")
	public void testMain() {
		assertDoesNotThrow(() -> SpringBootSecurityJwtApplication.main(new String[] {}));
	}

}
