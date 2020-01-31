# Solution overview

The **Book-a-room bot** has following main components – 

- **Book-a-room bot**: Book-a-room bot will let you easily book a room on the go with minimum clicks as possible in a personal scope. The users can look at available rooms depending on the selected location/building and time and select one from the list to book the room.
- **Task module UI component**: Provides two views which are displayed in task module for managing favorite rooms and booking room other than user favorite.
- **Azure table storage**: Stores user related and rooms data in tables.
- **Function app**: Recurrence triggered function app to sync rooms from Microsoft Exchange with table storage on given frequency. Recommended sync would be every week and can be configured via ARM template.
- **Azure search service**: Creates index on Azure table storage 'RoomCollection' table which stores all the rooms. This helps to quickly search room or building from drop-down in client app.
- **Microsoft Graph APIs**: The app leverage Microsoft Graph APIs to get building/rooms using Places, room schedule using Schedule, and create event using Event. 

![Architecture diagram](/wiki/images/ArchitectureDiagram.png)

## BOT Commands

Supported bot commands are described in this section. 
| **Bot Command**         |**Bot Response**|          
|----------------|-------------------------------|-----------------------------|
|**Book room**|Presents list of favorite rooms for which meeting can be booked|
|**Manage favorites**|Present card having button which opens task module for adding and removing user favorites|
|**Help**|Presents a list of commands that the bot supports|

## Bot app
The bot is built using the [Bot Framework SDK v4 for .NET](https://docs.microsoft.com/en-us/azure/bot-service/bot-service-overview-introduction?view=azure-bot-service-4.0)  and [ASP.NET Core 2.](https://docs.microsoft.com/en-us/aspnet/core/?view=aspnetcore-2.0) . The bot has a conversational interface with personal scope. The app majorly performs below actions - 
 - Provides user sign in flow using bot service Azure Active Directory v2 connection settings to get favorite rooms based on user ID and check availability and book room using Microsoft Graph APIs.
 - Create meeting with user selections.


## Task module UI component
Features such as manage user favorites and book other rooms (non-favorite) are implemented using ReactJs and .Net Core 2.1. A task module in Microsoft Teams uses Microsoft Teams Javascript SDK to support color themes and supports responsiveness.

## Function app
Recurring operation of room sync from Microsoft Exchange to Azure table storage created using .Net Core 2.1. It follows following steps for sync:
1. Get list of buildings from Microsoft Graph API.
2. Create batch of 10 buildings. (Useful for parallel execution)
3. For every building in batch:
	 - Get records from table storage matching building email ID.
     - Get rooms from Microsoft Graph API associated with building email ID.
     - Delete existing records from table storage matching building email ID.
     - Add records fetched from Microsoft Graph API to table storage.
     - Find out deleted rooms from exchange and remove them from user favorites. 

## Azure bot service
Azure bot service is developed using Microsoft Bot Framework .Net SDK v4.
 - Azure Active Directory v2 service provider is used for authentication and registered in OAuth connection string settings in bot registration portal.
 - Meetings web app endpoint is registered as messaging end point in bot registration portal.
 - The bot follows the waterfall dialog concept to combine sequential steps and allow passing state to next steps. 
The MainDialog component dialog have below steps – 
    - PromptStepAsync 
    - CommandStepAsync
    - ProcessStepAsync
 -  Each step checks user token using WaterfallStepContext and OAuth card is provided in case of no token found by following the sequence starting from PromptStepAsync.
 -  Logout interruption is handled in LogoutDialog (base class of MainDialog) and can be extended to handle other interruptions. In case of any other interruption, user will be provided with the message to complete the current process.

## Extensibility
In order to allow application to support various data sources, all methods are implemented by using below interfaces. All dependencies are registered in Startup file -
1.	IMeetingProvider: provides methods to process meeting location information. 
2.	ISearchService: provides methods to perform room and building search operations. 
3.	IActivityStorageProvider: provides methods to process CRUD operations on ActivityEntities table. 
4.  IFavoriteStorageProvider: provides methods to process CRUD operations on FavoriteRooms table. 
5.  IRoomCollectionStorageProvider: provides methods to process CRUD operations on RoomCollection table.
6.  IUserConfigurationStorageProvider: provides methods to process CRUD operations on UserConfiguration table.
7.	IUserConfigurationProvider: provides method to get user specific details from Microsoft Graph. 

 ## Azure table storage
 Azure table storage saves buildings and rooms information along with favorite rooms of users.

## Microsoft Graph APIs 
Application performs rooms and buildings data sync operation from Microsoft Exchange to table storage which requires application level permission and requires tenant admin to provide consent.


|**Use Case**|**API**|**Delegated Permission**|**Application Permission**|
|---------------|------------------------------------|-------------|-------------|
|Get schedules for rooms|https://graph.microsoft.com/v1.0/me/calendar/getSchedule |Calendars.ReadWrite|NA |
|Create event|https://graph.microsoft.com/v1.0/me/calendar/events |Calendars.ReadWrite|NA |
|Cancel event|https://graph.microsoft.com/beta/me/events/{id}/cancel |Calendars.ReadWrite|NA |
|List places (buildings) | https://graph.microsoft.com/beta/places/microsoft.graph.roomlist | NA | Place.Read.All
|List places (rooms) | https://graph.microsoft.com/beta/places/{BuildingAlias}/microsoft.graph.roomlist/rooms| NA | Place.Read.All