class Course {
  constructor({ id, title, level, lessons }) {
    this.id = id;
    this.title = title;
    this.level = level;
    this.lessons = lessons;
  }
}

module.exports = {
  Course
};
