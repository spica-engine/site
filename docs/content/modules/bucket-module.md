# @spica-devkit/bucket

## Table of contents

> Bucket module imported from `@spica-devkit/bucket`.

## Initializing Bucket Module

To initialize a bucket, simply use the `initialize` function exported from the `@spica-devkit/bucket` module. Specify the authorization (APIKEY or IDENTITY) and optional API URL.

```typescript
import * as Bucket from "@spica-devkit/bucket";

Bucket.initialize({apikey: "<APIKEY>", publicUrl: "<YOUR API URL>"}); // Your API will serve under your spica instance url + "/api"
OR
Bucket.initialize({identity: "<USER TOKEN>", publicUrl: "<YOUR API URL>"}); // Example API url example.hq.spicaengine.com/api
```

##### Operations

## Get

```typescript
import * as Bucket from "@spica-devkit/bucket";

export default function(req, res) {
  Bucket.initialize({identity: "<USER TOKEN>"});
  return Bucket.get("<BUCKET ID>");
}
```

## Get All

```typescript
import * as Bucket from "@spica-devkit/bucket";

export default function(req, res) {
  Bucket.initialize({identity: "<USER TOKEN>"});
  return Bucket.getAll();
}
```

## Insert

```typescript
import * as Bucket from "@spica-devkit/bucket";

export default function(req, res) {
  Bucket.initialize({identity: "<USER TOKEN>"});

  let bucket = {
    title: "Example Bucket",
    description: "User Bucket Description",
    primary: "name",
    properties: {
      name: {
        type: "string",
        title: "name",
        options: {position: "left", visible: true}
      },
      surname: {
        type: "string",
        title: "surname",
        options: {position: "right"}
      }
    }
  };

  return Bucket.insert(newBucket);
}
```

## Update

```typescript
import * as Bucket from "@spica-devkit/bucket";

export default function(req, res) {
  Bucket.initialize({identity: "<USER TOKEN>"});

  let bucket = {
    title: "Example Bucket",
    description: "User Bucket Description",
    primary: "name",
    properties: {
      name: {
        type: "string",
        title: "name",
        options: {position: "left", visible: true}
      },
      surname: {
        type: "string",
        title: "surname",
        options: {position: "right"}
      }
    }
  };

  return Bucket.update("5f10302b4d858d1824e57e6d", {
    ...bucket,
    title: "UPDATED BUCKET TITLE"
  });
}
```

## Delete

```typescript
import * as Bucket from "@spica-devkit/bucket";

export default function(req, res) {
  Bucket.initialize({identity: "<USER TOKEN>"});
  return Bucket.remove("5f10302b4d858d1824e57e6d");
}
```

## Data Get

```typescript
import * as Bucket from "@spica-devkit/bucket";

export default function(req, res) {
  Bucket.initialize({identity: "<USER TOKEN>"});
  return Bucket.data.get("<BUCKET ID>", "<BUCKET DATA ID>");
}
```

Note: Additionally, `Bucket.data.get()` function accepts a third optional `options` parameter. The following is the structure of the `options` parameter:

```json
{
  headers: {
    <HTTP HEADER KEY>: "<VALUE>"
  },
  queryParams: "<Query Parameters>"
}
```

