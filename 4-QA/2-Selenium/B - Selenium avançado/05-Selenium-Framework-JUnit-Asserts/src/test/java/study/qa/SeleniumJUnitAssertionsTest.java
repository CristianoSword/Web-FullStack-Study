package study.qa;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;

public class SeleniumJUnitAssertionsTest extends BaseSeleniumTest {

    @Test
    void validatesHeadingAndButtonLabel() {
        driver.get(toFileUrl("fixtures/index.html"));

        String heading = driver.findElement(By.id("title")).getText();
        String buttonLabel = driver.findElement(By.id("action-button")).getText();

        Assertions.assertEquals("Selenium with JUnit", heading);
        Assertions.assertEquals("Run audit", buttonLabel);
    }
}
