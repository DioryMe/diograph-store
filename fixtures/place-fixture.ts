export let placeFixture = {
  "data": {
    "id": "5",
    "type": "diories",
    "links": {
      "self": "http://localhost:3000/v1/diories/5"
    },
    "attributes": {
      "diory-id": "e68ed69d-c4a4-4323-82d7-fa9618224043",
      "room-id": "df548369-d0a2-4ca5-b28a-dd4fb14c1f08",
      "version": "0.1.9",
      "diory-type": "place",
      "name": "Mämmisuo",
      "address": null,
      "background": null,
      "geo": {
        "type": "GeoCircle",
        "latitude": "23.989414",
        "longitude": "61.470926",
        "geoRadius": "50"
      },
      "latitude": "23.989414",
      "longitude": "61.470926",
      "date": null,
      "created": "2017-09-25T23:03:49+03:00",
      "modified": "2017-09-25T23:03:49+03:00",
      "data": {}
    },
    "relationships": {
      "connections": {
        "links": {
          "self": "http://localhost:3000/v1/diories/5/relationships/connections",
          "related": "http://localhost:3000/v1/diories/5/connections"
        },
        "data": [
          {
            "type": "connections",
            "id": "5"
          },
          {
            "type": "connections",
            "id": "7"
          }
        ]
      },
      "connected-diories": {
        "links": {
          "self": "http://localhost:3000/v1/diories/5/relationships/connected-diories",
          "related": "http://localhost:3000/v1/diories/5/connected-diories"
        },
        "data": [
          {
            "type": "diories",
            "id": "6"
          },
          {
            "type": "diories",
            "id": "7"
          }
        ]
      },
      "room": {
        "links": {
          "self": "http://localhost:3000/v1/diories/5/relationships/room",
          "related": "http://localhost:3000/v1/diories/5/room"
        }
      }
    }
  },
  "included": [
    {
      "id": "5",
      "type": "connections",
      "links": {
        "self": "http://localhost:3000/v1/connections/5"
      },
      "attributes": {
        "position": {
          "width": "20%",
          "top": "60%",
          "height": "20%",
          "left": "220%"
        },
        "room-id": "(not available)",
        "created-at": "2017-09-30T14:14:28.953+03:00",
        "updated-at": "2017-09-30T14:14:28.953+03:00",
        "from-diory-id": 5,
        "to-diory-id": 6
      },
      "relationships": {
        "from-diory": {
          "links": {
            "self": "http://localhost:3000/v1/connections/5/relationships/from-diory",
            "related": "http://localhost:3000/v1/connections/5/from-diory"
          }
        },
        "to-diory": {
          "links": {
            "self": "http://localhost:3000/v1/connections/5/relationships/to-diory",
            "related": "http://localhost:3000/v1/connections/5/to-diory"
          }
        }
      }
    },
    {
      "id": "7",
      "type": "connections",
      "links": {
        "self": "http://localhost:3000/v1/connections/7"
      },
      "attributes": {
        "position": {
          "width": "20%",
          "top": "60%",
          "height": "20%",
          "left": "220%"
        },
        "room-id": "(not available)",
        "created-at": "2017-09-30T14:14:39.885+03:00",
        "updated-at": "2017-09-30T14:14:39.885+03:00",
        "from-diory-id": 5,
        "to-diory-id": 7
      },
      "relationships": {
        "from-diory": {
          "links": {
            "self": "http://localhost:3000/v1/connections/7/relationships/from-diory",
            "related": "http://localhost:3000/v1/connections/7/from-diory"
          }
        },
        "to-diory": {
          "links": {
            "self": "http://localhost:3000/v1/connections/7/relationships/to-diory",
            "related": "http://localhost:3000/v1/connections/7/to-diory"
          }
        }
      }
    },
    {
      "id": "6",
      "type": "diories",
      "links": {
        "self": "http://localhost:3000/v1/diories/6"
      },
      "attributes": {
        "diory-id": "acf10675-2b48-4e5e-9f18-82fb7e937fa4",
        "room-id": "df548369-d0a2-4ca5-b28a-dd4fb14c1f08",
        "version": "0.1.9",
        "diory-type": "check-in",
        "name": "Mämmisuo - 30.9.2017 - 14:11",
        "address": null,
        "background": null,
        "geo": {
          "type": "GeoCircle",
          "latitude": null,
          "longitude": null,
          "geoRadius": "50"
        },
        "latitude": null,
        "longitude": null,
        "date": "2017-09-30T11:11:00.000Z",
        "created": "2017-09-30T14:14:28+03:00",
        "modified": "2017-09-30T14:14:28+03:00",
        "data": {}
      },
      "relationships": {
        "connections": {
          "links": {
            "self": "http://localhost:3000/v1/diories/6/relationships/connections",
            "related": "http://localhost:3000/v1/diories/6/connections"
          }
        },
        "connected-diories": {
          "links": {
            "self": "http://localhost:3000/v1/diories/6/relationships/connected-diories",
            "related": "http://localhost:3000/v1/diories/6/connected-diories"
          }
        },
        "room": {
          "links": {
            "self": "http://localhost:3000/v1/diories/6/relationships/room",
            "related": "http://localhost:3000/v1/diories/6/room"
          }
        }
      }
    },
    {
      "id": "7",
      "type": "diories",
      "links": {
        "self": "http://localhost:3000/v1/diories/7"
      },
      "attributes": {
        "diory-id": "bee6c1f8-a68c-4ee5-bba9-27444c635576",
        "room-id": "df548369-d0a2-4ca5-b28a-dd4fb14c1f08",
        "version": "0.1.9",
        "diory-type": "check-in",
        "name": "Mämmisuo - 30.8.2017 - 12:11",
        "address": null,
        "background": null,
        "geo": {
          "type": "GeoCircle",
          "latitude": null,
          "longitude": null,
          "geoRadius": "50"
        },
        "latitude": null,
        "longitude": null,
        "date": "2017-08-30T09:11:00.000Z",
        "created": "2017-09-30T14:14:39+03:00",
        "modified": "2017-09-30T14:14:39+03:00",
        "data": {}
      },
      "relationships": {
        "connections": {
          "links": {
            "self": "http://localhost:3000/v1/diories/7/relationships/connections",
            "related": "http://localhost:3000/v1/diories/7/connections"
          }
        },
        "connected-diories": {
          "links": {
            "self": "http://localhost:3000/v1/diories/7/relationships/connected-diories",
            "related": "http://localhost:3000/v1/diories/7/connected-diories"
          }
        },
        "room": {
          "links": {
            "self": "http://localhost:3000/v1/diories/7/relationships/room",
            "related": "http://localhost:3000/v1/diories/7/room"
          }
        }
      }
    }
  ]
}
