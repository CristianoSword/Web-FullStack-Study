const axios = require("axios");
const { fetchFeaturedCourses } = require("../src/services/course-service.js");

jest.mock("axios");

describe("fetchFeaturedCourses", () => {
  test("maps the API payload into course models", async () => {
    const get = jest.fn().mockResolvedValue({
      data: {
        items: [
          { id: "c-1", title: "Jest in Depth", level: "advanced", lessons: 12 }
        ]
      }
    });

    axios.create.mockReturnValue({ get });

    const courses = await fetchFeaturedCourses();

    expect(get).toHaveBeenCalledWith("/courses/featured");
    expect(courses[0]).toMatchObject({
      id: "c-1",
      title: "Jest in Depth",
      level: "advanced",
      lessons: 12
    });
  });

  test("propagates request errors", async () => {
    const get = jest.fn().mockRejectedValue(new Error("network down"));
    axios.create.mockReturnValue({ get });

    await expect(fetchFeaturedCourses()).rejects.toThrow("network down");
  });
});
