# Telemetry

Book-a-room bot web app logs telemetry to [Azure Application Insights](https://azure.microsoft.com/en-us/services/monitor/). You can go to the Application Insights blade of the Azure App Service to view basic telemetry about your services, such as requests, failures, and dependency errors.

Book-a-room bot integrates with Application Insights to gather bot activity analytics, as described [here](https://blog.botframework.com/2019/03/21/bot-analytics-behind-the-scenes/).

Book-a-room bot logs a few kinds of custom events:

The `Activity` event:

-   Basic activity info: `ActivityId`, `ActivityType`, `Event Name`
-   Basic user info: `UserAadObjectId`

The  `customEvents`  event:

-   Basic activity info:  `Event Name`    
-   Basic user info:  `UserAadObjectId`
-   Other info:  `RoomEmail`,`Timezone`


*Application Insights queries:*
  

- This query gives total number of unique users of bot.
```
customEvents
| extend User = tostring(customDimensions.User)
| summarize dcount(User)
```
- This query gives all the CRUD operations performed by a particular user.

```
customEvents
| extend User = tostring(customDimensions.User)
| project name, timestamp , User
| where User == "<<UserObjectIdentifier>>"
```
- This query gives all the rooms booked by a particular user.

```
customEvents
| extend User = tostring(customDimensions.User)
| project Room, timestamp , User
| where User == "<<UserObjectIdentifier>>" and name == "Meeting created"
```