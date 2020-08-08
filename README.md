# ADONIS-auth-Heroku

**Adding authentication and automatic Heroku deployment configuration to Adonis JS full-stack application boilerplate**

This is the basic boilerplate for an Adonis JS full-stack application with scaffolded auth and Heroku integration. This project has been configured out of the box to use session authentication and has full auth system with email verification and password resets. The application is also pre configured to be deployed to Heroku and utilize the 'Heroku Postgres' Add-on.

This allows for the application to have a full auth system out of the box, and can immediately be deployed to a public Heroku server, so you can share your application with anyone.

## Local development setup

Open a terminal in your project folder and run the following commands to setup the environment:

```bash
cp .env.example .env
adonis key:generate
adonis migration:run
```

After setup to launch the local application run the following command:
```bash
npm run serve
```

Navigate to this link: [localhost:3333](http://localhost:3333/)

## Remote Heroku setup

In order to deploy to Heroku, you must first commit your source code to a GitHub repo. Create an empty repo on GitHub and follow these steps (similar steps are also featured on GitHub after creating your repo).

Open a terminal in you application folder and run the following command.

```bash
rm -r -f .git
git init
git add .
git commit -m "First Commit"
git remote add origin <Your repo link>
git push -u origin master
```

Now go to Heroku and create a new app with no name (a name will be generated for you).

Go to the Resources tab of your newly created Heroku app and select "Find more add-ons", then select "Heroku Postgres" and click the install button. The plan should default to "Hobby Dev - Free". Next you need to select the Heroku App you are installing the plugin to, begin typing the name of it and it should pop up. After selecting the Heroku App to install to, click "Provision add-on".

Next we will go to the settings tab and add "Config Vars". The reason we have to do this is because Heroku will not get your .env file as it is excluded from your github repo, this is for security, so we have to manually enter our config vars. Keep in mind you will also need to configure a mail driver to use the authentication service ([Mailgun](https://www.mailgun.com/) is recommended). Copy all vales from your ENV file with the exception of 3 changes.

* APP_URL = https://YOUR-APP-NAME.herokuapp.com
* NODE_ENV = heroku
* DB_CONNECTION = pg

Next we will connect our GitHub repo to our heroku application. What happens here is GitHub is your centralized code repository, and when you push to GitHub it updates your central repository, and Heroku is going to update with your new code every time you updated your GitHub repo. This is why we have a local development environment to test with, and a production Heroku Application.

First we go to the "Deploy" tab and choose "GitHub" as our deployment method. You will now have to log into your GitHub account and authorize a connection between Heroku and GitHub.

Next you will be able to link a repository to your Heroku application. Simply by clicking the "search" button will return a list of all of your repos, simply find the GitHub repo you are looking for and click "Connect".

Next we need to select the deployment method, you can either choose to manually deploy the repo, this will pull the code from your GitHub repo and update your Heroku application whenever you press that button. The other (and recommended) option is to set up Automatic Deploys, simply by clicking the "Enable Automatic Deploys" button will automatically update the Heroku application every time you update your GitHub repo.

Now your application should be accessible on your local computer, and on Heroku. To see your work simply go to the Heroku App and click "Open App", and the link you are directed to can be accessed by anyone in the world! 