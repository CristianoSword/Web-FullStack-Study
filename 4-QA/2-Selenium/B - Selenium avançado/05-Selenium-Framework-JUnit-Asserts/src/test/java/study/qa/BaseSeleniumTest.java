package study.qa;

import java.nio.file.Path;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public abstract class BaseSeleniumTest {
    protected WebDriver driver;

    @BeforeEach
    void setUp() {
        driver = new ChromeDriver();
    }

    @AfterEach
    void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }

    protected String toFileUrl(String resourceRelativePath) {
        Path resourcePath = Path.of("src", "test", "resources", resourceRelativePath).toAbsolutePath();
        return resourcePath.toUri().toString();
    }
}
