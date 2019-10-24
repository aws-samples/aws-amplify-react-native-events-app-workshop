# AWS Amplify

AWS Amplify provides a declarative and easy-to-use interface across different categories of cloud operations. AWS Amplify goes well with any JavaScript based frontend workflow, and React Native for mobile developers.

## Table of Contents:

- [Initialise a development project](#initialise-a-development-project)
- [Add Authentication via AWS Amplify CLI](#add-authentication-via-aws-amplify-cli)
- [Update Auth to include Cognito Trigger](#update-auth-to-include-cognito-trigger)

## Initialise a development project

We have prepared a sample app for you in this exercise. Simple `git clone` the repo `https://github.com/aws-samples/aws-amplify-react-native-events-app-workshop` into another folder and copy the content to your `rn` folder on the following commands:

```
cd /code
git clone https://github.com/aws-samples/aws-amplify-react-native-events-app-workshop app
mv app/sample/* .
rm -Rf app/
```

Run this command inside the react-native docker environment.

**IMPORTANT**: Ensure you are in the `/code` directory.

```
amplify init
```

Follow the commands in the following, take note that the `project's sourced directory` is `.`

```
Scanning for plugins...
Plugin scan successful
Note: It is recommended to run this command from the root of your app directory
? Enter a name for the project eventapp
? Enter a name for the environment dev
? Choose your default editor: Visual Studio Code
? Choose the type of app that you're building javascript
Please tell us about your project
? What javascript framework are you using react-native
? Source Directory Path:  /
? Distribution Directory Path: /
? Build Command:  npm run-script build
? Start Command: npm run-script start
Using default provider  awscloudformation

For more information on AWS Profiles, see:
https://docs.aws.amazon.com/cli/latest/userguide/cli-multiple-profiles.html

Using default provider  awscloudformation
AWS access credentials can not be found.
? Setup new user Yes
Follow these steps to set up access to your AWS account:

Sign in to your AWS administrator account:
https://console.aws.amazon.com/
Press Enter to continue

Specify the AWS Region
? region:  ap-southeast-1
Specify the username of the new IAM user:
? user name:  amplify-<YOUR NAME>-user
Complete the user creation using the AWS console
https://console.aws.amazon.com/iam/home?region=undefined#/users$new?step=final&accessKey&userNames=amplify-user&permissionType=policies&policies=arn:aws:iam::aws:policy%2FAdministratorAccess
Press Enter to continue

Enter the access key of the newly created user:
? accessKeyId:  XXXXXX**********
? secretAccessKey:  XXXXXXXXXXX********************
This would update/create the AWS Profile in your local machine
? Profile Name:  <YOUR NAME>

Successfully set up the new user.

For more information on AWS Profiles, see:
https://docs.aws.amazon.com/cli/latest/userguide/cli-multiple-profiles.html

? Do you want to use an AWS profile? Yes
? Please choose the profile you want to use. default
```

Then you should see a bunch of `CREATE_IN_PROGRESS` commands running at the background for you. These are cloudformation templates that are automatically generated via the `init` command.

You should see this output:

```
✔ Successfully created initial AWS cloud resources for deployments.
✔ Initialized provider successfully.
Initialized your environment successfully.

Your project has been successfully initialized and connected to the cloud!

Some next steps:
"amplify status" will show you what you've added already and if it's locally configured or deployed
"amplify <category> add" will allow you to add features like user login or a backend API
"amplify push" will build all your local backend resources and provision it in the cloud
"amplify publish" will build all your local backend and frontend resources (if you have hosting category added) and provision it in the cloud

Pro tip:
Try "amplify add api" to create a backend API and then "amplify publish" to deploy everything
```

## Add Authentication via AWS Amplify CLI

We need a way to authenticate the users of our app. We will use Amazon Cognito as our user directory. Setting it up is as simple as running the command below inside the react-native docker environment.

```
amplify auth add
```

You should see:

```
Using service: Cognito, provided by: awscloudformation
 The current configured provider is Amazon Cognito.
 Do you want to use the default authentication and security configuration?
❯ Default configuration
  Default configuration with Social Provider (Federation)
  Manual configuration
  I want to learn more.
```

You can choose to setup your own configuration. At this point, let's choose the default configuration. Press `Enter`

```
 Warning: you will not be able to edit these selections.
 How do you want users to be able to sign in when using your Cognito User Pool? (Use arrow keys)
❯ Username
  Email
  Phone Number
  Email and Phone Number
  I want to learn more.
```

Select `Username` and press `Enter` to continue.

```
 Do you want to configure advanced settings? (Use arrow keys)
  No, I am done.
❯ Yes, I want to make some additional changes.
```

Select `Yes, I want to make some additional changes` to have a few adjustments to your authentication process.

```
 Warning: you will not be able to edit these selections.
 What attributes are required for signing up? (Press <space> to select, <a> to toggle all, <i> to invert selection)
❯◯ Address (This attribute is not supported by Facebook, Google, Login With Amazon.)
 ◯ Birthdate (This attribute is not supported by Login With Amazon.)
 ◉ Email
 ◯ Family Name (This attribute is not supported by Login With Amazon.)
 ◯ Middle Name (This attribute is not supported by Google, Login With Amazon.)
 ◯ Gender (This attribute is not supported by Login With Amazon.)
 ◯ Locale (This attribute is not supported by Facebook, Google.)
(Move up and down to reveal more choices)
```

Select `Email` as the required attributes. Press `Enter` and now, you should see:

```
 Do you want to enable any of the following capabilities? (Press <space> to select, <a> to toggle all, <i> to invert selection)
❯◯ Add Google reCaptcha Challenge
 ◯ Email Verification Link with Redirect
 ◯ Add User to Group
 ◯ Email Domain Filtering (blacklist)
 ◯ Email Domain Filtering (whitelist)
 ◯ Custom Auth Challenge Flow (basic scaffolding - not for production)
 ◯ Override ID Token Claims
```

For now, we are not going to add any **capabilities** yet. Press `ENTER` to proceed.

```
Successfully added resource eventappbd3a9abe locally

Some next steps:
"amplify push" will build all your local backend resources and provision it in the cloud
"amplify publish" will build all your local backend and frontend resources (if you have hosting category added) and provision it in the cloud
```

Some next steps:
`amplify push` will build all your local backend resources and provision it in the cloud
`amplify publish` will build all your local backend and frontend resources (if you have hosting category added) and provision it in the cloud

[**OPTIONAL**] At this point, you can choose to re-configure your `Auth` again by entering the following command:

```
amplify auth update
```

We will now push the settings to your AWS account. This will create a Cognito User Pool automatically for you via CloudFormation.

Run this command inside the react-native docker environment:

```
amplify push
```

At this point, you can see a table that shows the overall changes that are going to be made:

```
| Category | Resource name   | Operation | Provider plugin   |
| -------- | --------------- | --------- | ----------------- |
| Auth     | cognito80421876 | Create    | awscloudformation |

? Are you sure you want to continue? (Y/n)
```

Press `Y` and `Enter` to confirm. This will take a few minutes to run. Once done, you should see the following:

```
✔ All resources are updated in the cloud
```

## Update Auth to include Cognito Trigger

Let's say now you want to run a `function` to process a particular business logic. You can later add the Cognito Trigger via AWS Amplify via the command below:

```
amplify auth update
```

Let's have the entire configuration walkthrough again:

```
Please note that certain attributes may not be overwritten if you choose to use defaults settings.
Using service: Cognito, provided by: awscloudformation
 What do you want to do?
  Apply default configuration with Social Provider (Federation)
❯ Walkthrough all the auth configurations
```

```
 Select the authentication/authorization services that you want to use: (Use arrow keys)
❯ User Sign-Up, Sign-In, connected with AWS IAM controls (Enables per-user Storage features for images or other content, Analytics, and
 more)
  User Sign-Up & Sign-In only (Best used with a cloud API only)
  I want to learn more.
```

For now, let's select `no` to not allow unauthenticated access to the services.

```
 Allow unauthenticated logins? (Provides scoped down permissions that you can control via AWS IAM)
  Yes
❯ No
  I want to learn more.
```

Select `No` as we are not going to setup any third party authentication providers such as Google or Facebook.

```
 Do you want to enable 3rd party authentication providers in your identity pool?
  Yes
❯ No
  I want to learn more.
```

Select `OFF`

```
 Multifactor authentication (MFA) user login options: (Use arrow keys)
❯ OFF
  - ON (Required for all logins, can not be enabled later) (Disabled)
  OPTIONAL (Individual users can use MFA)
  I want to learn more.
```

Select `enable` to have the user registration and forgot password capability

```
 Email based user registration/forgot password: (Use arrow keys)
❯ Enabled (Requires per-user email entry at registration)
  Disabled (Uses SMS/TOTP as an alternative)
```

```
 Please specify an email verification subject: (Your verification code)
```

```
 Please specify an email verification message: (Your verification code is {####})
```

```
 Do you want to override the default password policy for this User Pool? (y/N)
```

```
 Specify the app's refresh token expiration period (in days): (30)
```

Enter `Y` to specify what are the user attributes the app is going to need.

```
 Do you want to specify the user attributes this app can read and write? (y/N)
```

Move up and down by pressing the up and down arrow key. And press `SPACEBAR` to select the follow attributes: `Email`, `Family Name`, `Given Name` and `Phone Number`. We are going to need these attributes for the account screen.

```
 Specify read attributes: (Press <space> to select, <a> to toggle all, <i> to invert selection)
 ◯ Birthdate
 ◉ Email
 ◉ Family Name
❯◯ Middle Name
 ◯ Gender
 ◯ Locale
 ◉ Given Name
 ◯ Name
 ❯◯ Nickname
 ◉ Phone Number
(Move up and down to reveal more choices)
```

```
 Specify write attributes: (Press <space> to select, <a> to toggle all, <i> to invert selection)
 --- You have already selected the following attributes as required for this User Pool.  They are writeable by default: Email   ---
 ◯ Birthdate
 ◉ Family Name
 ◯ Middle Name
❯◯ Gender
 ◯ Locale
 ◉ Given Name
 ◯ Name
 ❯◯ Nickname
 ◉ Phone Number
 ◯ Preferred Username
 ◯ Picture
 (Move up and down to reveal more choices)
```

```
 Do you want to enable any of the following capabilities?
 ◯ Add Google reCaptcha Challenge
 ◯ Email Verification Link with Redirect
❯◉ Add User to Group
 ◯ Email Domain Filtering (blacklist)
 ◯ Email Domain Filtering (whitelist)
 ◯ Custom Auth Challenge Flow (basic scaffolding - not for production)
 ◯ Override ID Token Claims
```

```
 Do you want to use an OAuth flow?
  Yes
❯ No
  I want to learn more.
```

Select `Y`

```
? Do you want to configure Lambda Triggers for Cognito? (Y/n)
```

Select `Post Confirmation` as we are going to add users to another Cognito Group as administrators.

```
? Which triggers do you want to enable for Cognito (Press <space> to select, <a> to toggle all, <i> to invert selection)
 ◯ Learn More
 ──────────────
 ◯ Create Auth Challenge
❯◯ Custom Message
 ◯ Define Auth Challenge
 ◯ Post Authentication
 ◉ Post Confirmation
(Move up and down to reveal more choices)
```

```
? What functionality do you want to use for Post Confirmation (Press <space> to select, <a> to toggle all, <i> to invert selection)
 ◯ Learn More
 ──────────────
❯◉ Add User To Group
 ◯ Create your own module
```

Enter `admin` as name of your Cognito User Group.

```
? Enter the name of the group to which users will be added. admin
```

Now you should have added a new function, you should see a confirmation below:

```
Succesfully added the Lambda function locally
```

Now, let's edit your function. Enter `Y`

```
? Do you want to edit your add-to-group function now? (Y/n)
```

Now it should open up your js file directly. If not, you can go to file directly and the path should look something like this: _amplify > backend > function > eventappXXXXXXPostConfirmation > src > add-to-group.js_

Once you are there, paste the following code to add anyone with gmail to be included in this cognito group (of course, you can tweak the code below to your likings):

```
/* eslint-disable-line */ const aws = require('aws-sdk');

exports.handler = async (event, context, callback) => {
  const request = event.request;
  const userAttributes = request.userAttributes;

  if (userAttributes.email.indexOf('@gmail.') !== -1) {
    const cognitoidentityserviceprovider = new aws.CognitoIdentityServiceProvider(
      { apiVersion: '2016-04-18' }
    );
    const groupParams = {
      GroupName: process.env.GROUP,
      UserPoolId: event.userPoolId
    };

    const addUserParams = {
      GroupName: process.env.GROUP,
      UserPoolId: event.userPoolId,
      Username: event.userName
    };

    try {
      await cognitoidentityserviceprovider.getGroup(groupParams).promise();
    } catch (e) {
      await cognitoidentityserviceprovider.createGroup(groupParams).promise();
    }

    try {
      await cognitoidentityserviceprovider
        .adminAddUserToGroup(addUserParams)
        .promise();
    } catch (e) {
      callback(e);
    }
  }

  callback(null, event);
};

```

Once done, remember to save your code and go back to the terminal to continue where you left off. Press `ENTER` to continue.

```
? Press enter to continue
```

You should then see a successfully confirmation

```
Successfully updated resource eventappbd3a9abe locally

Some next steps:
"amplify push" will build all your local backend resources and provision it in the cloud
"amplify publish" will build all your local backend and frontend resources (if you have hosting category added) and provision it in the cloud
```

You can repeat the same commnd `amplify status` to see what has changed and `amplify push` to push your changes to the AWS automagically. You can proceed to the next [lab](../appsync/README.md) and work on the AppSync configuration via AWS Amplify CLI.
