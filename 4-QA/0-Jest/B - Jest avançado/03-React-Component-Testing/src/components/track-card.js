const React = require("react");
const { ProgressBadge } = require("./progress-badge.js");

function TrackCard({ title, lessons, completedLessons }) {
  const [expanded, setExpanded] = React.useState(false);

  return React.createElement(
    "section",
    { "aria-label": `track-${title}` },
    React.createElement("h2", null, title),
    React.createElement(
      "button",
      {
        type: "button",
        onClick: () => setExpanded((current) => !current)
      },
      expanded ? "Hide details" : "Show details"
    ),
    React.createElement(ProgressBadge, {
      completed: completedLessons,
      total: lessons.length
    }),
    expanded
      ? React.createElement(
          "ul",
          null,
          ...lessons.map((lesson) => React.createElement("li", { key: lesson }, lesson))
        )
      : null
  );
}

module.exports = {
  TrackCard
};
