![Perx Health](https://user-images.githubusercontent.com/4101096/163123610-9dfa9263-1518-4f5d-8839-9ddc142a513e.png)

# `.tool-versions` Action

This repository contains a **GitHub Action** allowing you to export environment
variables and obtain Actions outputs as per your `.tool-versions` file.

### Usage

For example, if your repository contains a `.tool-versions` which looks like the
following...

```
nodejs 16.15.0
pnpm 7.26.1
elixir 1.14.3-otp-25
erlang 25.2.2
```

your environment will be updated with the following variables...

```bash
NODEJS_VERSION=16.15.0
PNPM_VERSION=7.26.1
ELIXIR_VERSION=1.14.3-otp-25
ERLANG_VERSION=25.2.2
```

The Action will also provide outputs accordingly. Following on from the examples
above...

```yaml
steps:
   - name: Parse versions
     id: versions
     uses: perxhealth/tool-versions-action@v1

   - name: Setup pnpm
     uses: pnpm/action-setup@v2
     with:
       version: ${{ steps.versions.outputs.pnpm_version }}

   - name: Setup node
     uses: actions/setup-node@v3
     with:
       node-version: ${{ steps.versions.outputs.nodejs_version }}
```

### Inputs

The Action currently accepts a single, optional input.

1. `location`

   Path on disk to the desired `.tool-versions`. defaults to `./.tool-versions`.

### Outputs

The Action provides a `*_version` output for each entry it finds in your
`.tool-versions`. For example, if your `.tool-versions` contains an entry like
`nodejs 16.15.0`, we'll produce an output like `NODEJS_VERSION=16.15.0`.

## Development

Follow the below steps to get up and running with a local, development copy
of the Action.

### Prerequisites

You will need the following tools installed on your machine.

- [Git](https://git-scm.com/)
- [asdf](https://github.com/asdf-vm/asdf)

### Clone the repository

```bash
$ git clone git@github.com:perxhealth/tool-versions-action
$ cd tool-versions-action
```

### Install dependencies

Firstly, you'll want to ensure the correct versions of the necessary system
dependencies are installed.

```bash
$ asdf install
```

_Note_: optionally, you may need to install the necessary [asdf](https://github.com/asdf-vm/asdf) plugins first.

```bash
$ asdf plugin add nodejs
$ asdf plugin add pnpm
```

Lastly, go ahead and install the Action's dependencies via `pnpm`

```bash
$ pnpm install
```

### Development

Edit `src/index.ts` to make your changes. There is no dev server to run, so
after (or before!) making your changes, update `src/index.test.ts` to ensure the
action still performs as expected.

The repo's maintainers will take care of packaging and releasing new
versions after Pull Requests have been merged. Although, we plan to automate
this in future if there's enough demand.

### Testing

Ensure you write tests to cover any code or behaviour you introduce.

```bash
$ pnpm test
```
