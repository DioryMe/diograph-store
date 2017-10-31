## Diograph-store

### 2017-10-31

Features:
- updateDiory() implemented
- support for geo property (latitude & longitude) support added
- convertResponseObjectToRequestObject added to fix the inconsistencies between request and response objects
- addConnectedDiories flag to Diory constructor in order to avoid recursive loop
- test fixtures updated
- running tests against local server enabled (somehow)

Known issues:
- DiographApi.delete doesn't support deleting connections yet... 2 connections are polluted to database on each test run.
