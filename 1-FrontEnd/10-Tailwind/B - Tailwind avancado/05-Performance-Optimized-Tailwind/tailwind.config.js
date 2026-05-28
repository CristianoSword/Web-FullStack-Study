const statuses = ["emerald", "amber", "rose", "blue"];

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,html}"],
  safelist: statuses.flatMap((name) => [
    `bg-${name}-50`,
    `text-${name}-700`,
    `border-${name}-200`
  ]),
  theme: {
    extend: {
      colors: {
        graphite: "#111827"
      }
    }
  },
  future: {
    hoverOnlyWhenSupported: true
  },
  plugins: []
};

