const React = require("react");

function ProgressBadge({ completed, total }) {
  const progress = Math.round((completed / total) * 100);

  return React.createElement(
    "span",
    {
      role: "status",
      "aria-label": "track-progress"
    },
    `${progress}% complete`
  );
}

module.exports = {
  ProgressBadge
};
