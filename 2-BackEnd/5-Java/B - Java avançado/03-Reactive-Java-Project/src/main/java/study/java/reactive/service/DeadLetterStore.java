package study.java.reactive.service;

import java.util.List;
import java.util.ArrayList;
import java.util.concurrent.CopyOnWriteArrayList;
import study.java.reactive.model.DeadLetterEvent;

public class DeadLetterStore {

  private final CopyOnWriteArrayList<DeadLetterEvent> deadLetters = new CopyOnWriteArrayList<DeadLetterEvent>();

  public void save(DeadLetterEvent deadLetterEvent) {
    deadLetters.add(deadLetterEvent);
  }

  public List<DeadLetterEvent> snapshot() {
    return new ArrayList<DeadLetterEvent>(deadLetters);
  }
}
