const { AuditService } = require("../src/services/audit-service.js");
const { EnrollmentService } = require("../src/services/enrollment-service.js");

describe("EnrollmentService with jest.spyOn", () => {
  test("tracks validation, build and audit calls during enrollment", () => {
    const auditService = new AuditService();
    const service = new EnrollmentService(auditService);

    const validateSpy = jest.spyOn(service, "validatePayload");
    const buildSpy = jest.spyOn(service, "buildEnrollment");
    const formatSpy = jest.spyOn(auditService, "formatEntry");
    const persistSpy = jest.spyOn(auditService, "persist");

    const result = service.enroll({
      courseId: "jest-advanced",
      studentEmail: "student@example.com",
      cohort: "2026-q3"
    });

    expect(validateSpy).toHaveBeenCalledTimes(1);
    expect(buildSpy).toHaveBeenCalledWith({
      courseId: "jest-advanced",
      studentEmail: "student@example.com",
      cohort: "2026-q3"
    });
    expect(formatSpy).toHaveBeenCalledWith(
      "student-enrolled",
      "student@example.com",
      "jest-advanced",
      { cohort: "2026-q3" }
    );
    expect(persistSpy).toHaveBeenCalledTimes(1);
    expect(result.enrollment).toMatchObject({
      courseId: "jest-advanced",
      studentEmail: "student@example.com",
      cohort: "2026-q3"
    });
  });

  test("does not persist audit when validation fails", () => {
    const auditService = new AuditService();
    const service = new EnrollmentService(auditService);

    const persistSpy = jest.spyOn(auditService, "persist");

    expect(() =>
      service.enroll({
        courseId: "jest-advanced",
        studentEmail: "invalid-email",
        cohort: "2026-q3"
      })
    ).toThrow("studentEmail is invalid");

    expect(persistSpy).not.toHaveBeenCalled();
  });
});
