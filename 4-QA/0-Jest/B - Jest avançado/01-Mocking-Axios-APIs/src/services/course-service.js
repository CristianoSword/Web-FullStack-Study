const { getHttpClient } = require("../api/http-client.js");
const { Course } = require("../models/course.model.js");

async function fetchFeaturedCourses() {
  const httpClient = getHttpClient();
  const response = await httpClient.get("/courses/featured");

  return response.data.items.map(
    (item) =>
      new Course({
        id: item.id,
        title: item.title,
        level: item.level,
        lessons: item.lessons
      })
  );
}

module.exports = {
  fetchFeaturedCourses
};
