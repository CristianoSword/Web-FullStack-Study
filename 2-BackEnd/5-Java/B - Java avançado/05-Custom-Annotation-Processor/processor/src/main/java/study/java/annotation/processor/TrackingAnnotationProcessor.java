package study.java.annotation.processor;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import javax.annotation.processing.AbstractProcessor;
import javax.annotation.processing.ProcessingEnvironment;
import javax.annotation.processing.RoundEnvironment;
import javax.annotation.processing.SupportedAnnotationTypes;
import javax.annotation.processing.SupportedSourceVersion;
import javax.lang.model.SourceVersion;
import javax.lang.model.element.Element;
import javax.lang.model.element.TypeElement;
import javax.tools.Diagnostic;
import study.java.annotation.api.TrackedComponent;

@SupportedAnnotationTypes("study.java.annotation.api.TrackedComponent")
@SupportedSourceVersion(SourceVersion.RELEASE_8)
public class TrackingAnnotationProcessor extends AbstractProcessor {

  private ProcessorValidation validation;
  private TrackingIndexWriter indexWriter;

  @Override
  public synchronized void init(ProcessingEnvironment processingEnv) {
    super.init(processingEnv);
    this.validation = new ProcessorValidation(processingEnv.getMessager());
    this.indexWriter = new TrackingIndexWriter();
  }

  @Override
  public boolean process(Set<? extends TypeElement> annotations, RoundEnvironment roundEnv) {
    if (annotations.isEmpty() || roundEnv.processingOver()) {
      return false;
    }

    List<TypeElement> validComponents = new ArrayList<TypeElement>();
    for (Element element : roundEnv.getElementsAnnotatedWith(TrackedComponent.class)) {
      TypeElement component = (TypeElement) element;
      if (validation.validate(component)) {
        validComponents.add(component);
      }
    }

    if (validComponents.isEmpty()) {
      return false;
    }

    try {
      indexWriter.write(processingEnv.getFiler(), validComponents);
    } catch (IOException exception) {
      processingEnv.getMessager().printMessage(
          Diagnostic.Kind.ERROR,
          "Failed to generate tracking index: " + exception.getMessage());
    }

    return true;
  }
}
