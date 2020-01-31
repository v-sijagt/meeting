
# Take it further

## Scenario 1

Extend the app to prompt for attendee names before the meeting request is sent.

**Suggested Solution:** Once the room is selected, the bot can respond with a card with an input field for the user to add the attendee UPNs who should be included in the meeting invite.

**Pros:**  Attendees will receive notification regarding meeting. Current Microsoft Graph APIs supports adding multiple attendees and require minimal code changes.

## Scenario 2

Extend the app code to support conversational commands for Ex: Book room in Contoso Park or Book room 10123.
  
**Suggested Solution:**  Integrate the bot code with Language Understanding Service(LUIS) to build natural language into the bot.

**Pros:**  Meeting can be booked with one command using language understanding capabilities of bot.

## Scenario 3
Extend app to track additional information associated with places.

**Suggested Solution:**  [Microsoft Place APIs](https://docs.microsoft.com/en-us/graph/api/place-list?view=graph-rest-beta&tabs=http) used in the application provides geo-coordinates, room accessibility information, audio/video device information. These details can be stored by extending Azure Function logic with minimal code changes.

**Pros:**  It will help user to select room according to specific needs.