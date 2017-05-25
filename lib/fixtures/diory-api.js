"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dioryApiFixture = {
    "data": {
        "id": "3670",
        "type": "diories",
        "links": {
            "self": "http://localhost:3000/v1/diories/3670"
        },
        "attributes": {
            "diory-id": "diomber-diory-diomber-diory-18",
            "room-id": "5e423f7c-8545-4ae9-ad7d-634a7f00e03a",
            "version": "0.1.9",
            "diory-type": "person",
            "name": "Sandi Metz",
            "address": null,
            "background": null,
            "location": {
                "type": "",
                "coordinates": []
            },
            "date": null,
            "created": "2015-03-10T10:33:46+02:00",
            "modified": "2015-05-29T23:49:38+03:00",
            "data": {}
        },
        "relationships": {
            "connections": {
                "links": {
                    "self": "http://localhost:3000/v1/diories/3670/relationships/connections",
                    "related": "http://localhost:3000/v1/diories/3670/connections"
                },
                "data": [
                    {
                        "type": "connections",
                        "id": "11372"
                    },
                    {
                        "type": "connections",
                        "id": "11373"
                    },
                    {
                        "type": "connections",
                        "id": "11374"
                    },
                    {
                        "type": "connections",
                        "id": "11375"
                    },
                    {
                        "type": "connections",
                        "id": "11376"
                    },
                    {
                        "type": "connections",
                        "id": "11377"
                    }
                ]
            },
            "connected-diories": {
                "links": {
                    "self": "http://localhost:3000/v1/diories/3670/relationships/connected-diories",
                    "related": "http://localhost:3000/v1/diories/3670/connected-diories"
                },
                "data": [
                    {
                        "type": "diories",
                        "id": "3671"
                    },
                    {
                        "type": "diories",
                        "id": "3672"
                    },
                    {
                        "type": "diories",
                        "id": "3673"
                    },
                    {
                        "type": "diories",
                        "id": "3674"
                    },
                    {
                        "type": "diories",
                        "id": "3675"
                    },
                    {
                        "type": "diories",
                        "id": "3676"
                    }
                ]
            },
            "room": {
                "links": {
                    "self": "http://localhost:3000/v1/diories/3670/relationships/room",
                    "related": "http://localhost:3000/v1/diories/3670/room"
                }
            }
        }
    },
    "included": [
        {
            "id": "11372",
            "type": "connections",
            "links": {
                "self": "http://localhost:3000/v1/connections/11372"
            },
            "attributes": {
                "position": {
                    "width": "20%",
                    "top": "60%",
                    "height": "20%",
                    "left": "220%"
                },
                "room-id": "diomber-rooms-1",
                "created-at": "2016-11-22T12:08:31.467+02:00",
                "updated-at": "2016-11-22T12:08:31.467+02:00",
                "from-diory-id": 3670,
                "to-diory-id": 3671
            },
            "relationships": {
                "from-diory": {
                    "links": {
                        "self": "http://localhost:3000/v1/connections/11372/relationships/from-diory",
                        "related": "http://localhost:3000/v1/connections/11372/from-diory"
                    }
                },
                "to-diory": {
                    "links": {
                        "self": "http://localhost:3000/v1/connections/11372/relationships/to-diory",
                        "related": "http://localhost:3000/v1/connections/11372/to-diory"
                    }
                }
            }
        },
        {
            "id": "11373",
            "type": "connections",
            "links": {
                "self": "http://localhost:3000/v1/connections/11373"
            },
            "attributes": {
                "position": {
                    "width": "20%",
                    "top": "60%",
                    "height": "20%",
                    "left": "220%"
                },
                "room-id": "diomber-rooms-1",
                "created-at": "2016-11-22T12:08:31.479+02:00",
                "updated-at": "2016-11-22T12:08:31.479+02:00",
                "from-diory-id": 3670,
                "to-diory-id": 3672
            },
            "relationships": {
                "from-diory": {
                    "links": {
                        "self": "http://localhost:3000/v1/connections/11373/relationships/from-diory",
                        "related": "http://localhost:3000/v1/connections/11373/from-diory"
                    }
                },
                "to-diory": {
                    "links": {
                        "self": "http://localhost:3000/v1/connections/11373/relationships/to-diory",
                        "related": "http://localhost:3000/v1/connections/11373/to-diory"
                    }
                }
            }
        },
        {
            "id": "11374",
            "type": "connections",
            "links": {
                "self": "http://localhost:3000/v1/connections/11374"
            },
            "attributes": {
                "position": {
                    "width": "20%",
                    "top": "60%",
                    "height": "20%",
                    "left": "220%"
                },
                "room-id": "diomber-rooms-1",
                "created-at": "2016-11-22T12:08:31.492+02:00",
                "updated-at": "2016-11-22T12:08:31.492+02:00",
                "from-diory-id": 3670,
                "to-diory-id": 3673
            },
            "relationships": {
                "from-diory": {
                    "links": {
                        "self": "http://localhost:3000/v1/connections/11374/relationships/from-diory",
                        "related": "http://localhost:3000/v1/connections/11374/from-diory"
                    }
                },
                "to-diory": {
                    "links": {
                        "self": "http://localhost:3000/v1/connections/11374/relationships/to-diory",
                        "related": "http://localhost:3000/v1/connections/11374/to-diory"
                    }
                }
            }
        },
        {
            "id": "11375",
            "type": "connections",
            "links": {
                "self": "http://localhost:3000/v1/connections/11375"
            },
            "attributes": {
                "position": {
                    "width": "20%",
                    "top": "60%",
                    "height": "20%",
                    "left": "220%"
                },
                "room-id": "diomber-rooms-1",
                "created-at": "2016-11-22T12:08:31.507+02:00",
                "updated-at": "2016-11-22T12:08:31.507+02:00",
                "from-diory-id": 3670,
                "to-diory-id": 3674
            },
            "relationships": {
                "from-diory": {
                    "links": {
                        "self": "http://localhost:3000/v1/connections/11375/relationships/from-diory",
                        "related": "http://localhost:3000/v1/connections/11375/from-diory"
                    }
                },
                "to-diory": {
                    "links": {
                        "self": "http://localhost:3000/v1/connections/11375/relationships/to-diory",
                        "related": "http://localhost:3000/v1/connections/11375/to-diory"
                    }
                }
            }
        },
        {
            "id": "11376",
            "type": "connections",
            "links": {
                "self": "http://localhost:3000/v1/connections/11376"
            },
            "attributes": {
                "position": {
                    "width": "20%",
                    "top": "60%",
                    "height": "20%",
                    "left": "220%"
                },
                "room-id": "diomber-rooms-1",
                "created-at": "2016-11-22T12:08:31.519+02:00",
                "updated-at": "2016-11-22T12:08:31.519+02:00",
                "from-diory-id": 3670,
                "to-diory-id": 3675
            },
            "relationships": {
                "from-diory": {
                    "links": {
                        "self": "http://localhost:3000/v1/connections/11376/relationships/from-diory",
                        "related": "http://localhost:3000/v1/connections/11376/from-diory"
                    }
                },
                "to-diory": {
                    "links": {
                        "self": "http://localhost:3000/v1/connections/11376/relationships/to-diory",
                        "related": "http://localhost:3000/v1/connections/11376/to-diory"
                    }
                }
            }
        },
        {
            "id": "11377",
            "type": "connections",
            "links": {
                "self": "http://localhost:3000/v1/connections/11377"
            },
            "attributes": {
                "position": {
                    "width": "20%",
                    "top": "60%",
                    "height": "20%",
                    "left": "220%"
                },
                "room-id": "diomber-rooms-1",
                "created-at": "2016-11-22T12:08:31.531+02:00",
                "updated-at": "2016-11-22T12:08:31.531+02:00",
                "from-diory-id": 3670,
                "to-diory-id": 3676
            },
            "relationships": {
                "from-diory": {
                    "links": {
                        "self": "http://localhost:3000/v1/connections/11377/relationships/from-diory",
                        "related": "http://localhost:3000/v1/connections/11377/from-diory"
                    }
                },
                "to-diory": {
                    "links": {
                        "self": "http://localhost:3000/v1/connections/11377/relationships/to-diory",
                        "related": "http://localhost:3000/v1/connections/11377/to-diory"
                    }
                }
            }
        },
        {
            "id": "3671",
            "type": "diories",
            "links": {
                "self": "http://localhost:3000/v1/diories/3671"
            },
            "attributes": {
                "diory-id": "diomber-diory-diomber-diory-472",
                "room-id": "5e423f7c-8545-4ae9-ad7d-634a7f00e03a",
                "version": "0.1.9",
                "diory-type": "thing",
                "name": "Sandi Metz - Nothing is something - RailsConf 2015",
                "address": "https://www.youtube.com/watch?v=LdWMcs9EEOE&feature=youtu.be&t=27550",
                "background": "https://i.ytimg.com/vd?id=LdWMcs9EEOE&ats=27550000&w=960&h=720&sigh=DubslMhyiK0LrztdTw1mvyqBdzM",
                "location": {
                    "type": "",
                    "coordinates": []
                },
                "date": null,
                "created": "2015-04-26T12:05:55+03:00",
                "modified": "2015-04-26T12:05:56+03:00",
                "data": {}
            },
            "relationships": {
                "connections": {
                    "links": {
                        "self": "http://localhost:3000/v1/diories/3671/relationships/connections",
                        "related": "http://localhost:3000/v1/diories/3671/connections"
                    }
                },
                "connected-diories": {
                    "links": {
                        "self": "http://localhost:3000/v1/diories/3671/relationships/connected-diories",
                        "related": "http://localhost:3000/v1/diories/3671/connected-diories"
                    }
                },
                "room": {
                    "links": {
                        "self": "http://localhost:3000/v1/diories/3671/relationships/room",
                        "related": "http://localhost:3000/v1/diories/3671/room"
                    }
                }
            }
        },
        {
            "id": "3672",
            "type": "diories",
            "links": {
                "self": "http://localhost:3000/v1/diories/3672"
            },
            "attributes": {
                "diory-id": "diomber-diory-diomber-diory-489",
                "room-id": "5e423f7c-8545-4ae9-ad7d-634a7f00e03a",
                "version": "0.1.9",
                "diory-type": "thing",
                "name": "99 Bottles Of OOP - Practical     Programming  Book",
                "address": "http://signup.99bottlesbook.com/",
                "background": "https://launchrock-assets.s3.amazonaws.com/background-files/MZJADCXZ_1410287460412.png?_=3",
                "location": {
                    "type": "",
                    "coordinates": []
                },
                "date": null,
                "created": "2015-04-26T13:34:28+03:00",
                "modified": "2015-04-26T13:34:29+03:00",
                "data": {}
            },
            "relationships": {
                "connections": {
                    "links": {
                        "self": "http://localhost:3000/v1/diories/3672/relationships/connections",
                        "related": "http://localhost:3000/v1/diories/3672/connections"
                    }
                },
                "connected-diories": {
                    "links": {
                        "self": "http://localhost:3000/v1/diories/3672/relationships/connected-diories",
                        "related": "http://localhost:3000/v1/diories/3672/connected-diories"
                    }
                },
                "room": {
                    "links": {
                        "self": "http://localhost:3000/v1/diories/3672/relationships/room",
                        "related": "http://localhost:3000/v1/diories/3672/room"
                    }
                }
            }
        },
        {
            "id": "3673",
            "type": "diories",
            "links": {
                "self": "http://localhost:3000/v1/diories/3673"
            },
            "attributes": {
                "diory-id": "diomber-diory-diomber-diory-596",
                "room-id": "5e423f7c-8545-4ae9-ad7d-634a7f00e03a",
                "version": "0.1.9",
                "diory-type": "thing",
                "name": "Rails Conf 2013 The Magic Tricks of Testing by Sandi Metz - YouTube",
                "address": "https://www.youtube.com/watch?v=URSWYvyc42M",
                "background": "https://i.ytimg.com/vi/URSWYvyc42M/maxresdefault.jpg",
                "location": {
                    "type": "",
                    "coordinates": []
                },
                "date": null,
                "created": "2015-05-09T13:27:34+03:00",
                "modified": "2015-05-09T13:27:34+03:00",
                "data": {}
            },
            "relationships": {
                "connections": {
                    "links": {
                        "self": "http://localhost:3000/v1/diories/3673/relationships/connections",
                        "related": "http://localhost:3000/v1/diories/3673/connections"
                    }
                },
                "connected-diories": {
                    "links": {
                        "self": "http://localhost:3000/v1/diories/3673/relationships/connected-diories",
                        "related": "http://localhost:3000/v1/diories/3673/connected-diories"
                    }
                },
                "room": {
                    "links": {
                        "self": "http://localhost:3000/v1/diories/3673/relationships/room",
                        "related": "http://localhost:3000/v1/diories/3673/room"
                    }
                }
            }
        },
        {
            "id": "3674",
            "type": "diories",
            "links": {
                "self": "http://localhost:3000/v1/diories/3674"
            },
            "attributes": {
                "diory-id": "diomber-diory-diomber-diory-389",
                "room-id": "5e423f7c-8545-4ae9-ad7d-634a7f00e03a",
                "version": "0.1.9",
                "diory-type": "thing",
                "name": "Poodr",
                "address": null,
                "background": null,
                "location": {
                    "type": "",
                    "coordinates": []
                },
                "date": null,
                "created": "2015-04-16T22:04:33+03:00",
                "modified": "2015-04-16T22:04:33+03:00",
                "data": {}
            },
            "relationships": {
                "connections": {
                    "links": {
                        "self": "http://localhost:3000/v1/diories/3674/relationships/connections",
                        "related": "http://localhost:3000/v1/diories/3674/connections"
                    }
                },
                "connected-diories": {
                    "links": {
                        "self": "http://localhost:3000/v1/diories/3674/relationships/connected-diories",
                        "related": "http://localhost:3000/v1/diories/3674/connected-diories"
                    }
                },
                "room": {
                    "links": {
                        "self": "http://localhost:3000/v1/diories/3674/relationships/room",
                        "related": "http://localhost:3000/v1/diories/3674/room"
                    }
                }
            }
        },
        {
            "id": "3675",
            "type": "diories",
            "links": {
                "self": "http://localhost:3000/v1/diories/3675"
            },
            "attributes": {
                "diory-id": "diomber-diory-diomber-diory-477",
                "room-id": "5e423f7c-8545-4ae9-ad7d-634a7f00e03a",
                "version": "0.1.9",
                "diory-type": "thing",
                "name": "Esikuvani 2015",
                "address": null,
                "background": null,
                "location": {
                    "type": "",
                    "coordinates": []
                },
                "date": null,
                "created": "2015-04-26T12:13:42+03:00",
                "modified": "2015-04-26T12:13:42+03:00",
                "data": {}
            },
            "relationships": {
                "connections": {
                    "links": {
                        "self": "http://localhost:3000/v1/diories/3675/relationships/connections",
                        "related": "http://localhost:3000/v1/diories/3675/connections"
                    }
                },
                "connected-diories": {
                    "links": {
                        "self": "http://localhost:3000/v1/diories/3675/relationships/connected-diories",
                        "related": "http://localhost:3000/v1/diories/3675/connected-diories"
                    }
                },
                "room": {
                    "links": {
                        "self": "http://localhost:3000/v1/diories/3675/relationships/room",
                        "related": "http://localhost:3000/v1/diories/3675/room"
                    }
                }
            }
        },
        {
            "id": "3676",
            "type": "diories",
            "links": {
                "self": "http://localhost:3000/v1/diories/3676"
            },
            "attributes": {
                "diory-id": "diomber-diory-diomber-diory-679",
                "room-id": "5e423f7c-8545-4ae9-ad7d-634a7f00e03a",
                "version": "0.1.9",
                "diory-type": "thing",
                "name": "Stop Designing Your Software Upfront | Talking Code Podcast",
                "address": "http://www.talkingcode.com/podcast/episode-2-sandi-metz/",
                "background": null,
                "location": {
                    "type": "",
                    "coordinates": []
                },
                "date": null,
                "created": "2015-05-13T15:48:49+03:00",
                "modified": "2015-05-13T15:48:49+03:00",
                "data": {}
            },
            "relationships": {
                "connections": {
                    "links": {
                        "self": "http://localhost:3000/v1/diories/3676/relationships/connections",
                        "related": "http://localhost:3000/v1/diories/3676/connections"
                    }
                },
                "connected-diories": {
                    "links": {
                        "self": "http://localhost:3000/v1/diories/3676/relationships/connected-diories",
                        "related": "http://localhost:3000/v1/diories/3676/connected-diories"
                    }
                },
                "room": {
                    "links": {
                        "self": "http://localhost:3000/v1/diories/3676/relationships/room",
                        "related": "http://localhost:3000/v1/diories/3676/room"
                    }
                }
            }
        }
    ]
};
