class Enrollment {
  constructor({ courseId, studentEmail, cohort }) {
    this.courseId = courseId;
    this.studentEmail = studentEmail;
    this.cohort = cohort;
  }
}

module.exports = {
  Enrollment
};
