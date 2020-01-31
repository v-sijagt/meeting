# Deployment guide

**Prerequisites**

  

To begin, you will need:

  

- An Azure subscription where you can create the following kinds of resources:

  

- App service

- App service plan

- Bot channels registration

- Azure storage account

- Azure search

- Function app

- Application Insights



- A copy of the Book-a-room app GitHub repo (Git Url)


  

**Step 1: Register Azure Active Directory applications**

1. Open the Azure Active Directory panel in the Azure portal. If you are not in the correct tenant, click Switch directory to switch to the correct tenant. (For instruction on creating a tenant, see Access the portal and create a tenant.)

2. Open the App registrations panel.

3. In the App registrations panel, click New registration.

4. Fill in the required fields and create the app registration.
	- Name your application - if you are following the template for a default deployment, we recommend "Book-a-room".
	- Select the Supported account type as Accounts in any organizational directory.

	![Registration page](/wiki/images/RegisterPage.png)
	- For the Redirect URI
		- Select Web.
		- Set the URL to https://token.botframework.com/.auth/web/redirect.
		- Click Register.
			- Once it is created, Azure displays the Overview page for the app.
			- Record the Application (client) ID value. You will use this value later as the Client ID when you register your Azure Active Directory application with your bot.
			- Also record the Directory (tenant) ID value. You will also use this to register this application with your bot.

	![Overview page](/wiki/images/OverviewPage.png)

5. In the navigation pane, click Certificates & secrets to create a secret for your application.
	- Under Client secrets, click New client secret.
	- Add a description to identify this secret from others you might need to create for this app, such as bot login.
	- Set Expires to Never.
	- Click Add.
	- Before leaving this page, record the secret. You will use this value later as the Client secret when you register your Azure Active Directory application with your bot.

6. In the navigation pane, click API permissions to open the API permissions panel. It is a best practice to explicitly set the API permissions for the app.
	- Click Add a permission to show the Request API permissions pane.
	- Select Microsoft APIs and Microsoft Graph.
	- Choose Delegated permissions and make sure the permissions you need are selected. Book-a-room bot requires these permissions.
		- openid
		- profile
		- Calendars.ReadWrite
		- email
	- Click Add permissions. (The first time a user accesses this app through the bot, they will need to grant consent.)
	- Choose Application permissions and make sure the permissions you need are selected. Book-a-room requires these permissions.
		- Place.Read.All
	- Click add permission. 
	- Click Grant admin consent. (This is required for Application permissions.)

You now have an Azure Active Directory application configured.


**Step 2: Deploy to your Azure subscription**

  

1. Click on the "Deploy to Azure" button below.

  

[![Deploy to Azure](https://camo.githubusercontent.com/8305b5cc13691600fbda2c857999c4153bee5e43/68747470733a2f2f617a7572656465706c6f792e6e65742f6465706c6f79627574746f6e2e706e67)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FOfficeDev%2Fmicrosoft-teams-TODO-app%2Fmaster%2FDeployment%2Fazuredeploy.json)

  

2. When prompted, log in to your Azure subscription.

3. Azure will create a "Custom deployment" based on the ARM template and ask you to fill in the template parameters.

4. Select a subscription and resource group.

  

	- We recommend creating a new resource group.

	- The resource group location MUST be in a datacenter that supports: Application Insights; Azure Search, Function App. For an up-to-date list, click [here](https://azure.microsoft.com/en-us/global-infrastructure/services/?products=functions,cognitive-services,search,monitor), and select a region where the following services are available:

  

	- Application Insights

	- Azure Search

	- Function App
  

5. Enter a "Base Resource Name", which the template uses to generate names for the other resources.

  

	- The app service name [Base Resource Name] must be available. For example, if you select bookaroom as the base name, the name bookaroom must be available (not taken); otherwise, the deployment will fail with a Conflict error.

	- Remember the base resource name that you selected. We will need it later.

  

6. Fill in the various IDs in the template:

  

	a. **Bot Client ID**: The application (client) ID of the Microsoft Teams bot app

	b. **Bot Client Secret**: The client secret of the Microsoft Teams bot app

	c. **Tenant ID**: The tenant ID above
  
 Make sure that the values are copied as-is, with no extra spaces. The template checks that GUIDs are exactly 36 characters.
  

7. If you wish to change the app name, description, and icon from the defaults, modify the corresponding template parameters.

8. Agree to the Azure terms and conditions by clicking on the check box "I agree to the terms and conditions stated above" located at the bottom of the page.

9. Click on "Purchase" to start the deployment.

10. Wait for the deployment to finish. You can check the progress of the deployment from the "Notifications" pane of the Azure Portal. It can take more than 10 minutes for the deployment to finish.

11. Once the deployment has finished, you would be directed to a page that has the following fields:

  

	- BotId - This is the Microsoft Application ID for the Book-a-room bot.

	- AppDomain - This is the base domain for the Book-a-room bot.

  

**Step 3: Set up authentication for bot**

1. Note the name of the bot that you deployed, which is [BaseResourceName].

2. Go to azure portal [here](https://portal.azure.com/) and search for your bot.

3. Click on the bot in the application list. Under "Settings", click on "Add Setting".

4. Fill in the form as follows:

	a. For Name, enter "AAD2Auth". You'll use it in your bot code.

	b. For Service Provider, select Azure Active Directory v2. Once you select this, the Azure Active Directory-specific fields will be displayed.

	c. For Client ID, enter the application (client) ID that you recorded earlier.

	d. For Client secret, enter the secret that you created to grant the bot access to the Azure Active Directory app.

	e. For Tenant ID, enter the directory (tenant) ID that your recorded earlier for your Azure Active Directory app.
	This will be the tenant associated with the users who can be authenticated.

	f. For Scopes, enter the names of the permission you chose from application registration:
	Calendars.ReadWrite email openid profile

5. Click Save.
  


**Step 4: Create the Teams app packages**

  

Create Teams app package:
  

1. Open the Manifest\manifest.json file in a text editor.

2. Change the placeholder fields in the manifest to values appropriate for your organization.
  

	- developer.name ([What's this?](https://docs.microsoft.com/en-us/microsoftteams/platform/resources/schema/manifest-schema#developer))

	- developer.websiteUrl

	- developer.privacyUrl

	- developer.termsOfUseUrl

  

4. Change the <<botId>> placeholder to your Azure Active Directory application's ID from above. This is the same GUID that you entered in the template under "Bot Client ID".

5. In the "validDomains" section, replace the <<appDomain>> with your bot App Service's domain. This will be [BaseResourceName].azurewebsites.net. For example if you chose "contosoBookARoom" as the base name, change the placeholder to contosoBookARoom.azurewebsites.net.

	![manifest](/wiki/images/manifest.png)


6. Create a ZIP package with the manifest.json,color.png, and outline.png. The two image files are the icons for your app in Teams.


	- Name this package BookARoom.zip.

	- Make sure that the 3 files are the _top level_ of the ZIP package, with no nested folders.
  
  

**Step 5: Run the apps in Microsoft Teams**

  

1. If your tenant has sideloading apps enabled, you can install your app by following the instructions [here](https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/apps/apps-upload#load-your-package-into-teams)

2. You can also upload it to your tenant's app catalog, so that it can be available for everyone in your tenant to install. See [here](https://docs.microsoft.com/en-us/microsoftteams/tenant-apps-catalog-teams)


3. Install the end-user app (the BookARoom-enduser.zip package) to your users.
  

# Troubleshooting

  

Please see our [Troubleshooting](https://github.com/OfficeDev/microsoft-teams-TODO-app/wiki/Troubleshooting) page.