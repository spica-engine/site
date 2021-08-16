# Making authentication flow in Spica

## Preparing Buckets

There is already an Identity and Access management module in Spica Engine. You can make a register/login flow by using the Identity module easily and securely. But if you are making an application like a social network or chat application, your users are content for your project. This is the scenario we'll follow in this guide.

So as the first step we create a bucket with the following settings:

- Bucket Name: `Users`
- Bucket Description: `All users will be displayed in this bucket`
- Bucket Fields
 - Firstname: string
 - Lastname: string
 - Identity_id: string | primary field // This is very important because we'll link the bucket entry to identity in the further steps. That's why we set this field as the primary field

The primary field doesn't need to be unique, it just means that this field will be visible in the list view. You can add any field you would like to store such as avatar_image, age, or location. The important note, we don't need to add email to Bucket as a field because we'll use users' email as their unique Identifiers.

Once you create your user bucket, you'll create a function that will link the identity with the bucket entry.

## Preparing an APIKEY

To use Spica endpoints, you will need to use an APIKEY in your function. To create an APIKEY, please navigate to Access Management -> API Keys section and create a new API key. After you create an API key please attach "Bucket Full Access" and "Identity Full Access" policies to your newly created API key. After these steps, please take your API key and save it somewhere.

## Preparing Functions

As the second step, you need to create a function that will handle login and registration logic. We suggest you write the code below as a new function in your Spica instance.

```typescript
import * as Bucket from "@spica-devkit/bucket";
import * as Identity from "@spica-devkit/identity";

Bucket.initialize({ apikey: "THIS IS YOUR APIKEY" }); // The API key you created one step before
Identity.initialize({ apikey: "THIS IS YOUR APIKEY" }); // The API key you created one step before

const usersBucketId = "THIS IS YOUR USERS BUCKET ID"; // Please copy and paste your users bucket ID here. You can see the Bucket ID under the Bucket name.

export async function Register(req, res) {

    // You can remove the line below
    req.body = {identifier: "test@gmail.com", password: "abcde", firstname: "Lorem", lastname: "Ipsum"};
    //

    const { identifier, password, firstname, lastname } = req.body;

    if (identifier && password) {
        let identity = await Identity.insert({
            identifier,
            password,
            policies: []
        });

        if (identity) {
            let user = await Bucket.data.insert(usersBucketId, {
                firstname: firstname,
                lastname: lastname,
                identity_id: identity._id
            });
            return res.status(200).send({ message: "Registration completed"});
        } else {
            return res.status(400).send({ message: identity.message });
        }
    }
    return res.status(400).send({ message: "Invalid email or password provided" });
}
```

After you are finished with your code, you can create a trigger to run this function. The function above has been designed to work with HTTP Post trigger. Now, we create a trigger with the settings below:

 - Handler: Register
 - Type: HTTP
 - Method: Post
 - Path: /register

## Importing Libraries

After you set up your trigger, we can create the function by pushing the "Save" button. If you are using dependencies, you need to install dependencies to your function. In the example above we use `@spica-devkit/bucket` and `@spica-devkit/identity`, so you can install both dependencies to your function. You will see the dependency section next to the triggers section. 


## Client Application

You can use any framework/language for the frontend development but we used angular for our example project. You can see angular code below:

```typescript
export class AppComponent {

  apiURL: string = "https://YOUR-SPICA-PROJECT-NAME.hq.spicaengine.com/api";
  authIdentityId: string;

  constructor(private http: HttpClient) {
    this.isAuth = new BehaviorSubject(false);
  }

  login(email: string, pw: string): Observable<any> {
    return this.http.get(
      `${this.apiURL}/passport/identify?password=${pw}&identifier=${email}`
    );
  }

  register(email: string, pw: string, firstname: string, lastname: string) {
    return this.http.post(`${this.apiURL}/fn-execute/register`, {identifier: email, password: pw, firstname: firstname, lastname: lastname});
  }
}
```

When you use the register function, your client project will send a post request to the function we prepared in Spica. When you get a response from the post request, you can simply use the login function and make your user authenticated. When your user has been authenticated, it means you can make requests to other buckets.

## Testing The App

Now you can build your application and test login/register functions. When you run the register function in your client application, you will see a new user will be added as an identity and as an entry to the bucket as well. After running the login function, you will get a JWT token as a response. It will be good to store the JWT in local storage so you can use it for later HTTP requests.

