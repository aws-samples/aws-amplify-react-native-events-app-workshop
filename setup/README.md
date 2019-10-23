# Setup

We will be using React-Native and [Expo](https://expo.io) to develop our mobile app. The React-Native application is pre-created for you (using `create-react-native-app` method). We will be using the Expo client on your mobile device to preview the app as we build it. Expo has two main components - the Expo development server and the mobile client. We will run a React Native and expo development server inside a docker container on [AWS Cloud9](https://aws.amazon.com/cloud9/).

<img src="../img/rn-expo.png" width="800">

## Table of Contents

**Configure Cloud9**

- [Create Cloud9 environment](#create-cloud9-environment)
- [Update Preference](#update-preference)
- [Allocate storage](#allocate-storage)
- [Configure security group](#configure-security-group)

**Configure React Native Docker Environment**

- [Create React Native Docker Environment](#create-react-native-docker-environment)

**Configure Expo**

- [Install Expo mobile client](#install-expo-mobile-client)
- [Create Expo account](#create-expo-account)

# Configure Cloud9

## Create Cloud9 environment

1. Click the link [here](https://ap-southeast-1.console.aws.amazon.com/cloud9/home/product?region=ap-southeast-1) to go to Cloud9 console. Sign in with your credentials if necessary. You need to be in **Singapore** region for this lab.

2. Click on **Create Environment**.
   ![AWS Cloud9 Create Environment](images/aws-cloud9-create.png)

3. Give any appropriate name and description to your environment. Click on **Next**.

4. Choose **M4.large** instance type and click on **Next**.

5. Click on **Create Environment**.

6. While it is being built, you may move on to the next section.

7. After a few minutes, when your environment is up, you should see following screen.
   ![AWS Cloud9](images/aws-cloud9.jpg)

## Update Preference

We are going to create a new IAM user with the required access to the AWS resources. So, we do not need AWS Cloud9 to manage temporary credentials for us.

1. Go to the **Preference** via the top panel
   ![AWS Cloud9 Preference](images/aws-cloud9-preference.png)

2. At Preference, go to **AWS Setting**

3. Disable **AWS managed temporary credentials**
   ![AWS Cloud9 Preference](images/aws-cloud9-preference-credentials.png)

## Allocate storage

Your Cloud9 instance is allocated 8 GB storage by default. We will increase this because we will be installing dependencies.

1. Go to your running instances by clicking [here](https://ap-southeast-1.console.aws.amazon.com/ec2/v2/home?region=ap-southeast-1#Instances:sort=desc:launchTime)

2. Find the instance you have just created by launching a Cloud9 environment. The name will be `aws-cloud9-<your environment name>-<random string>`
   ![AWS EC2 Found](images/aws-ec2-found.jpg)

3. Select the instance. Scroll down at the bottom part. Find the Block devices.
   ![AWS EC2 Block Device](images/aws-ec2-block-devices.jpg)

4. Click onto it. You will see a pop up.
   ![AWS EC2 Select Block Device](images/aws-ec2-block-device-popup.jpg)

5. Right click on it and open in new tab.
   ![AWS Open New Tab](images/aws-open-new-tab.jpg)

6. Click on **Actions**, **Modify Volume**.
   ![AWS EC2 Modify Volume](images/aws-ec2-modify-volume.jpg)

7. Change _8_ to _120_ and click on **Modify**.
   ![AWS EC2 Volume Modified](images/aws-ec2-volume-modified.jpg)

8. Click on **Yes** and wait for the change to finish. It will take a couple of minutes.
   ![AWS EBS Changed](images/aws-ebs-changed.jpg)

9. Go back and select your instance. Reboot that instance to make sure the EBS changes take effect.

## Configure security group

AWS Cloud9 restricts inbound access to the IP addresses it uses to connect to the instance. In addition, we will need to allow traffic on `19000` and `19001`, both of which are used by Expo. The Expo server runs on port `19000` while the npm package manager is exposed on `19001`. Refer to the [Expo docs](https://docs.expo.io/versions/v29.0.0/guides/how-expo-works.html) to learn more.

1. Go back to the tab where you have the EC2 instances.

2. Select the same EC2 instance and select the security group
   ![AWS EC2 Security Group](images/aws-ec2-security-group.jpg)

3. At the Security Group, click on **Inbound**, then Edit.
   ![AWS Security Group](images/aws-security-group.jpg)

4. Click on **Add Rule**
   ![AWS Add Security Group Rule](images/aws-add-security-group-rule.jpg)

5. Key in `19000-19001`, and `0.0.0.0/0`, in respective fields
   ![AWS Add New Rule](images/aws-add-new-rule.jpg)

6. Click on **Save**.
   ![AWS Save New Rule](images/aws-security-group-rule-save.jpg)

7. Double-check that the new inbound rules have been added
   ![AWS Security Group New Rule](images/aws-security-group-new-rule.jpg)

# Create React Native Docker Environment

AWS Cloud9 environment comes pre-installed with Docker.

1. Go back to your Cloud9 environment
   ![AWS Cloud9](images/aws-cloud9.jpg)

2. Let's create a working directory. We have chosen the name as **rn**. Type `mkdir rn` to create the directory. Press **Enter** key.
   ![AWS Cloud9 mkdir rn](images/aws-cloud9-mkdir-rn.jpg)

3. Switch to the newly created directory. Type `cd rn`
   ![AWS Cloud9 RN](images/aws-cloud9-rn.jpg)

4. Create a `Dockerfile` which is the definition of the docker container that will host our Expo development environment. Type `touch Dockerfile`. And press **Enter** key. You will find a Dockerfile created inside the `rn` folder.
   ![AWS Cloud9 Touch Dockerfile](images/aws-cloud9-touch-dockerfile.jpg)

5. Double click to open it.
   ![AWS Cloud9 Open File](images/aws-cloud9-open-file.jpg)

6. Copy the following commands and paste inside the file. Take a few minutes to review this file. We are also installing the AWS mobile CLI.

```
FROM node:12
RUN mkdir -p /code
WORKDIR /code

RUN apt-get update && apt-get install -y python-dev screen

RUN cd /tmp/ && git clone https://github.com/facebook/watchman.git && \
cd watchman && git checkout v4.9.0 && ./autogen.sh && \
./configure && make -j4 && make install  && cd / && rm -rf /tmp/watchman

# RUN npm set progress=false && \
RUN npm install -g create-react-native-app expo expo-cli @aws-amplify/cli

# CHANGE the UID accordingly, follow the step at the note section.
RUN useradd -m -u 501 -s /bin/bash ec2-user
```

Note: find out what is your cloud UID by doing `echo $UID`. By default (at this time of the workshop), the UID is **501**.

![AWS Cloud9 dockerfile](images/aws-cloud9-dockerfile.jpg)

7. Save it by pressing `Command + S` keys for Mac. Or `Control + S` keys for Windows. You can see **All Changes Saved** sign at the top of the Cloud9 Window.
   ![AWS Cloud9 Save Changes](images/aws-cloud-save-changes.jpg)

8. Go back to the lower window. Key in the following commands (with a dot):

```
docker build -t reactnative-expo .
```

and press **Enter** key. Notice this command ends with a dot.
![AWS Cloud9 Docker Command](images/aws-cloud9-docker-command.jpg)

9. This will take _a few minutes_. You might see some `npm warnings` in red around optional dependencies. You can ignore them.
   ![AWS Cloud9 Docker Build](images/aws-cloud9-docker-build.jpg)

10. You can verify your image was successfully built by typing `docker images`. You should see a `reactnative-expo` image.
    ![AWS Cloud9 Docker Images](images/aws-cloud9-docker-images.jpg)

11. Start the React Native Docker using this image with the command below.
    This step allows us to use AWS Cloud9 to be the IDE for our React Native project under the directory `~/environment/rn` while having a Docker container execute the React Native and Expo development server. The 2 TCP ports (19000, 19001) allows our mobile device to communicate with the React Native/Expo container.

```
cd ~/environment/rn

docker run -it --rm -p 19000:19000 -p 19001:19001 \
-v "$PWD:/code" --user $UID \
-v /home/ec2-user/.aws:/home/ec2-user/.aws \
-v /home/ec2-user/.awsmobilejs:/home/ec2-user/.awsmobilejs \
-e REACT_NATIVE_PACKAGER_HOSTNAME=`curl -s http://169.254.169.254/latest/meta-data/public-ipv4` \
 reactnative-expo:latest bash

```

Now that you are in the container, run `amplify --version` to double check that the amplify CLI has been properly installed in the docker container.

# Configure Expo

## Install Expo mobile client

Follow the installation instructions for your mobile device on the [official Expo website](https://docs.expo.io/versions/latest/introduction/installation#mobile-client-expo-for-ios-and-android)

## Create Expo account

Create an Expo account via the [offical Expo website](https://expo.io/signup)

Now you have successfully setup Expo and your AWS Cloud9 in your AWS Console. You can now proceed to [Lab 2](../amplify) to work on setting up the AWS Amplify CLI.
