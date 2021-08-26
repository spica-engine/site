# User as Content

## Table of contents

## Users Bucket

Some applications have a user login system, some have not. This is why users are managed as content in the Spica environment. Also, you can create relations between your users bucket and other buckets such as wallet .etc. But to apply the second-layer security (entry-level security), HTTP requests should have identity objects as a header parameter. So you should include every security-related object as a custom attribute in your identity object.

## Rules

Rules will be applied to every identity. This means rules don't give access to your administration account if rule conditions return false. Instead of adding every identity to rule separately, it will be easier to add a custom policy to your administration accounts and checking if the authenticated user has your custom policy.

Bad

```javascript
auth.identifier == document.user._id ||
auth.identifier == 'spica' ||
auth.identifier == '<ANY OTHER IDENTITY ID>
```

Good

```javascript
auth.identifier == document.user._id ||
some(auth.policies,["<CUSTOM POLICY ID>"])
```