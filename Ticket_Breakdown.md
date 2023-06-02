# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Ticket 1

Add a new column called "custom_agent_id" to the Facility table in the database schema, where it will be used to store the unique identifiers that each Facility provides to each Agent it works with.

Acceptance Criteria:

- A new column of type VARCHAR named "custom_agent_id" has been added to the Facility table.
- The custom_agent_id column is nullable, allowing Facilities to leave it blank if they do not wish to use custom ids.
- Facilities can store their own unique custom agent ids in the custom_agent_id column.
- This modification has no impact on the Facilities table's existing data.

Effort Estimate: 1 hour

Implementation Details:

- Identify the database management system being used (e.g., MySQL, PostgreSQL).
- Using the proper credentials, establish a connection to the database.
- Use an ALTER TABLE statement to add the "custom_agent_id" column to the Facility table structure.
- Test the modification by inserting sample data and verifying the new column behaves as expected.

### Ticket 2

The custom_agent_id for each Agent should be included in the Shifts data given to the Facilities by updating the getShiftsByFacility function.

Acceptance Criteria:

- All Shifts done by a Facility in a particular quarter are retrieved using the getShiftsByFacility function.
- The Shifts data includes the custom_agent_id for each Agent assigned to a Shift.
- Based on the Agent's internal database id, the facility's table's custom_agent_id is retrieved.
- Existing metadata about the Agent (such as name and contact details) is still present.

Effort Estimate: 4 hours

Implementation Details:

- Find the script or code base that contains the definition of the getShiftsByFacility function.
- Identify the code section responsible for retrieving Shifts and related Agent metadata.
- Add the custom_agent_id to the Shifts data structure.
- Change the code to include a second database query to retrieve the Facility table's custom_agent_id based on the Agent's internal database id.
- Test the modified function by calling it with sample data and verifying the custom_agent_id is included in the returned Shifts.

### Ticket 3

When creating the PDF report, improve the generateReport method to use the custom_agent_id supplied by the Facility.

Acceptance Criteria:

- The list of Shifts is an input parameter for the generateReport function.
- From the Shifts data, the method extracts the custom_agent_id for each Agent.
- The internal database id for each Agent is replaced by the custom_agent_id in the resulting PDF report.
- The remaining steps in the report generation process are unaltered.

Effort Estimate: 3 hours

Implementation Details:

- Locate the script or code base that contains the generateReport function.
- Identify the code section responsible for generating the PDF report.
- Change the code to read each Agent's custom_agent_id from the Shifts data.
- When displaying Agent information, update the PDF creation process to use the custom_agent_id rather than the internal database id.
- Test the modified function by generating a report with sample Shifts data and verifying the custom_agent_id is correctly used in the PDF.

Note: Depending on the ID, the design of the PDF would also have to be changed. If this is the case, more time has to be scheduled for the ticket.

### Ticket 4

Implement a validation system to guarantee the uniqueness of each custom_agent_id that Facilities enter in the Facility table. Data integrity will be maintained and duplicate custom_agent_ids won't be saved as a result.

Acceptance Criteria:

- The system determines whether the custom_agent_id already exists for any other Agent within the Facility before adding or updating a custom_agent_id for an Agent.
- A warning message is shown and the custom_agent_id is not saved if a duplicate custom_agent_id is found.
- The validation is case-insensitive, meaning "JEFF12" and "jeff12" are considered duplicates.
- It is feasible for multiple Facilities to use the same custom_agent_id for their individual Agents because the validation only applies within the same Facility.

Effort Estimate: 2 hours

Implementation Details:

- Find the code area in charge of adding or changing the custom_agent_id value in the Facility table.
- Implement a query to check if the custom_agent_id already exists for any other Agent within the same Facility.
- Make sure the validation mechanism is included into the codebase so that it is triggered each time a custom_agent_id is added or changed.
- Handle the case-insensitivity by converting all custom_agent_id values to a consistent case during the validation process.
- By adding and changing custom_agent_ids, you may test the validation procedure and make sure that duplicate entries are rejected while unique ones are accepted.
