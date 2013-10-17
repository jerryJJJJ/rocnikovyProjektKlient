var apiary = [
  {
    "name": "Ucitele Resources",
    "description": "The following is a section of resources related to Ucitele",
    "resources": [
      {
        "description": "Seznam ucitelu",
        "method": "GET",
        "url": "/ucitele",
        "request": {
          "headers": {},
          "body": null
        },
        "responses": [
          {
            "status": 200,
            "headers": {
              "Content-Type": "application/json"
            },
            "body": "{ \"ucitele\": [\n    { \"id\": 1, \"jmeno\": \"Martin\", \"prijmeni\": \"Skočdopole\", \"autoskola-id\": 1, \"opravneni\": [\"A\", \"B\"], \"pocet-deti\" : 2, \"datum-prohlidky\": \"2013-01-01\", \"url-dokumentu\": \"/prohlidky/asdasdasdad.pdf\"},\n    { \"id\": 2, \"jmeno\": \"Jacob\", \"prijmeni\": \"Slezstromu\", \"autoskola-id\": 2, \"opravneni\": [\"T\"], \"pocet-deti\" : 0, \"datum-prohlidky\": \"2013-05-01\", \"url-dokumentu\": \"/prohlidky/dddddfd.jpg\"},\n    { \"id\": 3, \"jmeno\": \"Jacob\", \"prijmeni\": \"Slezstromu\", \"autoskola-id\": 2, \"opravneni\": [\"T\"], \"pocet-deti\" : 0, \"datum-prohlidky\": \"2013-05-01\", \"url-dokumentu\": \"/prohlidky/dddddfd.jpg\"},\n    { \"id\": 4, \"jmeno\": \"Jacob4\", \"prijmeni\": \"Slezstromu4\", \"autoskola-id\": 2, \"opravneni\": [\"T\"], \"pocet-deti\" : 0, \"datum-prohlidky\": \"2013-05-01\", \"url-dokumentu\": \"/prohlidky/dddddfd.jpg\"}\n] }"
          }
        ]
      },
      {
        "description": "Detail ucitele",
        "method": "GET",
        "url": "/ucitele/{id}",
        "request": {
          "headers": {},
          "body": null
        },
        "responses": [
          {
            "status": 200,
            "headers": {
              "Content-Type": "application/json"
            },
            "body": "{ \"id\": 2, \"jmeno\": \"Jon\", \"prijmeni\": \"Slezstromu\", \"autoskola-id\": 2, \"opravneni\": [\"T\"], \"pocet-deti\" 0, \"datum-prohlidky\": \"2013-05-01\", \"url-dokumentu\": \"/prohlidky/dddddfd.jpg\"}"
          }
        ]
      },
      {
        "description": "Vytvoreni noveho ucitele",
        "method": "POST",
        "url": "/ucitele",
        "request": {
          "headers": {
            "Content-Type": "application/json"
          },
          "body": "{ \"jmeno\": \"Jan\", \"prijmeni\": \"Řendiblech\", \"autoskola-id\": 1, \"opravneni\": [\"A\", \"C\"], \"pocet-deti\" : 0, \"datum-prohlidky\": \"2013-01-01\" }"
        },
        "responses": [
          {
            "status": 201,
            "headers": {
              "Content-Type": "application/json"
            },
            "body": "{ \"id\": 3 }"
          }
        ]
      }
    ]
  },
  {
    "name": "Autoskoly Resources",
    "description": "The following is a section of resources related to Autoskoly",
    "resources": [
      {
        "description": "Seznam autoskol",
        "method": "GET",
        "url": "/autoskoly",
        "request": {
          "headers": {},
          "body": null
        },
        "responses": [
          {
            "status": 200,
            "headers": {
              "Content-Type": "application/json"
            },
            "body": "{ \"autoskoly\": [\n    { \"id\": 1, \"nazev\": \"Aotoskola1\", \"ucitele\" : [\n        { \"id\": 1, \"jmeno\": \"Martin\", \"prijmeni\": \"Skočdopole\", \"autoskola-id\": 1, \"opravneni\": [\"A\", \"B\"], \"pocet-deti\" : 2, \"datum-prohlidky\": \"2013-01-01\", \"url-dokumentu\": \"/prohlidky/asdasdasdad.pdf\"},\n        { \"id\": 2, \"jmeno\": \"Jacob\", \"prijmeni\": \"Slezstromu\", \"autoskola-id\": 2, \"opravneni\": [\"T\"], \"pocet-deti\" : 0, \"datum-prohlidky\": \"2013-05-01\", \"url-dokumentu\": \"/prohlidky/dddddfd.jpg\"}\n    ], \"vozidla\": [\n        { \"id\": 1, \"znacka\": \"Ford\", \"model\": \"Focus\", \"vin\": \"LJP05GFD5548913\", \"autoskola-id\": 1}\n    ]}, { \"id\": 2, \"nazev\": \"Autoskola2\", \"ucitele\" : [\n        { \"id\": 1, \"jmeno\": \"Martin\", \"prijmeni\": \"Skočdopole\", \"autoskola-id\": 1, \"opravneni\": [\"A\", \"B\"], \"pocet-deti\" : 2, \"datum-prohlidky\": \"2013-01-01\", \"url-dokumentu\": \"/prohlidky/asdasdasdad.pdf\"},\n        { \"id\": 2, \"jmeno\": \"Jacob\", \"prijmeni\": \"Slezstromu\", \"autoskola-id\": 2, \"opravneni\": [\"T\"], \"pocet-deti\" : 0, \"datum-prohlidky\": \"2013-05-01\", \"url-dokumentu\": \"/prohlidky/dddddfd.jpg\"}\n    ], \"vozidla\": [\n        { \"id\": 1, \"znacka\": \"Skoda\", \"model\": \"Octavia\", \"vin\": \"LJP05GFD5548913\", \"autoskola-id\": 2 }\n    ]}\n] }"
          }
        ]
      },
      {
        "description": "Detail autoskoly",
        "method": "GET",
        "url": "/autoskoly/{id}",
        "request": {
          "headers": {},
          "body": null
        },
        "responses": [
          {
            "status": 200,
            "headers": {
              "Content-Type": "application/json"
            },
            "body": "{ \"id\": 1, \"nazev\": \"Aotoskola1\", \"ucitele\" : [\n        { \"id\": 1, \"jmeno\": \"Martin\", \"prijmeni\": \"Skočdopole\", \"autoskola-id\": 1, \"opravneni\": [\"A\", \"B\"], \"pocet-deti\" : 2, \"datum-prohlidky\": \"2013-01-01\", \"url-dokumentu\": \"/prohlidky/asdasdasdad.pdf\"},\n        { \"id\": 2, \"jmeno\": \"Jacob\", \"prijmeni\": \"Slezstromu\", \"autoskola-id\": 2, \"opravneni\": [\"T\"], \"pocet-deti\" : 0, \"datum-prohlidky\": \"2013-05-01\", \"url-dokumentu\": \"/prohlidky/dddddfd.jpg\"}\n    ], \"vozidla\": [\n        { \"id\": 1, \"znacka\": \"Ford\", \"model\": \"Focus\", \"vin\": \"LJP05GFD5548913\", \"autoskola-id\": 1}\n    ]\n}"
          }
        ]
      }
    ]
  },
  {
    "name": "Vozidla Resources",
    "description": "The following is a section of resources related to Vozidla",
    "resources": [
      {
        "description": "Seznam vozidel",
        "method": "GET",
        "url": "/vozidla",
        "request": {
          "headers": {},
          "body": null
        },
        "responses": [
          {
            "status": 200,
            "headers": {
              "Content-Type": "application/json"
            },
            "body": "{ \"vozidla\": [\n    { \"id\": 1, \"znacka\": \"Ford\", \"model\": \"Focus\", \"vin\": \"LJP05GFD5548913\", \"autoskola-id\": 1},\n    { \"id\": 1, \"znacka\": \"Skoda\", \"model\": \"Octavia\", \"vin\": \"LJP05GFD5548913\", \"autoskola-id\": 2 }\n] }"
          }
        ]
      },
      {
        "description": "Detail vozidla",
        "method": "GET",
        "url": "/vozidla/{id}",
        "request": {
          "headers": {},
          "body": null
        },
        "responses": [
          {
            "status": 200,
            "headers": {
              "Content-Type": "application/json"
            },
            "body": "{ \"id\": 1, \"znacka\": \"Ford\", \"model\": \"Focus\", \"vin\": \"LJP05GFD5548913\", \"autoskola-id\": 1, \"pocet-km\" : 155555, \"datum-stk\": \"2014-05-01\", \n  \"jizdy\" : [\n    { \"id\": 1, \"datum\": \"2013-01-01\", \"ucitel\": 2, \"vozidlo\": 1, \"zak\": 1, \"doba-jizdy\": \"02:00\", \"pocet-ujetych-km\" : 15, \"spotreba\" : 6.7 },\n    { \"id\": 2, \"datum\": \"2013-01-01\", \"ucitel\": 1, \"vozidlo\": 1, \"zak\": 5, \"doba-jizdy\": \"01:50\", \"pocet-ujetych-km\" : 16, \"spotreba\" : 7.1 }\n] }"
          }
        ]
      },
      {
        "description": "Kniha jizdy",
        "method": "GET",
        "url": "/jizdy",
        "request": {
          "headers": {},
          "body": null
        },
        "responses": [
          {
            "status": 200,
            "headers": {
              "Content-Type": "application/json"
            },
            "body": "{ \"ucitele\": [\n    { \"id\": 1, \"datum\": \"2013-01-01\", \"ucitel\": 2, \"vozidlo\": 1, \"zak\": 1, \"doba-jizdy\": \"02:00\", \"pocet-ujetych-km\" : 15, \"spotreba\" : 6.7 },\n    { \"id\": 2, \"datum\": \"2013-01-01\", \"ucitel\": 1, \"vozidlo\": 1, \"zak\": 5, \"doba-jizdy\": \"01:50\", \"pocet-ujetych-km\" : 16, \"spotreba\" : 7.1 }\n] }"
          }
        ]
      }
    ]
  }
]