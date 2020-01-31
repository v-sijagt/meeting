# Data stores

The app uses the following data stores:

All these resources are created in your Azure subscription. None are hosted directly by Microsoft.
 - **Azure Table Storage Account**
 
   - [Table] to store user rooms from exchange, favorite rooms added by user, user configuration and card activity so that same card can be updated once user books a room.
		 
   - [Blob] to store bot state to check whether welcome card is sent to the user. Blob storage has container name as "bot-state".

 ## Storage account
 
  ## RoomCollection Table
  - Accessed by bot app to retrieve rooms and Azure function for CRUD operation.
  
| **Property Name**|**Value**|          
|----------------|-------------------------------|-----------------------------|
|PartitionKey|PartitionKey is building's alias which uniquely identifies building. |
|RowKey|RowKey is room's alias which uniquely identifies room.|
|TimeStamp|Date time of row creation.|
|BuildingName|Building name from exchange.          |
|RoomName|Room name from exchange.|

## FavoriteRooms Table
-	Accessed by bot app for CRUD operation.

| **Property Name**|**Value**|          
|----------------|-------------------------------|-----------------------------|
|PartitionKey|User object identifier provided by Azure Active Directory.|
|RowKey|Row key is the rooms alias which uniquely identifies room.|
|TimeStamp|It contains the date time of row creation.|
|BuildingEmail|Building alias from exchange.|
|BuildingName|Building name from exchange.|
|RoomName|Room name from exchange.|

## ActivityEntities Table
-	Accessed by bot app for CRUD operation.

| **Property Name**|**Value**|          
|----------------|-------------------------------|-----------------------------|
|PartitionKey|User object identifier provided by Azure Active Directory. |
|RowKey|Random activity reference ID generated before sending card to user.|
|TimeStamp|Date time of row creation.|
|ActivityId|Activity ID is used for updating card.          |

## UserConfiguration Table
-	Accessed by bot app for CRUD operation.

| **Property Name**|**Value**|          
|----------------|-------------------------------|-----------------------------|
|PartitionKey|Constant value 'msteams'. |
|RowKey|User object identifier provided by Azure Active Directory.|
|TimeStamp|Date time of row creation.|
|IanaTimezone|User local time zone in IANA format.          |
|WindowsTimezone|User local time zone in Windows format.          |