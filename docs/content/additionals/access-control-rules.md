
# Access Control Rules

Access Control Rules (ACR) give you a chance to add another security level before accessing bucket APIs. ACR system is working with integrated `Passport System` and can access `Identity` information. For the business domain accounts, we recommend you create a bucket that will include all the application users' information. You can link your bucket entry with a unique identifier in the Passport module. The Passport module will pass both `auth._id` and `auth.identifier` to the ACR engine. You can apply different rules for writing and reading API calls. Writing ACR will be applied to every `UPDATE`, `INSERT`, `DELETE`, `PATCH` endpoints while reading ACR will be applied to every `INDEX`, `GET` endpoints. You can access bucket entries using the `document` variable. 

>Note: ACR engine will affect bucket view as well since the bucket views are consuming the same APIs.

Example Bucket Schema:
- identifier: string
- name: string
- address: location
- age: number

Example:
- Writing: (`auth.identifier` == `document.identifier`) && (`document.age` > 18)
- Reading: `true` == `true`

In the example above, we force the request to have the same identity with the bucket entry identity and bucket entry age to be more than 18 for writing API calls. This means every user has writing access for itself. But for reading API calls, we allow every request to get the data in the bucket.

All accepted operators are listed below: 
- Comparing: `<`, `<=`, `>=`, `>`, `==`, `!=`
  - Example: `document.age` >= 18
- Math Operators: `*`, `+`, `-`, `/`, `%`
  - Example: `document.age` >= `document.allowed_age` - 20

## Macros
  ### Structure Operations:

| Macro               | Description                                        | Example                                                                   |
| ------------------- | -------------------------------------------------- | ------------------------------------------------------------------------- |
| `has(propertyName)` | Returns true if the document has the property name | `document.age` >= 18 && has(`document.access`) && !has(`document.banned`) |

  ### Array Operations:

| Macro                                             | Description                                                     | Example                                                                                                         |
| ------------------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `equal(fieldPath: Array, comparingValues: Array)` | Returns true if the value equals to sum of all comparing values | `equal(document.tag, ['herbal', 'animal', 'milk'])` => If `document.tag` is equal to ['herbal','animal','milk'] |
| `every(fieldPath: Array, comparingValues: Array)` | Returns true if the value includes every comparing values       | `every(document.tag, ['herbal', 'animal'])`: If `document.tag` includes 'herbal' and 'animal'                   |
| `some(fieldPath: Array, comparingValues: Array)`  | Returns true if the value includes any of comparing values      | `some(document.tag, ['herbal', 'animal'])`: If `document.tag` includes at least one of 'herbal' and 'animal'    |

### String Operations


| Macro                                                                | Description                                                   | Example                                                                                                     |
| -------------------------------------------------------------------- | ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `regex(fieldPath: string, regular_expression: string, flag: string)` | Returns true if the value matches with the regular expression | `regex(document.title,'CEO','i')`: Returns true if `document.title` is equal to 'ceo' with insensitive flag |

### Date Operations

| Macro                       | Description                            | Example                                                                                                    |
| --------------------------- | -------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `unixTime(fieldPath: Date)` | Returns unix timestamp of the value    | `now() - unixTime(document.created_at) > 3600`: Returns true if one hour passed than `document.created_at` |
| `now()`                     | Returns current time as unix timestamp | `now() - unixTime(document.created_at) > 3600`: Returns true if one hour passed than `document.created_at` |