import { spawnSync } from "node:child_process";

export const runCommand = (command, args) => {
  try {
    const result = spawnSync(command, args, {
      encoding: "utf8",
      shell: false
    });

    if (result.error) {
      return {
        success: false,
        stdout: "",
        stderr: result.error.message
      };
    }

    return {
      success: result.status === 0,
      stdout: result.stdout ?? "",
      stderr: result.stderr ?? ""
    };
  } catch (error) {
    return {
      success: false,
      stdout: "",
      stderr: error.message
    };
  }
};
