import * as core from "@actions/core";

export function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function buildSummary({ title, environment }) {
  const slug = slugify(title);
  return {
    summary: `Release "${title}" prepared for ${environment}.`,
    slug
  };
}

try {
  const title = core.getInput("title");
  const environment = core.getInput("environment");
  const result = buildSummary({ title, environment });

  core.setOutput("summary", result.summary);
  core.setOutput("slug", result.slug);
  core.info(result.summary);
} catch (error) {
  core.setFailed(error instanceof Error ? error.message : String(error));
}
