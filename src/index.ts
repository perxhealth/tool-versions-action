import assert from "node:assert"
import fs from "node:fs"

import * as core from "@actions/core"

export async function run(): Promise<void> {
  try {
    // Retrieve required inputs
    const location = core.getInput("location", { required: false })

    // Perform some basic input validation
    assert(
      fs.existsSync(location),
      `.tool-versions location specified in \`location\` input does not exist: ${location}`,
    )

    // Read the entirety of `.tool-versions` in to memory and split it up by line
    const toolVersions = fs.readFileSync(location, "utf-8").split(/\r?\n/)

    // Loop over each entry and provide the environment variable and output
    for (const entry of toolVersions) {
      if (entry.length > 0) {
        const [tool, version] = entry.split(" ")
        core.setOutput(`${tool}_version`, version)
        core.exportVariable(`${tool.toUpperCase()}_VERSION`, version)
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message)
    }
  }
}

run()
