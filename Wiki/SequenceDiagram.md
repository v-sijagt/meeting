# Sequence diagram

## Exchange sync operation 
- Exchange sync will be triggered from Azure Function app on default interval of 1 week. Azure Function will fetch all buildings and respective rooms from Microsoft Graph API using application access token and update them in Azure Table Storage. 
- The Graph API permission requires tenant admin consent for generation of application access token. 

![Exchange sync](/wiki/images/exchange-sync-dfd.png)

## Book room 
- Booking a room will require user to authenticate
- Get the favorites room from table storage
- Leverage Graph API to book the room 
- Send the confirmation response

![Book room](/wiki/images/book-room-dfd.png)

## Manage favorites
- Managing favorites requires the page to render in task module
- A JWT token will be sent and validated between client and server for authentication 
- The task module render an HTML page which allows users to perform search and save favorites 
- Search is an auto suggest field which will query to table storage using azure search and get the building/room name. 
- User will be able to add/remove favorites. To remove favorite, user has to click on star icon and click on Done at the bottom. 
- Changes in favorites will only be gets committed to storage after user clicks on 'Done' button. 
- 

![Manage favorite](/wiki/images/manage-favorite-dfd.png)

## Book other rooms 
- For scenarios where users want to book rooms which may or may not be a part of their favorites list. 
- A task module will render the HTML page with time selector drop down (30, 60 or 90 min) and can search the building/room name. 
- Auto-suggest dropdown will show the list of buildings/rooms with their availability. The availability checks are done at server level using Graph APIs. 
- Once user select any of the room and click 'Done' button, the room will be booked. 

![Book other room](/wiki/images/book-other-room-dfd.png)

