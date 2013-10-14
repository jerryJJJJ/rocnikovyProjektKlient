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
            "body": "{ \"ucitele\": [\n    { \"id\": 1, \"jmeno\": \"Jan\", \"prijmeni\": \"Skočdopole\", \"autoskola-id\": 1, \"opravneni\": [\"A\", \"B\"], \"pocet-deti\" : 2, \"datum-prohlidky\": \"2013-01-01\", \"url-dokumentu\": \"/prohlidky/asdasdasdad.pdf\"},\n    { \"id\": 2, \"jmeno\": \"Jon\", \"prijmeni\": \"Slezstromu\", \"autoskola-id\": 2, \"opravneni\": [\"T\"], \"pocet-deti\" : 0, \"datum-prohlidky\": \"2013-05-01\", \"url-dokumentu\": \"/prohlidky/dddddfd.jpg\"}\n] }"
          }
        ]
      },
      {
        "description": "Detail ucitele s id 2",
        "method": "GET",
        "url": "/ucitele/2",
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
    "resources": []
  }
]