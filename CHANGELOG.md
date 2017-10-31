# Diograph-store
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [0.0.10] 2017-10-31

### Added
- updateDiory() implemented
- support for geo property (latitude & longitude) support added
- convertResponseObjectToRequestObject added to fix the inconsistencies between request and response objects
- addConnectedDiories flag to Diory constructor in order to avoid recursive loop

### Changed
- all the null values from API are now converted as undefineds (React likes it more this way...)
- test fixtures updated
- running tests against local server enabled (somehow)

### Known issues
- DiographApi.delete doesn't support deleting connections yet... 2 connections are polluted to database on each test run.
