package study.java.annotation.processor;

import java.io.IOException;
import java.io.Writer;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Filer;
import javax.lang.model.element.Element;
import javax.lang.model.element.ElementKind;
import javax.lang.model.element.TypeElement;
import javax.tools.JavaFileObject;
import study.java.annotation.api.TrackedComponent;
import study.java.annotation.api.TrackedOperation;

public class TrackingIndexWriter {

  public void write(Filer filer, List<TypeElement> components) throws IOException {
    JavaFileObject sourceFile = filer.createSourceFile("study.java.annotation.generated.GeneratedTrackingIndex");
    Writer writer = sourceFile.openWriter();
    try {
      writer.write("package study.java.annotation.generated;\n\n");
      writer.write("import java.util.Arrays;\n");
      writer.write("import java.util.List;\n\n");
      writer.write("public final class GeneratedTrackingIndex {\n");
      writer.write("  private GeneratedTrackingIndex() {}\n\n");
      writer.write("  public static List<String[]> entries() {\n");
      writer.write("    return Arrays.asList(\n");

      for (int i = 0; i < components.size(); i++) {
        TypeElement component = components.get(i);
        TrackedComponent trackedComponent = component.getAnnotation(TrackedComponent.class);
        List<String> operations = extractOperations(component);

        writer.write("      new String[] {");
        writer.write("\"" + component.getQualifiedName().toString() + "\", ");
        writer.write("\"" + trackedComponent.domain() + "\", ");
        writer.write("\"" + trackedComponent.owner() + "\", ");
        writer.write("\"" + String.join("|", operations) + "\"");
        writer.write("}");
        writer.write(i == components.size() - 1 ? "\n" : ",\n");
      }

      writer.write("    );\n");
      writer.write("  }\n");
      writer.write("}\n");
    } finally {
      writer.close();
    }
  }

  private List<String> extractOperations(TypeElement component) {
    List<String> operations = new ArrayList<String>();
    for (Element enclosed : component.getEnclosedElements()) {
      if (enclosed.getKind() == ElementKind.METHOD) {
        TrackedOperation operation = enclosed.getAnnotation(TrackedOperation.class);
        if (operation != null) {
          operations.add(operation.value() + ":" + operation.critical());
        }
      }
    }
    return operations;
  }
}