For more information about `Query Parameters`, please visit [this page](https://spicaengine.com/docs/additionals/query-params).


## Data Get with Parameters

```typescript
import * as Bucket from "@spica-devkit/bucket";

export default function(req, res) {
  Bucket.initialize({identity: "<USER TOKEN>"});
  return Bucket.data.getAll("<BUCKET ID>", {
    headers: {"accept-language": "TR"},
    queryParams: {paginate: true, skip: 1}
  });
}
```

Note: `Bucket.data.getAll()` function accepts a third optional `options` parameter. The following is the structure of the `options` parameter:

```json
{
  headers: {
    <HTTP HEADER KEY>: "<VALUE>"
  },
  queryParams: {
    <SPICA QUERY PARAMS>: "<VALUE>",
    filter: "<Query Parameters>"
  }
}
```

For more information about Query Parameters, please visit [this page](https://spicaengine.com/docs/additionals/query-params).

## Data Insert

```typescript
import * as Bucket from "@spica-devkit/bucket";

export default function(req, res) {
  Bucket.initialize({identity: "<USER TOKEN>"});

  let document = {
    name: "123",
    surname: "321"
  };

  return Bucket.data.insert("<BUCKET ID>", document);
}
```

## Data Update

```typescript
import * as Bucket from "@spica-devkit/bucket";

export default function(req, res) {
  Bucket.initialize({identity: "<USER TOKEN>"});

  let document = {
    name: "123",
    surname: "321"
  };

  return Bucket.data.update("<BUCKET ID>", "<BUCKET DATA ID>", {
    ...document,
    name: "updated_name"
  });
}
```

## Data Patch

```typescript
import * as Bucket from "@spica-devkit/bucket";

export default function(req, res) {
  Bucket.initialize({identity: "<USER TOKEN>"});

  let patchedFields = {
    title: "Example Bucket",
    description: "Example description"
  };

  return Bucket.data.patch("5f10302b4d858d1824e57e6d", patchedFields);
}
```

## Data Remove

```typescript
import * as Bucket from "@spica-devkit/bucket";

export default function(req, res) {
  Bucket.initialize({identity: "<USER TOKEN>"});
  return Bucket.data.remove("<BUCKET ID>", "<BUCKET DATA ID>");
}
```

## Realtime Data Get

```typescript
import * as Bucket from "@spica-devkit/bucket";

export default function(req, res) {
  Bucket.initialize({identity: "<USER TOKEN>"});
  return Bucket.data.realtime.get("<BUCKET ID>", "<BUCKET DATA ID>");
}
```

## Realtime Data Get All

```typescript
import * as Bucket from "@spica-devkit/bucket";

export default function(req, res) {
  Bucket.initialize({identity: "<USER TOKEN>"});
  return Bucket.data.realtime.getAll("<BUCKET ID>");
}
```

Note: Additionally, `Bucket.data.realtime.getAll()` function accepts a second optional `queryParams` parameter. The following is the structure of the `queryParams` parameter:

```json
{
  <SPICA QUERY PARAMS>: "<VALUE>",
  filter: "<Query Parameters>"
}
```

## Realtime Data Insert

```typescript
import * as Bucket from "@spica-devkit/bucket";

export default function(req, res) {
  Bucket.initialize({identity: "<USER TOKEN>"});
  let connection = Bucket.data.realtime.getAll("<BUCKET ID>");
  connection.subscribe();

  let document = {
    name: "123",
    surname: "321"
  };

  connection.insert(document);
}
```

## Realtime Data Replace

```typescript
import * as Bucket from "@spica-devkit/bucket";

export default function(req, res) {
  Bucket.initialize({identity: "<USER TOKEN>"});
  let connection = Bucket.data.realtime.getAll("<BUCKET ID>");
  connection.subscribe();

  let document = {
    _id: <BUCKET DATA ID>,
    name: "123",
    surname: "321"
  };

  connection.replace(document);
}
```

## Realtime Data Patch

```typescript
import * as Bucket from "@spica-devkit/bucket";

export default function(req, res) {
  Bucket.initialize({identity: "<USER TOKEN>"});
  let connection = Bucket.data.realtime.getAll("<BUCKET ID>");
  connection.subscribe();

  let document = {
    _id: <BUCKET DATA ID>,
    surname: "321"
  };

  connection.replace(document);
}
```

## Realtime Data Remove

```typescript
import * as Bucket from "@spica-devkit/bucket";

export default function(req, res) {
  Bucket.initialize({identity: "<USER TOKEN>"});
  let connection = Bucket.data.realtime.getAll("<BUCKET ID>");
  connection.subscribe();

  let document = {
    _id: <BUCKET DATA ID>,
    name: "123",
    surname: "321"
  };

  connection.remove({document});
}
```