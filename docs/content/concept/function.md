# Function

Functions are an event-driven execution context for your spica. Simply, you can attach an event to your function from other modules and services. Your function will be triggered _when the event occurs_.

Within a function, you can do almost everything you want to do.

## Table of contents

## Use cases

On-demand nature of functions makes it a perfect candidate for event-driven execution.

See the following table for common `functions` use cases:

| Use case        | Description                                                                                                                                                                                                           |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Data processing | Listen and respond to storage events when a file is created, changed, or removed. Process images, perform video transcoding, validate and transform data, and invoke any service on the internet from your functions. |
| Webhooks        | With a simple HTTP call, respond to events originating from 3rd party systems like GitHub, Slack, Stripe.                                                                                                             |
| APIs            | Compose applications from lightweight, quick and flexible.                                                                                                                                                            |

## Events and triggers

There are events in the Spica. As an example there is an event when there is a change in the database or receive an HTTP request

If you attach a trigger to your function, your function will be executed when the event raised.


![Example Triggers](assets/images/docs/function/triggers.png)

Currently, the Functions supports following triggers:

- [HTTP](#http)
- [Database](#database)
- [Schedule](#schedule)
- [Bucket](#bucket)
- [System](#system)
- [Firehose](#firehose)

### Event Data

Event trigger will pass the data as parameters to the function when the event raised. The parameters will be different related to the type of event.

For example a function which has http trigger will look like this:

```typescript
export default function(request, response) {
  // Send the response
  response.send({
    message: "Spica is awesome!"
  });
}
```

See [triggers](#triggers) section for parameter types.

## Triggers

### Http

You can invoke your function with an HTTP request using the `POST`, `PUT`, `GET`, `DELETE`, `PATCH`, `HEAD` and `OPTIONS` HTTP methods along with a path like `/books` or `/books/:id`.

To able to create a function with HTTP trigger, you need two information;
Path and Method, the method must be one of the specified HTTP methods above also you need a path like above.

> HINT: When you save your function the endpoint will be provisioned automatically.

> **IMPORTANT:** The path and method are not validated for any collision with another function's path and method. So make sure that the path and method not used by other functions otherwise you function may override other function's path.

#### Method

HTTP trigger needs an HTTP method to be able to triage requests properly. For more info check out [Http Methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)

Currently, these methods are valid for use;

- `GET`
- `POST`
- `PUT`
- `DELETE`
- `PATCH`
- `HEAD`
- `OPTIONS`

Also, you can use `ANY` method that covers all methods above which means your function will be executed regardless of the HTTP method of request that bein received.

#### Path

Spica will use the path will use when reserve a trigger URL for your function. When you save your function, the trigger URL will be attached to **`{API_URL}/fn-execute`** as suffix URL.

For example;

**`/books`** will be served at **`/fn-execute/books`** path

Also, Path can have a _wildcard_ or a _parameter_ segment.

Example: **`/books/:bookId`** can match with these paths above:

- `/books/1`
- `/books/mybookid`
- `/books/getting started with spica`

However the **`/books/:bookId`** path **will not** match with the paths below:

- `/books/1/author`
- `/books/1/update`

Because the path has only one parameter which can match with a sub-segment.

#### Getting parameters in function code

The parameters in the trigger path will be passed through the `request` parameter to your function. It's the first parameter of your function.

Example:

For **`/books/:bookId`** path, you can access the **bookId** parameter from **`request.params`** object.

```typescript
export default function(request, response) {
  // Print the bookId parameter
  console.log(request.params.bookId);
  // Send the response
  response.send({
    bookId: request.params.bookId
  });
}
```

When you execute this function on **`/fn-execute/books/1`** URL, the response will contain the following information

```json
{
  "bookId": 1
}
```

#### Request Body

Usually, every request contains a payload (body) along with the request. It can be either `Raw` or `Text` payload. You can access to the payload of the request with `request.body` property.

Example function;

```typescript
export default function(request, response) {
  // A entry will appear in function logs.
  console.dir(request.body);
  // Send body as response right away
  response.send(request.body);
}
```

If you send a `POST` request to this function with the following `JSON` payload; You will get the exact payload to response back because we used `request.body` as a response payload.

```json
{
  "name": "The Fall Of Leaves",
  "description": " The Fall Of Leaves is a novel by Turkish author and playwright Resat Nuri Guntekin, written in 1930.",
  "translator": "W. D. Halsey",
  "author": "Resat Nuri Guntekin",
  "year": 1930
}
```

You need to parse the payload to be able to use it in a function.

"Function" parses the following payload types by default:

| Origin | Content-Type                      | Supported | Description                                                                               |
| ------ | --------------------------------- | --------- | ----------------------------------------------------------------------------------------- |
| Text   | application/json                  | Yes       | Supported by default.                                                                     |
| Raw    | application/bson                  | Yes       | Supported by default.                                                                     |
| Text   | application/x-www-form-urlencoded | No        | Will be supported soon. See issue [#28](https://github.com/spica-engine/spica/issues/28). |
| Raw    | multipart/form-data               | No        | Will be supported soon. See issue [#28](https://github.com/spica-engine/spica/issues/28). |
| Text   | application/xml                   | No        | You need to install an appropriate module to handle request payload.                      |
| Text   | application/yaml                  | No        | You need to install an appropriate module to handle request payload.                      |

### Database

Database trigger, invokes your function when a specific database event raised in a collection of database. The database trigger can invoke your function with `INSERT`, `UPDATE`, `REPLACE`, `DELETE`, `DROP` events in a specific database collection. When the event raised, your function will be invoked with the changes in the collection.

To be able to create a function that triggered by database event, you need two required and one optional information about the event

- **Collection:** Name of the collection where the set of documents stored
- **Event Type:** Type of the event that happens in the collection. It can be `INSERT`, `UPDATE`, `REPLACE`, `DELETE`, `DROP`.
- **Full Document:** Whether you want only full document or changes on passed data.

> IMPORTANT: When a REPLACE/UPDATE event immediately followed by DELETE/DROP event, `fullDocument` property in the event will be `null`.

A basic database function looks like this:

```typescript
export default function(changes) {
  console.log(changes);
  // Business logic here
}
```

In the example code above, changes variable which passed to our function on the first parameter contains all the information about the changes.

Content of `changes` variable with the `INSERT` event and `full document` option enabled will look like this;

```typescript
{
  "operationType": "insert", // Type of the event
  "clusterTime": 1563732441, // Time of the event occurrence
  "fullDocument": {
    // The newly inserted document
    "_id": "5d34a9d957b31b06390788ec",
    "wysiwyg": {"en_US": "dqwdwd"},
    "relation": "5d132772d5869d9fd24c5985"
  },
  "ns": {
    // database name and collection name
    "db": "spica",
    "coll": "bucket_5d15d8244a23f73a2a453770"
  },
  "documentKey": {
    // the id of the inserted document (ObjectId string)
    "_id": "5d34a9d957b31b06390788ec"
  }
}
```

### Schedule

Schedule trigger invokes your function in a specific time and specific timezone. Fundamentally, schedule trigger is a [CRON](https://en.wikipedia.org/wiki/Cron) based trigger that invokes your function in a specific interval based on your CRON expression. Also, when your function invoked, the first parameter of your function will contain a function which basically stops the scheduler in case you don't want your function to be invoked at the next tick.

To create a scheduled function you need a CRON time expression and Time-zone because scheduler schedules your function regardless of the Time-zone of the host machine.

For example, if you want to run your function at every minute, you need a cron time expression like this [\* \* \* \* \*](https://crontab.guru/#*_*_*_*_*).

```typescript
export default function() {
  // Your business logic
}
```

In the example, we have stopped scheduler so our function won't be invoked next time when scheduler ticks.

#### Cron Time expression

Cron expression made of five-string separated with a whitespace character.

```
 ┌───────────── minute (0 - 59)
 │ ┌───────────── hour (0 - 23)
 │ │ ┌───────────── day of the month (1 - 31)
 │ │ │ ┌───────────── month (1 - 12)
 │ │ │ │ ┌───────────── day of the week (0 - 6) (Sunday to Saturday)
 │ │ │ │ │
 │ │ │ │ │
 * * * * *
```

> Crontab is a good tool for learning cron expressions. Checkout [CronTab](https://crontab.guru)

Here is some example of CRON expressions

| Expression  | Description                                                |
| :---------: | ---------------------------------------------------------- |
| `0 0 1 1 *` | Run once a year at midnight of 1 January                   |
| `0 0 1 * *` | Run once a month at midnight of the first day of the month |
| `0 0 * * 0` | Run once a week at midnight on Sunday morning              |
| `0 0 * * *` | Run once a day at midnight                                 |
| `0 * * * *` | Run once an hour at the beginning of the hour              |
| `* * * * *` | Run every minute                                           |

### Bucket

Bucket trigger invokes your function **after** the selected operation for a specific bucket.

All required fields for a bucket trigger are listed below;

- **Bucket:** Bucket ID of the desired bucket
- **Event Type:** Type of the event that happens in the collection.
#### Bucket Events

Bucket events triggers after any of the following Bucket events happen:

- `ALL`: Triggers after any of the below operations happens on Bucket Data,
- `INSERT`: Triggers after a new data inserted to the specific Bucket,
- `UPDATE`: Triggers after a bucket data updated,
- `DELETE`: Triggers after a bucket data deleted.

The function takes the `change` object as a parameter.

Example change object:

```json
{
  "kind": "update",
  "bucket": "5f6fb373196847002cb2e1bd",
  "documentKey": "5f6fb467196847002cb2e1ca",
  "previous": {
    "_id": "5f6fb467196847002cb2e1ca",
    "slug": "test_1",
    "title": "First Title"
  },
  "current": {
    "_id": "5f6fb467196847002cb2e1ca",
    "slug": "test_2",
    "title": "Second Title"
  }
}
```

Example function:

```javascript
export default function(changes) {
  console.log(changes);
  // Business logic here
}
```

#### Difference Between Bucket After Events and Database Events

Database events triggers when a change happens on Database layer, but Bucket After Events listens the API operations and triggers when the API processes the request.

If you happen to change a data directly from the database (e.g. by using the `@spica-devkit/database`), only the Database events are triggers. But on either changes via Spica Client or Bucket APIs both **Bucket After Events** and **Database Events** triggers.

For example, let's assume we want to send a notification to a 3rd party API when a Spica User changes a data on Spica, but also we have a function which changes a bucket data internally by using `@spica-devkit/database`. It's correct to use **Bucket After Events** for the 3rd API communication instead of the Database Events in this case.

### System

System trigger includes system related event data and invokes a function whenever the chosen event happens. The system trigger is the best choice for using the dashboard module, configuring the instance, or setting up a starting state for your data. `READY` event will be triggered when a server restarts and ready to use. For the current version, the system trigger supports the `READY` event only.

```typescript
export default function() {
  console.log("Spica is ready");
}
```

### Firehose

You can invoke a function in real-time from your client application. It is a great tool for low latency operations since it keeps the connection always open _unlike the HTTP trigger_. Keep in mind that the firehose trigger does not interact with the bucket or database directly. However, that does not mean you can not perform database operations within your function. Instead, it listens to the real-time events so you can interact with the functions on the server directly from your client application. The firehose trigger can listen to a _user-defined event_, _connection_ and _disconnect_ event and let you act on behalf of those events.

As an example, if you are making a game and run a real-time server-side logic that will communicate with the client application such as real-time point calculating, you can calculate score and deliver the result in real-time using the firehose trigger.

```typescript
export default function(message, {socket, pool}) {
  console.log(message.name); // Outputs: connection
  console.log(message.data.url); // Outputs: /firehose

  const isAuthorized = false; // Decide if the user has been authorized.

  if (isAuthorized) {
    // Write back to incoming socket that authorization has been successful.
    socket.send("authorization", {state: true});

    // Announce the new connection to firehose pool (aka all connected sockets)
    pool.send("connection", {
      id: socket.id,
      ip_address: socket.remoteAddress
    });
  } else {
    socket.send("authorization", {state: false, error: "Authorization has failed."});
    socket.close();
  }
}
```

### Environment Variables

You can define custom environment variables for your functions. If your team is a multi-disciplined team, you may need some roles to change just function variables. For this situtation, you can define environment variables which will be passed to function as a parameter. You can see an example of how environment variable works below:

```typescript
export default function() {
  return process.env.exampleVariable;
}
```

### 3rd Party Dependencies

This feature allows you to use 3rd party dependencies in your functions. Spica installs 3rd party libraries from NPM (node package manager). To use a 3rd party library, you just need to add it as a dependency to one of your functions by going to the particular function's edit page.

> IMPORTANT: Each functions are decoupled from the Spica environment. So, if you will use the same library for different functions, you need to download the library for each function.

### Debugging

An unhandled error will crash your function, when the error happens it will be logged to function logs.

#### Logging

A function code can have statements like `console.log`, `console.error`, when code calls a console function the output of log will be written to function's log.

![Logs](assets/images/docs/function/logs.png)