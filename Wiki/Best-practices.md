# Best practices

**Managing user expectations**:
 1. The bot is designed to work in personal scope.
 2. It is recommended to add your frequently booked rooms as favorites for the best app experience.
 3. The app works best with the building/room data being stored in Microsoft Exchange. The app code is extensible enough to let you extend the app code to support any other data sources.
 4. For first run, sync service will fetch all rooms from Microsoft Exchange and start pushing in Azure table storage. If count of rooms in Microsoft Exchange is considerably large then sync service will take few minutes to complete the operation. Till sync service finishes operation, users will not be able to search rooms in bot. It is advised to wait till sync operation is finished. To check if sync operation has finished, follow these steps:
	 - Login to your Azure portal. [Link](https://portal.azure.com/)
	 - Search for Function App in search bar.
	 - Select Function app created for Book-a-room bot.
	 - Under 'Functions', expand 'ExchangeSyncFunction' and click on 'Monitor'. 
		![Function app in Azure portal](/wiki/images/AzureFunctionApp.png)
Here you can see whether app has successfully finished execution.
