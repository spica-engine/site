# Cloud Function Hints

## Table of contents

## Increasing Response Time

Users are not willing to wait more than 500 milliseconds in these days. Because of time limit, your custom APIs should respond as possible as fast. To increase your response time, you can use `batching` feature in cloud functions. To take the best performance from the cloud functions, you can follow the steps below;

1. Enable batching with the optimum `batching deadline` and `batching count` settings
2. Change every `@spica-devkit/bucket` operations to `@spica-devkit/database`
3. Import common libraries before the function definitions. Example code below;

```typescript
const { AsyncParser } = require('json2csv');
import {database} from "@spica-devkit/bucket";
import * as Identity from "@spica-devkit/identity";

export default async function(){
  // Your custom logic goes here

  return;
}
```

4. Don't forget return from your functions, otherwise worker will wait until timeout limit.
5. Complete time-consuming definitions before the function defitions. Example code below;

```typescript
// This part will work once
const { AsyncParser } = require('json2csv');
import {database} from "@spica-devkit/bucket";
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

After these steps, the response time will be reduced 90%. As an example, it will return 0.3 seconds if it returns in 1.5 seconds before.

## Worker Counts and Batching

There are worker count limitations in managed Spica packages. If you enable batching, you should set the `batching deadline` and `batching count` very carefully. 

* Let's say you have 5 batching workers and you have 5 workers limitation, the next function execution will wait until one of the workers completes the process and kills itself. 

> To solve this problem, you can collect you every functions to 5 function files. Then you can enable batching for your all function files.

## Typescript vs Javascript

1. In javascript engine, you will NOT see any definition and type checks. Therefore, we suggest you to use Typescript engine if you are planing to develop complex functions.

2. Typescript engine will compile your function when you save the it. To decrease the compilation time, it will use incremental-compilation. In first save, it will take much longer time (like 4-5 seconds). But after the first save, it will save faster. We advice you to save empty function in Typescript engine first.

## Child Process

You can reach to child process with `process` variable. Please see details with using `console.log(process)`. 

You can install third-party libraries such as `gcloud` and `helm` with `System.Ready` trigger. So even if you restart your machine, a cloud function will install your 3rd-party library again.

