# @spica-devkit/storage

## Table of contents

## Initialize

> Storage module imported from `@spica-devkit/storage`.

##### Initializing Storage Module

To initialize storage, simply use the `initialize` function exported from the `@spica-devkit/storage` module. Specify the authorization (APIKEY or IDENTITY and optional API URL. 

```typescript
import * as Storage from "@spica-devkit/storage";

// Your API will serve under your spica instance url + "/api"
// Example API url example.hq.spicaengine.com/api
Storage.initialize({apikey: "<APIKEY>", publicUrl: "<YOUR API URL>"}); 
OR
Storage.initialize({identity: "<USER TOKEN>", publicUrl: "<YOUR API URL>"}); 
```

### Operations

Here are some fundamental examples;

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

## Download
```typescript
import * as Storage from "@spica-devkit/storage";

export default function(req, res) {
  Storage.initialize({identity: "<USER TOKEN>"});

  // Storage.download(<STORAGE ID>,{ headers?: <HEADERS OBJECT>, onDownloadProgress?: (progress) => void });
  return Storage.download("5f10302b4d858d1824e57e6d",{onDownloadProgress:(progress) => {
      const loadedPercentage = (progress.loaded / progress.total) * 100;
      console.log(`Download progress: %${loadedPercentage}`);  
    }});
}
```

## Insert

```typescript
import * as Storage from "@spica-devkit/storage";

export default function(req, res) {
  Storage.initialize({identity: "<USER TOKEN>"});

  let storageObjects = <BUFFER OBJECT>;

  
  // Storage.insert(<STORAGE OBJECT>,(progress)=>{});
  return Storage.insert(storageObjects, (data) => {
    const loadedPercentage = (progress.loaded / progress.total) * 100;
    console.log(`Upload progress: %${loadedPercentage}`);  });
  });
}
```

## Insert Many

```typescript
import * as Storage from "@spica-devkit/storage";

export default function(req, res) {
  Storage.initialize({identity: "<USER TOKEN>"});

  let storageObjects = [<FIRST BUFFER OBJECT>,<SECOND BUFFER OBJECT>,<THIRD BUFFER OBJECT>];
  
  // Storage.insert(<STORAGE OBJECT>,(progress)=>{});
  return Storage.insertMany(storageObjects, (data) => {
    const loadedPercentage = (progress.loaded / progress.total) * 100;
    console.log(`Upload progress: %${loadedPercentage}`);  });
  });
}
```

## Update

```typescript
import * as Storage from "@spica-devkit/storage";

export default function(req, res) {
  Storage.initialize({identity: "<USER TOKEN>"});

  let updatedStorage = <BUFFER OBJECT>;

  // Storage.update(<STORAGE ID>, <STORAGE FILE>, (progress)=>{});
  return Storage.update("5f10302b4d858d1824e57e6d", updatedStorage, (data) => {
    const loadedPercentage = (progress.loaded / progress.total) * 100;
    console.log(`Upload progress: %${loadedPercentage}`);  });
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