# @spica-devkit/storage

## Table of contents

## Initialize

> Storage module imported from `@spica-devkit/storage`.

##### Initializing Storage Module

To initialize a storage, simply use `initialize` function exported from `@spica-devkit/storage` module. Specify the authorization (APIKEY or IDENTITY and optional API url. 

```typescript
import * as Storage from "@spica-devkit/storage";

// Your API will serve under your spica instance url + "/api"
// Example API url example.hq.spicaengine.com/api
Storage.initialize({apikey: "<APIKEY>", publicUrl: "<YOUR API URL>"}); 
OR
Storage.initialize({identity: "<USER TOKEN>", publicUrl: "<YOUR API URL>"}); 
```

### Operations

Here is some fundamental examples;

## Get

```typescript
import * as Storage from "@spica-devkit/storage";

export default function(req, res) {
  Storage.initialize({identity: "<USER TOKEN>"});
  return Storage.get("<STORAGE ID>");
}
```

## Get All

```typescript
import * as Storage from "@spica-devkit/storage";

export default function(req, res) {
  Storage.initialize({identity: "<USER TOKEN>"});
  return Storage.getAll();
}
```

## Insert

```typescript
import * as Storage from "@spica-devkit/storage";

export default function(req, res) {
  Storage.initialize({identity: "<USER TOKEN>"});

  let storageObjects = <BUFFER OBJECT>;

  
  // Storage.insert(<STORAGE OBJECT>);
  return Storage.insert(storageObjects, (data) => {
    console.log(data)
  });
}
```

## Insert Many

```typescript
import * as Storage from "@spica-devkit/storage";

export default function(req, res) {
  Storage.initialize({identity: "<USER TOKEN>"});

  let storageObjects = [<FIRST BUFFER OBJECT>,<SECOND BUFFER OBJECT>,<THIRD BUFFER OBJECT>];
  
  // Storage.insert(<STORAGE OBJECT>);
  return Storage.insertMany(storageObjects, (data) => {
    console.log(data)
  });
}
```

## Update

```typescript
import * as Storage from "@spica-devkit/storage";

export default function(req, res) {
  Storage.initialize({identity: "<USER TOKEN>"});

  let updatedStorage = <BUFFER OBJECT>;

  // Storage.update("<STORAGE ID>", <STORAGE OBJECT>);
  return Storage.update("5f10302b4d858d1824e57e6d", updatedStorage, (data) => {
    console.log(data)
  });
}
```

## Delete

```typescript
import * as Storage from "@spica-devkit/storage";

export default function(req, res) {
  Storage.initialize({identity: "<USER TOKEN>"});

  // Storage.remove("<STORAGE ID>");
  return Storage.remove("5f10302b4d858d1824e57e6d");
}
```