export let placeFixture = {
  "data": {
    "id": "6283",
    "type": "diories",
    "links": {
      "self": "http://diory-server.herokuapp.com/v1/diories/6283"
    },
    "attributes": {
      "diory-id": "c9f07a3b-2ed3-499c-b424-5e2ba0f4fb5d",
      "room-id": "test-token",
      "version": "0.1.9",
      "diory-type": "place",
      "name": "Uusi paikka",
      "address": null,
      "background": null,
      "location": {
        "type": "",
        "coordinates": []
      },
      "date": null,
      "created": "2017-08-06T16:36:53+00:00",
      "modified": "2017-08-06T16:36:53+00:00",
      "data": {}
    },
    "relationships": {
      "connections": {
        "links": {
          "self": "http://diory-server.herokuapp.com/v1/diories/6283/relationships/connections",
          "related": "http://diory-server.herokuapp.com/v1/diories/6283/connections"
        },
        "data": [
          {
            "type": "connections",
            "id": "10035"
          }
        ]
      },
      "connected-diories": {
        "links": {
          "self": "http://diory-server.herokuapp.com/v1/diories/6283/relationships/connected-diories",
          "related": "http://diory-server.herokuapp.com/v1/diories/6283/connected-diories"
        },
        "data": [
          {
            "type": "diories",
            "id": "6284"
          }
        ]
      },
      "room": {
        "links": {
          "self": "http://diory-server.herokuapp.com/v1/diories/6283/relationships/room",
          "related": "http://diory-server.herokuapp.com/v1/diories/6283/room"
        }
      }
    }
  },
  "included": [
    {
      "id": "10035",
      "type": "connections",
      "links": {
        "self": "http://diory-server.herokuapp.com/v1/connections/10035"
      },
      "attributes": {
        "position": {
          "width": "20%",
          "top": "60%",
          "height": "20%",
          "left": "220%"
        },
        "room-id": "diomber-rooms-1",
        "created-at": "2017-08-06T19:46:02.730+03:00",
        "updated-at": "2017-08-06T19:46:02.730+03:00",
        "from-diory-id": 6283,
        "to-diory-id": 6284
      },
      "relationships": {
        "from-diory": {
          "links": {
            "self": "http://diory-server.herokuapp.com/v1/connections/10035/relationships/from-diory",
            "related": "http://diory-server.herokuapp.com/v1/connections/10035/from-diory"
          }
        },
        "to-diory": {
          "links": {
            "self": "http://diory-server.herokuapp.com/v1/connections/10035/relationships/to-diory",
            "related": "http://diory-server.herokuapp.com/v1/connections/10035/to-diory"
          }
        }
      }
    },
    {
      "id": "6284",
      "type": "diories",
      "links": {
        "self": "http://diory-server.herokuapp.com/v1/diories/6284"
      },
      "attributes": {
        "diory-id": "040bcd3f-1ebb-40b3-a627-1c72e101f51d",
        "room-id": "test-token",
        "version": "0.1.9",
        "diory-type": "check-in",
        "name": "Uusi paikka - 6.8.2017 - 19:45",
        "address": null,
        "background": null,
        "location": {
          "type": "",
          "coordinates": []
        },
        "date": "2017-08-06T16:45:00.000Z",
        "created": "2017-08-06T16:46:02+00:00",
        "modified": "2017-08-06T16:46:02+00:00",
        "data": {}
      },
      "relationships": {
        "connections": {
          "links": {
            "self": "http://diory-server.herokuapp.com/v1/diories/6284/relationships/connections",
            "related": "http://diory-server.herokuapp.com/v1/diories/6284/connections"
          }
        },
        "connected-diories": {
          "links": {
            "self": "http://diory-server.herokuapp.com/v1/diories/6284/relationships/connected-diories",
            "related": "http://diory-server.herokuapp.com/v1/diories/6284/connected-diories"
          }
        },
        "room": {
          "links": {
            "self": "http://diory-server.herokuapp.com/v1/diories/6284/relationships/room",
            "related": "http://diory-server.herokuapp.com/v1/diories/6284/room"
          }
        }
      }
    }
  ]
}
