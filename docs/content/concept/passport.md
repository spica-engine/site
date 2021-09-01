# Passport

Spica supports built-in authentication and authorization on Spica Client and API called as `Passport Module`. Out of the box, Spica supports two different authentication strategies. This document will explain the fundamentals of those strategies.

## Table of contents

## Statements

The smallest rule setting in the passport module is the statement. Each statement is responsible for one functionality. As an example; allowing read functionality in a bucket system is a statement. Also, you can define specific resources to limit account abilities. Statements settings are listed below;

`Module`: All available modules that statement can affect. You can select module from the select box.

`Action`: Each module has its actions. For example bucket module has 5 options which are “index”, ”show”, ”delete”, ”update” and ”create”.

`Resource`: This is the only optional setting for statements. For some of the services, you can define specific resources. So the statement will be applied for that particular resource.

## Identities

An identity means an account in the Spica domain. Each identity has its policies and metadata. It contains **identifier** and **password** informations for authorization. You can attach a policy to identity and detach it at any time. You can see all attachable policies under the identity policies tab.

> Right after the installation, Spica creates a default identity to get you started. We suggest you change at least its password before going live.

To create an Identitiy, navigate to **Access Management** -> **Identities** in the left-hand menu.

- Click the "+" icon on the top right toolbar.
- Fill the **Identifier** and **Password** field.
- Press **Save**

### Adding Additional Properties

If you want to store additional information on **Identities**, you can create custom fields. To create a custom field on Identities, navigate to **Access Management** -> **Settings** in the left-hand menu.

## API Key

Instead of Identity, the API key allows machine-to-machine communication. The token, it provides doesn't have an expiration date so it can be used as long as it is not intentionally deleted from Spica.

To create an API Key, navigate to **Access Management** -> **API Keys** in the left-hand menu.

- Click the "+" icon on the top right toolbar.
- Fill the **name** and **description** field.
- Press **Save**

Once the saving is completed, you can use the **API Key** value on your API calls in the header section.

> For more information about how to use API Key, please refer to the API Documentations.

## Strategies

Our passport module supports SSO and OAuth strategies as well. You will find these Access Management screen on the “Strategies” page. Once you set up your strategy, the login button will be visible on the login page. You can use both normal login and strategy login at the same time.

## Policies

Policies are a multi-purpose designed rule management structure. To create a rule in the passport module, you can create a policy and assign it to to your **Identities** and **API Keys** to encapsulate and control their capabilities. Also to have a role-based account management system, you can use policies. A policy can include multiple statements.

> NOTE: To create role-based account management, you should assign multiple statements to policies. For example; the “Content Editor” policy should have all bucket statements and storage statements.

### Using the Policies

Spica comes with various built-in Policies to meet your needs on encapsulation, so you don't have to create each of them individually.

To attach Policies, enter either **Identity Edit Page** or **API Key Edit Page**. At the bottom, you will see the `Owned Policies` section.

To attach the policy, click the `link` button. To detach click on the `unlink` button.

![Example Policies](assets/images/docs/passport/policies.png)

### Creating a Custom Policy

It is possible to create your own Custom Policy by clicking on the `+` button on the Policies page to create from scratch or clone a Policy and start to work where it left off by clicking the `copy` button on the Policies page next to each policy.

Here you can enter your Policy's `Name` and `Description`.

Click on the `Add Statement` button to add a new statement. You'll see a new statement added to the list on that page. You'll see a new form to fill. Let's dig in.

![Example Custom Policy](assets/images/docs/passport/custom_policies.png)

`Module`: Select the module of the Statement.

`Actions`: After selecting the module, this section will show up. You'll see a list of actions on the selected module such as `Create`, `Index`, `Delete` etc. Select one or more actions to add to your Statement.

> `Index` action allows listing documents while `Show` action allows seeing an individual document

`Edit Action`:
Optional. If you want to allow actions on a resource-based, click on the `pen` icon, and enter the \_id of the resource on either to `Included Resources` section or `Excluded Resources` section.
You can add an infinite number of resources to a Statement. Use `*` to include all resources.
All resources are excluded as default, so you should include all resources before excluding resources.
Check the examples below for more detailed usages:

| Included Resources |  Excluded Resources | Module      | Action |   Expected Behavior                                                                |
| ------------------ | ------------------- | ----------- | ------ | ---------------------------------------------------------------------------------- |
| authors, books     | -                   | Bucket      | Delete | Delete **authors** and **books** buckets                                           |
| \*                 | publish             | Function    | Edit   | Edit all functions except the **publish**                                          |
| -                  | admin_key           | API Key     | Show   | Do not show any API Key. **admin_key** is useless unless included resources are \* |
| \*                 | admin_key           | API Key     | Show   | Show all API Keys except the **admin_key**                                         |
| authors/\*         | authors/james       | Bucket Data | Index  | List all authors except the **james**                                              |

## Settings

You can define your identity's data model fully flexibly. Spice requires email, first name, and last name. Also in the “Settings” tab, you add new fields and customize your identity data models.
