package study.java.annotation.processor;

import java.util.LinkedHashSet;
import java.util.Set;
import javax.lang.model.element.Element;
import javax.lang.model.element.ElementKind;
import javax.lang.model.element.ExecutableElement;
import javax.lang.model.element.TypeElement;
import javax.tools.Diagnostic;
import study.java.annotation.api.TrackedComponent;
import study.java.annotation.api.TrackedOperation;

public class ProcessorValidation {

  private final javax.annotation.processing.Messager messager;

  public ProcessorValidation(javax.annotation.processing.Messager messager) {
    this.messager = messager;
  }

  public boolean validate(TypeElement component) {
    if (component.getKind() != ElementKind.CLASS) {
      messager.printMessage(Diagnostic.Kind.ERROR, "@TrackedComponent can only annotate classes", component);
      return false;
    }

    TrackedComponent trackedComponent = component.getAnnotation(TrackedComponent.class);
    if (trackedComponent.domain().trim().isEmpty() || trackedComponent.owner().trim().isEmpty()) {
      messager.printMessage(Diagnostic.Kind.ERROR, "domain and owner must be informed", component);
      return false;
    }

    Set<String> operationNames = new LinkedHashSet<String>();
    for (Element enclosed : component.getEnclosedElements()) {
      if (enclosed.getKind() == ElementKind.METHOD) {
        TrackedOperation trackedOperation = enclosed.getAnnotation(TrackedOperation.class);
        if (trackedOperation != null) {
          if (!(enclosed instanceof ExecutableElement)) {
            messager.printMessage(Diagnostic.Kind.ERROR, "@TrackedOperation is only valid on methods", enclosed);
            return false;
          }
          if (trackedOperation.value().trim().isEmpty()) {
            messager.printMessage(Diagnostic.Kind.ERROR, "Tracked operation must declare a value", enclosed);
            return false;
          }
          if (!operationNames.add(trackedOperation.value())) {
            messager.printMessage(Diagnostic.Kind.ERROR, "Duplicate tracked operation: " + trackedOperation.value(), enclosed);
            return false;
          }
        }
      }
    }

    if (operationNames.isEmpty()) {
      messager.printMessage(Diagnostic.Kind.ERROR, "Tracked component must expose at least one @TrackedOperation", component);
      return false;
    }

    return true;
  }
}
