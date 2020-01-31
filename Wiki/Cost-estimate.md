# Cost estimates

## Assumptions

The estimate below assumes:

-   500 users in the tenant.
-	100 buildings and 100 rooms per building. 

## SKU recommendations
The recommended SKU for a production environment is:

 - App Service: Standard (S1)
 -   Azure Search: Basic
    -   The Azure Search service cannot be upgraded once it is provisioned, so select a tier that will meet your anticipated needs.

## [](/wiki/costestimate#estimated-load)Estimated load

**Data storage**: 1 GB max.

**Table data operations**:
    
 - Storage is called to fetch and update user favorite rooms.
    -   Total number of read calls for UserFavorites table = 500 users * 200 calls to fetch favorite rooms /user/month = 10000 favorite rooms fetch calls/month.
    -   Total number of write calls for UserFavorites table = 500 users * 5 calls to update favorite rooms /user/month = 2500 calls to update favorite rooms/month.

 - Storage is called to sync Exchange rooms and buildings from Azure Function app.
	-	Total number of read calls for RoomCollection table = 1 Function app * 4 weeks * 100 call to fetch rooms of 100 buildings/week = 400 calls to fetch all rooms/month.
	-	Total number of delete calls for RoomCollection table = 1 Function app * 4 weeks * 100 call to delete rooms of 100 buildings/week = 400 calls to fetch all rooms/month.
	-	Total number of write calls for RoomCollection table = 1 Function app * 4 weeks * 100 call to insert rooms of 100 buildings/week = 400 calls to update all rooms/month.
	-	Minimal calls required to remove rooms from user favorites as possibility of room deletion from Microsoft Exchange frequently is less.

 - Storage is called to store user local time zone.	

	 - Total number of read calls for UserConfiguration table = 500 users * 200 calls to fetch user local time zone /user/month = 10000 fetch calls/month.
	 - Total number of write calls for UserConfiguration table = 500 users * 2 calls to fetch user local time zone /user/month = 1000 fetch calls/month.

**Blob data operations**:
 - Blob stores bot state to check whether welcome card is sent to the user. Blob storage has container name as "bot-state".
	-	Total number of read calls in storage for welcome card validation = 500 users * 1 welcome message = 500 operations (occurs just once during application installation)
	-	Total number of write calls in storage for welcome card validation = 500 users * 1 welcome message = 500 operations (occurs just once during application installation)
	-	Total number of write calls in storage to store conversation state by bot = 500 users * 20 operations /user/day = 10000 calls per month

## [](https://github.com/OfficeDev/microsoft-teams-TODO-app/wiki/Cost-estimate#estimated-cost)Estimated cost
**IMPORTANT:** This is only an estimate, based on the assumptions above. Your actual costs may vary.

Prices were taken from the [Azure Pricing Overview](https://azure.microsoft.com/en-us/pricing/) on 01 Jan 2020, for the West US 2 region.

Use the [Azure Pricing Calculator](https://azure.com/e/3d7c633e3b624c44b16d3ac25f8bc582) to model different service tiers and usage patterns.
|**Resource**|**Tier**|**Load**|**Monthly price**|          
|--------------------------|-----------------|-------------------------|--------------------------------------
|Storage Account (Table)|Standard_LRS|< 1GB data, 24,700 operations (Cost of table storage account will be same till 75,000 operations)|$0.06|
|Storage account (Blob)|Standard_LRS|< 1GB data, 10,500 write operations, 500 read operations|$0.06|
|Bot Channels Registration|F0|N/A|Free|
|App Service Plan|S1	|744 hours|$74.40|
|App Service (Bot)|-||(charged to App Service Plan)|
|Azure Search|B|744 hours|$75.14|
|Application Insights (Bot)|||(free up to 5 GB)|
|Azure Function|Dedicated| 100 Action Executions for 31 days|(free up to 1 million executions)|
|Total|||$150.20|