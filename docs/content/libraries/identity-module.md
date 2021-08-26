# @spica-devkit/identity

## Table of contents

## Initialize

> Identity module imported from `@spica-devkit/identity`.

##### Initializing Identity Module

To initialize an identity, simply use the `initialize` function exported from the `@spica-devkit/identity` module. Specify the authorization (APIKEY or IDENTITY and optional API URL. 

```typescript
import * as Identity from "@spica-devkit/identity";

// Your API will serve under your spica instance url + "/api"
// Example API url example.hq.spicaengine.com/api
Identity.initialize({apikey: "<APIKEY>", publicUrl: "<YOUR API URL>"}); 
OR
Identity.initialize({identity: "<USER TOKEN>", publicUrl: "<YOUR API URL>"}); 
```

## Login Endpoint

Login endpoint will check the given identity and password as parameters. If there is a matched identity with the given parameters, the login endpoint will return a newly created JWT. You can also set JWT expire date in the login endpoint. You can see the example code below;

```typescript
import * as Identity from "@spica-devkit/identity";
export default async function() {
  Identity.initialize({identity: "<USER TOKEN>", publicUrl: "<YOUR API URL>"});
  // Identity.login("<USER IDENTIFIER>","<USER PASSWORD>","<EXPIRATION IN SECONDS>")
  let JWT = await Identity.login("user1","123password$!","3600")
  console.log(JWT);
}
```

## Verify Token

Verify token is a special kind of method. If you use `Identity.initialize()`, `verifyToken` verifies the token on the initialized API, otherwise the second argument `baseUrl` is mandatory. It will check the given JWT and return the identity of the JWT.

```typescript
import * as Identity from "@spica-devkit/identity";
export default async function() {
  const tokenPayload = await Identity.verifyToken(<JWT_TOKEN>, "<API_URL>");
  console.log(tokenPayload);
}
```

### Operations

Here are some fundamental examples;

## Get

```typescript
import * as Identity from "@spica-devkit/identity";

export default function(req, res) {
  Identity.initialize({identity: "<USER TOKEN>"});
  return Identity.get("<IDENTITY ID>");
}
```

## Get All

```typescript
import * as Identity from "@spica-devkit/identity";

export default function(req, res) {
  Identity.initialize({identity: "<USER TOKEN>"});
  // Identity.getAll(<QUERY PARAMS>);
  return Identity.getAll();
}
```

## Insert

```typescript
import * as Identity from "@spica-devkit/identity";

export default function(req, res) {
  Identity.initialize({identity: "<USER TOKEN>"});

  let newIdentity = {
    identifier: "user1",
    password: "123password$!",
    policies: ["BucketFullAccess","IdentityFullAccess"],
    attributes: {
      age: 15,
      address: "user address",
      ...
    }
  };
  
  // Identity.insert(<IDENTITY OBJECT>);
  return Identity.insert(newIdentity);
}
```

## Update

```typescript
import * as Identity from "@spica-devkit/identity";

export default function(req, res) {
  Identity.initialize({identity: "<USER TOKEN>"});

  let updatedIdentity = {
    identifier: "user2",
    password: "123pass$!",
    policies: ["BucketFullAccess"],
    attributes: {
      age: 15,
      address: "user address",
      ...
    }
  };

  // Identity.update("<IDENTITY ID>", <IDENTITY OBJECT>);
  return Identity.update("5f10302b4d858d1824e57e6d", updatedIdentity);
}
```

## Delete

```typescript
import * as Identity from "@spica-devkit/identity";

export default function(req, res) {
  Identity.initialize({identity: "<USER TOKEN>"});

  // Identity.remove("<IDENTITY ID>");
  return Identity.remove("5f10302b4d858d1824e57e6d");
}
```

## Attach Policy

```typescript
import * as Identity from "@spica-devkit/identity";

export default function(req, res) {
  Identity.initialize({identity: "<USER TOKEN>"});

  //Identity.attach("<IDENTITY ID>", "<POLICY ID ARRAY>");
  return Identity.attach("5f10302b4d858d1824e57e6d", ["8feed1254687771ed4e5811a", "BucketFullAccess"]);
}
```

## Detach Policy

```typescript
import * as Identity from "@spica-devkit/identity";

export default function(req, res) {
  Identity.initialize({identity: "<USER TOKEN>"});

  //Identity.detach("<IDENTITY ID>", "<POLICY ID ARRAY>");
  return Identity.detach("5f10302b4d858d1824e57e6d", ["8feed1254687771ed4e5811a", "BucketFullAccess"]);
}
```