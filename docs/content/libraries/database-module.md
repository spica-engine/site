# @spica-devkit/database

## Table of contents

The database module is an in-memory module that has a public API for basic database operations like `FIND`, `INSERT`, `UPDATE`, `REPLACE`, `DELETE`, `DROP`.

> Database module imported from `@spica-devkit/database`.

## Connecting to the database

You can get the database instance with the `database()` function exported from the `@spica-devkit/database` module. This module will is designed to work in Spica instance. That's why you can NOT use this module in your client application.

```typescript
import {database, Database} from "@spica-devkit/database";

const db: Database = await database();
// Type of db variable is  Database which exported from `@spica-devkit/database`
```

## Getting the reference to a Collection

To make changes in a collection you need to get it reference first. You can get the reference for a specific collection with the `Database.collection()` function exported by your database instance. For more information check [mongoDB API](https://docs.mongodb.com/master/core/databases-and-collections/)

```typescript
import {database, Database, Collection} from "@spica-devkit/database";

export default async function(){
  const db: Database = await database();
  const collection: Collection = db.collection("persistent_collection");
}

// Here you can use any MongoDB collection operation here such as find, insert, delete, deleteMany .etc
```

To see all methods you can check [mongoDB collection methods](https://docs.mongodb.com/manual/reference/method/js-collection/)

## Close Operation

Once you create a connection between the process and database, it will be good to use the `close` function which is exported by the database module to avoid memory leaks. Otherwise, it may create new connections every time and this will cause `insufficient memory to operate`.

```typescript
import {database, close, Database, Collection} from "@spica-devkit/database";

export default async function(){

  const db: Database = await database();
  const collection: Collection = db.collection("persistent_collection");

  // Your custom logic goes here

  close();
}
```