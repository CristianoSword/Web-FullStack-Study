const { Enrollment } = require("../models/enrollment.model.js");

class EnrollmentService {
  constructor(auditService) {
    this.auditService = auditService;
  }

  validatePayload(payload) {
    if (!payload.courseId) {
      throw new Error("courseId is required");
    }

    if (!payload.studentEmail || !payload.studentEmail.includes("@")) {
      throw new Error("studentEmail is invalid");
    }

    if (!payload.cohort) {
      throw new Error("cohort is required");
    }
  }

  buildEnrollment(payload) {
    return new Enrollment({
      courseId: payload.courseId,
      studentEmail: payload.studentEmail,
      cohort: payload.cohort
    });
  }

  enroll(payload) {
    this.validatePayload(payload);
    const enrollment = this.buildEnrollment(payload);
    const entry = this.auditService.formatEntry(
      "student-enrolled",
      payload.studentEmail,
      payload.courseId,
      { cohort: payload.cohort }
    );
    const auditResult = this.auditService.persist(entry);

    return {
      enrollment,
      auditResult
    };
  }
}

module.exports = {
  EnrollmentService
};
