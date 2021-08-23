# Bucket Module Types

Example: 

```json
{
  "title": "Docs",
  "description": "Bucket of Doc items",
  "icon": "view_stream",
  "primary": "title",
  "readOnly": false,
  "history": true,
  "properties": {
    "title": {
      "type": "string",
      "title": "title",
      "description": "Title of the row",
      "options": { "position": "left" }
    },
    "content": {
      "type": "textarea",
      "title": "content",
      "description": "Description of the content input",
      "options": { "position": "bottom" }
    },
    "created_at": {
      "type": "date",
      "title": "created_at",
      "description": "Description of the created_at input",
      "options": { "position": "bottom" },
      "default": ":created_at"
    }
  },
  "acl": { "write": "true==true", "read": "true==true" },
  "order": 9,
  "_id": "611e564deee0d9002d44b82e"
}

```

## Bucket

| Property      | Description                                                                                          | Required | Type                                                                                                                                                                                                   |
| ------------- | ---------------------------------------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `_id`         | Bucket ID                                                                                            | Yes      | String                                                                                                                                                                                                 |
| `title`       | Title of the Bucket                                                                                  | Yes      | `string`                                                                                                                                                                                               |
| `description` | Description of the Bucket                                                                            | Yes      | `string`                                                                                                                                                                                               |
| `history`     | When enabled, the history of the data inside this bucket will be kept.                               | Yes      | `boolean`                                                                                                                                                                                              |
| `icon`        | The icon will be shown on the Spica Client                                                           | Yes      | `string`                                                                                                                                                                                               |
| `primary`     | Primary field of the bucket                                                                          | Yes      | `string`                                                                                                                                                                                               |
| `readonly`    | If you mark this bucket as read only, no one will be able to edit or change any data in this bucket. | No       | `boolean`                                                                                                                                                                                              |
| `required`    | Array of required bucket property name                                                               | No       | `Array<string>`                                                                                                                                                                                        |
| `acl`         | Access Control Rules for the bucket                                                                  | No       | `{"read": ` [AccessControlRules](https://spicaengine.com/docs/additionals/access-control-rules) `, {"write": `[AccessControlRules](https://spicaengine.com/docs/additionals/access-control-rules) `}}` |

## BucketProperty

| Property       | Description                                                                                                    | Related Type         | Required | Type                                   |
| -------------- | -------------------------------------------------------------------------------------------------------------- | -------------------- | -------- | -------------------------------------- |
| `title`        | The title of the bucket property.                                                                              | All                  | Yes      | `string`                               |
| `description`  | The description of the bucket property.                                                                        | All                  | No       | `string`                               |
| `type`         | The type of the bucket property.                                                                               | All                  | Yes      | `string`                               |
| `default`      | The default value of the bucket property.                                                                      | All                  | No       | Same type of the property              |
| `options`      | The list of options for the bucket property.                                                                   | All                  | Yes      | `PropertyOption                        |
| `readOnly`     | The read only flag for the bucket property.                                                                    | All                  | No       | `boolean`                              |
| `enum`         | The list of possible values for the bucket property.                                                           | `string` \| `number` | No       | Array of the same type of the property |
| `pattern`      | The regular expression for the bucket property.                                                                | `string`             | No       | `string`                               |
| `relationType` | The type of the relation.                                                                                      | `relation`           | Yes      | `"onetomany"` \| `"onetoone"`          |
| `dependent`    | When checked, after a document deleted from this bucket, system will delete related document(s) automatically. | `relation`           | No       | `boolean`                              |
| `locationType` | The type of the location.                                                                                      | `location`           | Yes      | `"Point"`                              |
| `items`        | Stores the proprties of the array type field                                                                   | `array`              | Yes      | `BucketProperty`                       |
| `maxItems`     | The maximum number of items allowed in the array type field.                                                   | `array`              | No       | `number`                               |
| `minItems`     | The minimum number of items allowed in the array type field.                                                   | `array`              | No       | `number`                               |
| `properties`   | Stores the properties of the object type field                                                                 | `object`             | Yes      | `BucketProperty`                       |

## PropertyOption

| Property    | Description                                                        | Type                          | Required |
| ----------- | ------------------------------------------------------------------ | ----------------------------- | -------- |
| `position`  | The position of the related property.                              | `left` \| `right` \| `bottom` | Yes      |
| `translate` | The translation flag of the bucket property.                       | `boolean`                     | No       |
| `history`   | The history flag of the bucket property.                           | `boolean`                     | No       |
| `unique`    | If true, each document will have a different value for this field. | `boolean`                     | No       |

