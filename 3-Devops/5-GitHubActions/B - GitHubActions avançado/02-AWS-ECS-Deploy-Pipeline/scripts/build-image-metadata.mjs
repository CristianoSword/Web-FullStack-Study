import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const pipelineSpec = JSON.parse(fs.readFileSync(path.resolve(root, "config/pipeline-spec.json"), "utf8"));
const buildContext = JSON.parse(fs.readFileSync(path.resolve(root, "samples/image-build-context.json"), "utf8"));

const registry = `${pipelineSpec.accountId}.dkr.ecr.${pipelineSpec.awsRegion}.amazonaws.com`;
const imageUri = `${registry}/${pipelineSpec.repositoryName}:${buildContext.sha}`;

console.log(JSON.stringify({ registry, imageUri, branch: buildContext.branch }, null, 2));
