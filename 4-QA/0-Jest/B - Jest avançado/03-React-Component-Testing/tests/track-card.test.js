const React = require("react");
const { fireEvent, render, screen } = require("@testing-library/react");
const { TrackCard } = require("../src/components/track-card.js");

describe("TrackCard", () => {
  test("renders title and progress badge", () => {
    render(
      React.createElement(TrackCard, {
        title: "Jest Advanced",
        lessons: ["spyOn", "mocking", "components", "performance"],
        completedLessons: 2
      })
    );

    expect(screen.getByRole("heading", { name: "Jest Advanced" })).toBeInTheDocument();
    expect(screen.getByRole("status", { name: "track-progress" })).toHaveTextContent("50% complete");
  });

  test("reveals lessons when the details button is clicked", () => {
    render(
      React.createElement(TrackCard, {
        title: "React Testing",
        lessons: ["render", "queries", "events"],
        completedLessons: 1
      })
    );

    fireEvent.click(screen.getByRole("button", { name: "Show details" }));

    expect(screen.getByText("queries")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Hide details" })).toBeInTheDocument();
  });
});
