# MDT-AssetManager
The back-end API and services to manage the companies physical assets deployed out to the field.

Each asset record can be identified using a unique 12 byte binary BSON type id.

* `GET /assets` allows admin, editor, reader accesslevel get all the asset records that exists in the database. 
  * Users can filter the records based on the assetName and assetType.
  * The assets can be ordered ascending and descending
* `POST /assets`  allows admin accesslevel to create a single asset record, duplicate assets for the same type and name are not allowed.
* `PUT /asset/{asset_id}` allows admin, editor accesslevels to update an existing asset record.
* `GET /asset/{asset_id}` allows admin, editor, reader accesslevel to retrieve a single asset record.
* `DELETE /asset/{asset_id}` allows admin, editor accesslevel to delete a single asset record.
* `/status` route gives the status of the service and its uptime


## Security
This service uses JWT security tokens, Use the website https://jwt.io/ to decode or generate a token. The secret you need to use will be defined as `jwt_api_token` in config file(This will differ depending on the environment)

MDT-AssetManager expects to receive the generated JWT token from Client (Through whatever authentication service they use) which should use the same jwt_api_token as we have in our config to encrypt the token.

example of a JWT payload:

```json
{
  "iss": "MDT-Manager",
  "role": "editor"
}
```

Only required filed on the paylod is the `role`, and valid values are: `admin`, `editor`, `reader`
JWT examples to be used for testing for each role:

`admin`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4ifQ.d7kGs5jRkxyzyq7JoQOicv-L4ffbHdE8tlyrdS1652s`
`editor`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiZWRpdG9yIn0.x6VVkGG1_5yuKpJs6Fw0PXo4MUSqYMDbnrGy2ip708k`
`reader`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoicmVhZGVyIn0.tYz76BhdhC1mUtqwu62O5nqQFccjemDlasvuhw3TbCg`

Once our `JWTSecurityHelper` receives the JWT token, it uses the api_key defined in the config to decrypt the token and looks for the `role` property on it, and it will look through the `PermissionRoles` collection to find the list of accesses, and based on that each route will allow the user to use that specific route.

# Improvments

#### Authorization
We doing a simple authorization implementation, we need to use an authorization service with Oauth2 standard to save the user details and based on the role of the user to generate a jwt token to the service, this service should be able to create token and refresh token for longer authorizations

#### Logging
* Need to add logging support

#### CI Setup
We only have an empty CI file which needs to be replaced with correct config depending on the CI service we use

#### Docker and Compose
Currently we only have templates in place, which need to be repalced with real settings

#### Error handling
We are doing a very simple error handling for this implementation, we can create error handling helper middlewares to handle the error in any format that we need and will usually contain some sort of an error code and message.

#### Private Methods
There are some private methods that can be moved into helper, handler folder to be reused, at the moment they are specific to that service, so ther eis a little benefit in moving them now.

#### Test cases
Currently there are only success unit test and end point test cases, we need to add more validation tests.

##### What factors lead you to decide between GraphQL or REST?

Since the service has simple CRUD operations, the complexity of using GraphQL and its types, resolvers and quires are not justified.

##### Describe how you tested the API and service, how would this be different if the service was hosted in the cloud?

The service has Unit tests and End point tests to validate the funcionalities have been implemented as expected. A Continues Integration step needs to be added for the cloud deploys. 

##### How would you go about securing the API?

A simple oAuth flow with authorization server for validating the user access.

##### What factors would you need to consider to host this API/service in the cloud?

Choice of database and its connection, the required 3rd party services(if/when needed), CI setup, docker setting.

##### Describe the process of how you would deploy this to the cloud.

For the purpose to illustration I Created an app service on azure

Used the azure app service deployment service to connect the app service to github

Setup atrigger on master branch to deploy on each commit.

But in Production environment, We would have Create the dockerfile, build the image And deploy it to kubernetese.
