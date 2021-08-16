# Query Parameters

This document will explain which query parameters are accepted in the Spica environment.

```typescript

let queryParameters = {
  limit: 5, //number
  skip: 10, //number
  sort: {_id: -1}, //object
  filter: { _age: {$gt: "15"} }, //mongoDB aggregation object
  relation: true, //boolean or string array
  paginate: true, //boolean
  schedule: true, // boolean
}

```

You can see short explanations and examples for every query parameters below;

Example below will return 5 entries
> GET: `<YOUR-API>/data?limit=5`

Example below  will skip 10 entries
> GET: `<YOUR-API>/data?skip=10` 

Example below  will order by id DESC
> GET: `<YOUR-API>/data?sort={_id: -1}`

Example below  will order by id DESC, skip 20 entries and get 5 next entries from the bucket
> GET: `<YOUR-API>/data?skip=20&limit=5&sort={_id: -1}`

Example below  will resolve every relation fields in the root object
> GET: `<YOUR-API>/data?relation=true`

Example below  will resolve only user field in the root object
> GET: `<YOUR-API>/data?relation=user`

Example below  will resolve user and wallet in user object, also will resolve bank in the root object
> GET: `<YOUR-API>/data?relation=user.wallet&relation=bank`

Example below  will return total entries count with all entries
> GET: `<YOUR-API>/data?paginate=true`

Example below  will return only scheduled entries
> GET: `<YOUR-API>/data?schedule=true`
