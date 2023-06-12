import fs from "fs"
import assert from "assert"

import * as core from "@actions/core"

async function run(): Promise<void> {
  try {
    return await Promise.resolve()
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message)
    }
  }
}

run()
