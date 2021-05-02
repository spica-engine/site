# @spica-devkit/database

## Table of contents

The database module is an in-memory module that has a public API for basic database operations like `FIND`, `INSERT`, `UPDATE`, `REPLACE`, `DELETE`, `DROP`.

> Database module imported from `@spica-devkit/database`.

#### Connecting to the database

You can get the database instance with the `database()` function exported from `@spica-devkit/database` module. This module will is designed to work in Spica instance. That's why, you can NOT use this module in your client application.

```typescript
import {database, Database} from "@spica-devkit/database";

const db: Database = await database();
// Type of db variable is  Database which exported from `@spica-devkit/database`
```

#### Getting the reference to a Collection

To make changes in a collection you need to get it reference first. You can get the reference for a specific collection with `Database.collection()` function exported by your database instance. For more information check [mongoDB API](https://mongodb.github.io/node-mongodb-native/3.2/api/Collection.html)

```typescript
import {database, Database, Collection} from "@spica-devkit/database";

const db: Database = await database();
const collection: Collection = db.collection("persistent_collection");
```

#### Operations

Here is some fundamental examples;

## Insert

```typescript
import {database, Database, Collection} from "@spica-devkit/database";

export default async function() {
  const db: Database = await database();
  const books: Collection = db.collection("books");

  // insertOne will return Promise<void>
  await books.insertOne({
    name: "The Lord Of The Rings",
    available_in: ["English"]
    author: "J. R. R. Tolkien",
    year: 1930
  });
}
```

## Find

```typescript
import {database, Database, Collection} from "@spica-devkit/database";

export default async function() {
  const db: Database = await database();
  const books: Collection = db.collection("books");

  // Get all books
  const allBooks = await books.find().toArray();
  console.dir(allBooks);
  // Above code will print [{ name: "The Fall Of Leaves", ... }]

  const writtenAfter19StCentury = await books.find({year: {$gte: 2000}}).toArray();
  console.dir(writtenAfter19StCentury);
  // Result will be empty array.
}
```

> NOTE: `find` method accepts [Query and Projection Operators](https://docs.mongodb.com/manual/reference/operator/query/)

## Find One

```typescript
import {database, Database, Collection} from "@spica-devkit/database";

export default async function() {
  const db: Database = await database();
  const books: Collection = db.collection("books");

  // Find the book named The Fall Of Leaves
  const book = await books.findOne({name: "The Fall Of Leaves"});
  console.dir(book);
  // Result will be { name: "The Fall Of Leaves", ... }
}
```

## Find By ID

```typescript
import {database, Database, Collection} from "@spica-devkit/database";

export default async function() {
  const db: Database = await database();
  const books: Collection = db.collection("books");

  const book = await books.findById("5f10302b4d858d1824e57e6d");
  console.dir(book);
  // Result will be { name: "The Fall Of Leaves", ... }
}
```

## Update

```typescript
import {database, Database, Collection} from "@spica-devkit/database";

export default async function() {
  const db: Database = await database();
  const books: Collection = db.collection("books");

  // Find the book named The Fall Of Leaves
  const book = await books.findOne({name: "The Fall Of Leaves"});

  // If the book found then update it's published year
  if (book) {
    book.year = 2000;
    // Update whole document with $set
    await books.update({name: book.name}, {$set: book});
  }
}
```