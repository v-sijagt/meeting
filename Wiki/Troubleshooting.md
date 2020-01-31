
## Troubleshooting

### **Generic possible issues**
**1. Bot returns 'You are not authorized to access this Bot. Please contact administrator.'**
		- Please verify account you are using in Microsoft Teams is of same tenant. 
		- Check whether tenant ID mentioned in application settings section of configuration menu for bot app service matches Microsoft Teams account tenant. Ref: [https://docs.microsoft.com/en-us/azure/app-service/configure-common](https://docs.microsoft.com/en-us/azure/app-service/configure-common)
![Checking application settings in app service](https://docs.microsoft.com/en-us/azure/app-service/media/configure-common/open-ui.png)

**2. Cannot search rooms in bot after deployment**
		- After deployment, sync service will fetch rooms from Microsoft Exchange and insert into table storage. If the room count in Microsoft Exchange is larger, the sync operation will take few minutes to complete the operation. Hence confirm if Azure Function has completed the sync operation and then retry to search room from bot.
 - Login to your Azure portal. [Link](https://portal.azure.com/)
 - Search for Function App in search bar.
 - Select Function app created for Book-a-room bot.
 - Under 'Functions', expand 'ExchangeSyncFunction' and click on 'Monitor'. 
![Function app in Azure portal](/wiki/images/AzureFunctionApp.png)
Here you can see whether app has successfully finished execution.

**3. Status of room is not changing after booking**
	-	This rare case scenario might occur due to IP blacklisting from the resource (room). In this case room rejects all the meeting requests even though meeting gets created successfully.
	-	If you log in to Outlook using room credentials, email with following error will be there:
*Error: Remote Server returned '550 5.7.708 Service unavailable. Access denied, traffic not accepted from this IP.*
	 - To resolve this issue, you can remove IP from Office365 blocked IP list. To do so follow steps mentioned in this [link](https://docs.microsoft.com/en-in/microsoft-365/security/office-365-security/use-the-delist-portal-to-remove-yourself-from-the-office-365-blocked-senders-lis).
	 - If you are unable to remove IP, you can reach out to support by following steps mentioned in this [link](https://docs.microsoft.com/en-in/office365/admin/contact-support-for-business-products?view=o365-worldwide&tabs=online).


### **Problems while deploying to Azure**
**1. Error when attempting to reuse a Microsoft Azure Active Directory application ID for the bot registration**

Bot is not valid. Errors: MsaAppId is already in use.

-   Creating the resource of type Microsoft.BotService/botServices failed with status "BadRequest"

This happens when the Microsoft Azure application ID entered during the setup of the deployment has already been used and registered for a bot.

**Fix**
Either register a new Microsoft Azure Active Directory application or delete the bot registration that is currently using the attempted Microsoft Azure application ID.

### **Problems while customizing bot**
**1. Client app packages restoration failure for first build**
Once repository is cloned and you try to build the solution in Visual Studio, build fails due to multiple NPM packages fails to install.

**Fix**
If you have cloned using Visual Studio, please retry building solution after closing and re-opening the Visual Studio.
If you still get errors, navigate to 'ClientApp' folder in project directory using file explorer. Open command prompt at this location and type 'npm install'. This will install app the packages for client app. Once it is done, try rebuild solution from Visual Studio.

**Didn't find your problem here?**

Please, report the issue [here]([https://github.com/OfficeDev/microsoft-teams-](https://github.com/OfficeDev/microsoft-teams-)  <<To Do>>/issues/new)