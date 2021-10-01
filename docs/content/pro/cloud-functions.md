# Cloud Function Hints

## Table of contents

## Reducing Response Time

Users are not willing to wait more than 500 milliseconds these days. Because of the time limit, your custom APIs should respond as possible as fast. To take the best performance from the cloud functions, you can follow the steps below;

1. Change every `@spica-devkit/bucket` operations to `@spica-devkit/database`
2. Import common libraries before the function definitions. Example code below;

```typescript
const { AsyncParser } = require('json2csv');
import {database} from "@spica-devkit/database";
import * as Identity from "@spica-devkit/identity";

export default async function(){
  // Your custom logic goes here

  return;
}
```

3. Don't forget to return from your functions, otherwise, the worker will wait until the timeout limit.
4. Complete time-consuming definitions before the function definitions. Example code below;

```typescript
// This part will work once
const { AsyncParser } = require('json2csv');
import {database} from "@spica-devkit/database";
import * as Identity from "@spica-devkit/identity";

let db; 
// end: global code section
  
// This part will work multiple times
export default async function(){


  if(!db) // If there is no connection between database and the process
    db = await database(); // This may take 200ms
  
  // Your custom logic goes here

  return;
}
// end: exported function
```

After these steps, the response time will be reduced by 90%. As an example, it will return 0.3 seconds if it returns 1.5 seconds before.

## Typescript vs Javascript

1. In the javascript engine, you will NOT see any type definitions and checks. Therefore, we suggest you use the Typescript engine if you are planning to develop complex functions.

2. Typescript engine will compile your function when you save it. To decrease the compilation time, it will use incremental compilation. In the first save, it will take a much longer time (like 4-5 seconds). But after the first save, it will save faster. We advise you to save an empty function in the Typescript engine first.

## Child Process

You can reach to child process with the `process` variable. Please see details using `console.log(process)`. 

You can install third-party libraries such as `gcloud` and `helm` with the `System.Ready` trigger. So even if you restart your machine, a cloud function will install your 3rd-party library again.
