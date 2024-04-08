import fs from "node:fs"

import core from "@actions/core"

import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest"

import { run } from "./"

vi.mock("@actions/core")

describe("run", () => {
  // before each test runs, we need to ensure our stub `.tool-versions` exists
  beforeAll(() => {
    fs.writeFileSync(
      ".tool-versions",
      "elixir 50.10.0\nerlang 42.3.4\nnodejs 9000.123.123\npnpm 1.2.3\nruby 4.5.6\n",
    )
  })

  // and clean it up
  afterAll(() => {
    fs.rmSync(".tool-versions")
  })

  describe("specified .tool-versions exists", () => {
    beforeEach(() => {
      vi.mocked(core).getInput.mockReturnValueOnce(".tool-versions")
    })

    describe("outputs", () => {
      beforeEach(async () => {
        await run()
      })

      it("finds five tools", () => {
        expect(vi.mocked(core).setOutput).toHaveBeenCalledTimes(5)
      })

      it("contains elixir", () => {
        expect(vi.mocked(core).setOutput).toHaveBeenCalledWith(
          "elixir_version",
          "50.10.0",
        )
      })

      it("contains erlang", () => {
        expect(vi.mocked(core).setOutput).toHaveBeenCalledWith(
          "erlang_version",
          "42.3.4",
        )
      })

      it("contains nodejs", () => {
        expect(vi.mocked(core).setOutput).toHaveBeenCalledWith(
          "nodejs_version",
          "9000.123.123",
        )
      })

      it("contains pnpm", () => {
        expect(vi.mocked(core).setOutput).toHaveBeenCalledWith(
          "pnpm_version",
          "1.2.3",
        )
      })

      it("contains ruby", () => {
        expect(vi.mocked(core).setOutput).toHaveBeenCalledWith(
          "ruby_version",
          "4.5.6",
        )
      })
    })

    describe("exports", () => {
      beforeEach(async () => {
        await run()
      })

      it("finds five tools", () => {
        expect(vi.mocked(core).setOutput).toHaveBeenCalledTimes(5)
      })

      it("contains elixir", () => {
        expect(vi.mocked(core).exportVariable).toHaveBeenCalledWith(
          "ELIXIR_VERSION",
          "50.10.0",
        )
      })

      it("contains erlang", () => {
        expect(vi.mocked(core).exportVariable).toHaveBeenCalledWith(
          "ERLANG_VERSION",
          "42.3.4",
        )
      })

      it("contains nodejs", () => {
        expect(vi.mocked(core).exportVariable).toHaveBeenCalledWith(
          "NODEJS_VERSION",
          "9000.123.123",
        )
      })

      it("contains pnpm", () => {
        expect(vi.mocked(core).exportVariable).toHaveBeenCalledWith(
          "PNPM_VERSION",
          "1.2.3",
        )
      })

      it("contains ruby", () => {
        expect(vi.mocked(core).exportVariable).toHaveBeenCalledWith(
          "RUBY_VERSION",
          "4.5.6",
        )
      })
    })
  })

  describe("specified .tool-versions does not exist", () => {
    beforeEach(async () => {
      vi.mocked(core).getInput.mockReturnValueOnce("i-dont-exist")
      await run()
    })

    it("does not set any outputs", () => {
      expect(vi.mocked(core).setOutput).not.toHaveBeenCalled()
    })

    it("does not export env vars", () => {
      expect(vi.mocked(core).exportVariable).not.toHaveBeenCalled()
    })

    it("error message", () => {
      expect(vi.mocked(core).setFailed).toHaveBeenCalledWith(
        ".tool-versions location specified in `location` input does not exist: i-dont-exist",
      )
    })
  })
})
