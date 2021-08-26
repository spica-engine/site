# CLI

## Installation
Spica prodivdes CLI to manage your instances. To use CLI, simply enter the following command to your terminal:

```shell
$ npm install @spica/cli -g
```

Usage:

```shell
$ spica <command> [<args>] [--help] [options]
```

> Important: To run `serve` command, you must have [Docker](https://www.docker.com/) and [NodeJs](https://nodejs.org) installed on your development environment.

### Commands

## Local Spica Instance

Run a Spica instance on your local machine:

```shell
$ spica project start <instance name>
```

Stop and remove a spica instance:

```shell
$ spica project remove <instance name>
```

Shows a list of spica instances running on this machine:

```shell
$ spica project ls
```

## Manually Applying the Asset

Instead of directly applying the asset from asset store, you can also apply the asset manually using [Spica CLI](https://spicaengine.com/docs/concept/cli). Below, we show how to apply the bucket asset.

Create a new Spica context on your machine using the following command:

```bash
$ spica context set --name <UNIQUE_NAME> --apikey <API_KEY> --url <API_URL>
```

Switch to the context you just created:

```bash
$ spica context switch <UNIQUE_NAME>
```

And apply for that context the bucket asset:

```bash
$ spica apply -f <ASSET_YAML_PATH>
```

If you want to delete the asset, you can use the following command:

```bash
$ spica delete -f <ASSET_YAML_PATH>
```
