# Asset Workflow

An asset is any item that you use in your Spica project. Assets can represent a Passport,  a Bucket, a Function, or a bundle of them.

To create a new asset, you need to create a new file called `asset.yaml` in an empty folder.

Every piece of asset starts with the following required variables:

| Variables    | Description                                   |
| ------------ | --------------------------------------------- |
| `apiVersion` | Specifies the asset's type and version.       |
| `kind`       | Specifies the asset's type.                   |
| `metadata`   | Specifies the asset's name and other metadata |
| `spec`       | Specifies the asset's properties.             |


## Bucket Asset

First, let's see an example of a bucket asset.

```yaml
apiVersion: bucket/v1
kind: Schema
metadata:
  name: bucket-asset
spec:
  title: Bucket Asset
  description: Bucket Asset description
  properties:
    title:
      type: string
      description: "Add a title to your bucket"
      options:
        position: left
        visible: true
  primary:
    - title
```

For more information about `spec` properties, see [Bucket Module Types]().

## Function Asset

To create a function asset, you have to create two different kind of blocks. One for triggers and one for the function itself.

### Function Kind

```yaml
apiVersion: function/v1
kind: Function
metadata:
  name: example-function
spec:
  title: Example Function
  description: "Example Function Kind Asset"
  timeout: 10
  code: ./function/triggers.js
  runtime:
    name: Node
    language: Javascript
  environment:
    - name: AUTH_APIKEY
      valueFrom:
        resourceFieldRef:
          apiKeyName: auth-apikey
    - name: STATIC_ENV
      value: "test"
  dependency:
    - name: "@spica-devkit/bucket"
      version: latest
```
Function code of an asset lives in a folder called `function` in the asset's folder. You have to create a file called `triggers.js` in this folder and add the code to it.

### Trigger Kind

```yaml
apiVersion: function/v1
kind: Trigger
metadata:
  name: example-trigger
spec:
  name: default
  func: example-function
  type: http
  httpOptions:
    method: Post
    path: /post
```

Trigger kind is a special kind of asset. It's used to define the triggers of a function. In order to match the function, you have to specify the name of the function under `spec.func`.

## Passport Asset

### ApiKey Kind

```yaml
apiVersion: passport/v1
kind: ApiKey
metadata:
  name: auth-apikey
spec:
  name: Example Api Key
  policies:
    - BucketFullAccess
    - IdentityFullAccess
```

## Getting the Referenced Asset ID

As the assets are created on the server, you can get the ID of the asset by using the following structure:

```
<kind value of the asset>+Name: <metadata.name in the asset>
```

Following example returns the ID of the Bucket asset: 

```yaml
valueFrom:
  resourceFieldRef:
    schemaName: bucket-asset 
```

## Manually Applying the Asset

For manually applying the asset, visit the [Spica CLI Docs](https://spicaengine.com/docs/concept/cli).