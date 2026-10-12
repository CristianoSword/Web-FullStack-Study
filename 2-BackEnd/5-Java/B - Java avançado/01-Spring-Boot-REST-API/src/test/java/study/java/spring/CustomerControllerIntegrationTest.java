package study.java.spring;

import static org.hamcrest.Matchers.greaterThanOrEqualTo;
import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
class CustomerControllerIntegrationTest {

  @Autowired
  private MockMvc mockMvc;

  @Test
  void shouldListSeededCustomers() throws Exception {
    mockMvc.perform(get("/api/customers"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$", hasSize(greaterThanOrEqualTo(2))));
  }

  @Test
  void shouldCreateTicketAndChangeStatus() throws Exception {
    String payload = "{"
        + "\"title\":\"Login failures after SSO rollout\","
        + "\"description\":\"Customers started receiving forbidden on callback.\","
        + "\"priority\":\"HIGH\","
        + "\"assignedTeam\":\"identity\""
        + "}";

    mockMvc.perform(post("/api/customers/1/tickets")
            .contentType(MediaType.APPLICATION_JSON)
            .content(payload))
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.status").value("OPEN"))
        .andExpect(jsonPath("$.customerId").value(1));

    mockMvc.perform(patch("/api/tickets/1/status")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"status\":\"RESOLVED\"}"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.status").value("RESOLVED"));
  }

  @Test
  void shouldRejectDuplicateCustomerEmail() throws Exception {
    String payload = "{"
        + "\"name\":\"Duplicate Marina\","
        + "\"email\":\"marina@acme.com\","
        + "\"company\":\"Acme Logistics\""
        + "}";

    mockMvc.perform(post("/api/customers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(payload))
        .andExpect(status().isUnprocessableEntity())
        .andExpect(jsonPath("$.message").value("Customer email already registered: marina@acme.com"));
  }
}
