# Query Parameters

This document will explain which query parameters are accepted in the Spica environment.

| Parameter  | Description                                      | Type                                                                                                                                                                                     |
| ---------- | ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `limit`    | Limits the query result                          | number                                                                                                                                                                                   |
| `skip`     | Skips number of data rows                        | number                                                                                                                                                                                   |
| `relation` | Determines the relations resolution              | boolean or string relation typed field name array                                                                                                                                        |
| `paginate` | Paginates the query result                       | boolean                                                                                                                                                                                  |
| `schedule` | Includes the scheduled bucket data to the result | boolean                                                                                                                                                                                  |
| `sort`     | Sorts the query result                           | [MongoDB Sort Aggregation](https://docs.mongodb.com/manual/reference/operator/update/sort/)                                                                                              |
| `filter`   | Filters the query result.                        | Accepts both [MongoDB Aggregation Object](https://docs.mongodb.com/manual/reference/operator/aggregation/match/) or [ACR](https://spicaengine.com/docs/additionals/access-control-rules) |

```typescript

let queryParameters = {
  limit: 5, 
  skip: 10, 
  sort: {_id: -1}, 
  filter: { _age: {$gt: "15"} }, 
  relation: true, 
  paginate: true, 
  schedule: true, 
}

```


You can see short explanations and examples for every query parameter below;

The example below will return 5 entries
> GET: `<YOUR-API>/data?limit=5`

The example below  will skip 10 entries
> GET: `<YOUR-API>/data?skip=10` 

Example below  will order by id DESC
> GET: `<YOUR-API>/data?sort={_id: -1}`

Example below  will order by id DESC, skip 20 entries and get 5 next entries from the bucket
> GET: `<YOUR-API>/data?skip=20&limit=5&sort={_id: -1}`

The example below  will resolve every relation field in the root object
> GET: `<YOUR-API>/data?relation=true`

The example below  will resolve only the user field in the root object
> GET: `<YOUR-API>/data?relation=user`

The example below  will resolve user and wallet in the user object, also will resolve bank in the root object
> GET: `<YOUR-API>/data?relation=user.wallet&relation=bank`

Example below  will return total entries count with all entries
> GET: `<YOUR-API>/data?paginate=true`

The example below  will return only scheduled entries
> GET: `<YOUR-API>/data?schedule=true`
