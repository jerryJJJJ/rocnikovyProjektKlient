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
    "name": "Studenti Resources",
    "description": "The following is a section of resources related to Studenti",
    "resources": [
      {
        "description": "Seznam studentu",
        "method": "GET",
        "url": "/studenti",
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
            "body": "{ \"ucitele\": [\n    { \"id\": 1, \"jmeno\": \"Martin\", \"prijmeni\": \"ZborilGaraz\", \"autoskola-id\": 1, \"matricni-cislo\": 26549562 },\n    { \"id\": 2, \"jmeno\": \"Jacob\", \"prijmeni\": \"VjelDoPole\", \"autoskola-id\": 1, \"matricni-cislo\": 26549562 },\n    { \"id\": 3, \"jmeno\": \"Lukas\", \"prijmeni\": \"SrazilChodce\", \"autoskola-id\": 1, \"matricni-cislo\": 26549562 },\n    { \"id\": 4, \"jmeno\": \"Lukas\", \"prijmeni\": \"SrazilChodce\", \"autoskola-id\": 2, \"matricni-cislo\": 26549562 }\n] }"
          }
        ]
      },
      {
        "description": "Detail studenta",
        "method": "GET",
        "url": "/studenti/{id}",
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
            "body": "{ \"id\": 1, \"jmeno\": \"Martin\", \"prijmeni\": \"ZborilGaraz\", \"autoskola-id\": 1, \"matricni-cislo\": 26549562 }"
          }
        ]
      },
      {
        "description": "Vytvoreni noveho studenta",
        "method": "POST",
        "url": "/studenti",
        "request": {
          "headers": {
            "Content-Type": "application/json"
          },
          "body": "{ \"jmeno\": \"Martin\", \"prijmeni\": \"ZborilGaraz\", \"autoskola-id\": 1, \"matricni-cislo\": 26549562 }"
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
            "body": "{ \"id\": 1, \"nazev\": \"Aotoskola1\", \"ucitele\" : [\n        { \"id\": 1, \"jmeno\": \"Martin\", \"prijmeni\": \"Skočdopole\", \"autoskola-id\": 1, \"opravneni\": [\"A\", \"B\"], \"pocet-deti\" : 2, \"datum-prohlidky\": \"2013-01-01\", \"url-dokumentu\": \"/prohlidky/asdasdasdad.pdf\"},\n        { \"id\": 2, \"jmeno\": \"Jacob\", \"prijmeni\": \"Slezstromu\", \"autoskola-id\": 2, \"opravneni\": [\"T\"], \"pocet-deti\" : 0, \"datum-prohlidky\": \"2013-05-01\", \"url-dokumentu\": \"/prohlidky/dddddfd.jpg\"}\n    ], \"vozidla\": [\n        { \"id\": 1, \"znacka\": \"Ford\", \"model\": \"Focus\", \"vin\": \"LJP05GFD5548913\", \"autoskola-id\": 1}\n    ], \"aktualni-studenti\" : [\n        { \"id\": 1, \"jmeno\": \"Martin\", \"prijmeni\": \"ZborilGaraz\", \"autoskola-id\": 1, \"matricni-cislo\": 26549562},\n        { \"id\": 2, \"jmeno\": \"Jacob\", \"prijmeni\": \"VjelDoPole\", \"autoskola-id\": 1, \"matricni-cislo\": 26549562},\n        { \"id\": 3, \"jmeno\": \"Lukas\", \"prijmeni\": \"SrazilChodce\", \"autoskola-id\": 1, \"matricni-cislo\": 26549562}\n    ]\n}"
          }
        ]
      }
    ]
  },
  {
    "name": "Kurzy Resources",
    "description": "The following is a section of resources related to Vozidla",
    "resources": [
      {
        "description": "Seznam kurzu    HOTOVO",
        "method": "GET",
        "url": "/autoskoly/{id}/kurzy",
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
            "body": "{ \"kurzy\": [\n    { \"id\": 1, \"identifikacni-cislo\": \"A201301\", \"typ\": \"A\", \"stav\": \"otevreny\", \"datum-od\": \"2013-01-01\", \"datum-do\": \"2013-04-01\",\n      \"hodiny-teorie\": [\n          {\"datum\": \"2013-01-01\", \"zacatek\": \"13:00\", \"konec\": \"15:00\", \"vyucujici\": \"Novak\" \"typ-vyuky\": \"teorie\"},\n          {\"datum\": \"2013-01-02\", \"zacatek\": \"14:00\", \"konec\": \"16:00\", \"vyucujici\": \"Novakova\" \"typ-vyuky\": \"zdravoveda\"}\n    ]},\n    { \"id\": 2, \"identifikacni-cislo\": \"B201302\", \"typ\": \"B\", \"stav\": \"otevreny\", \"datum-od\": \"2013-01-01\", \"datum-do\": \"2013-04-01\",\n      \"hodiny-teorie\": [\n          {\"datum\": \"2013-01-01\", \"zacatek\": \"13:00\", \"konec\": \"15:00\", \"vyucujici\": \"Novak\" \"typ-vyuky\": \"teorie\"},\n          {\"datum\": \"2013-01-02\", \"zacatek\": \"14:00\", \"konec\": \"16:00\", \"vyucujici\": \"Novakova\" \"typ-vyuky\": \"zdravoveda\"}\n    ]},\n    { \"id\": 3, \"identifikacni-cislo\": \"T201305\", \"typ\": \"T\", \"stav\": \"otevreny\", \"datum-od\": \"2013-01-01\", \"datum-do\": \"2013-04-01\",\n      \"hodiny-teorie\": [\n          {\"datum\": \"2013-01-01\", \"zacatek\": \"13:00\", \"konec\": \"15:00\", \"vyucujici\": \"Novak\" \"typ-vyuky\": \"teorie\"},\n          {\"datum\": \"2013-01-02\", \"zacatek\": \"14:00\", \"konec\": \"16:00\", \"vyucujici\": \"Novakova\" \"typ-vyuky\": \"zdravoveda\"}\n    ]}\n] }"
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
            "body": "{ \"vozidla\": [\n    { \"id\": 1, \"znacka\": \"Ford\", \"model\": \"Focus\", \"vin\": \"LJP05GFD5548913\", \"autoskola-id\": 1},\n    { \"id\": 2, \"znacka\": \"Skoda\", \"model\": \"Octavia\", \"vin\": \"LJP05GFD5541111\", \"autoskola-id\": 2 }\n] }"
          }
        ]
      },
      {
        "description": "Detail vozidla  HOTOVO",
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
            "body": "{ \"id\": 1, \"znacka\": \"Ford\", \"model\": \"Focus\", \"vin\": \"LJP05GFD5548913\", \"autoskola-id\": 1, \"pocet-km\" : 155555, \"datum-stk\": \"2014-05-01\", \n  \"pocatecni-stav-km\": 30000, \"typ\" : \"osobní automobil\", \"rok-vyroby\" : 2007, \"spz\" : \"2E2 2222\", \"prumerna-spotreba\" : 6.8,\n  \"jizdy\" : [\n    { \"id\": 1, \"datum\": \"2013-01-01\", \"ucitel\": 2, \"vozidlo\": 1, \"zak\": 1, \"cas-od\": \"15:00\", \"cas-do\": \"17:00\", \"pocet-ujetych-km\" : 15, \"spotreba\" : 6.7 },\n    { \"id\": 2, \"datum\": \"2013-01-01\", \"ucitel\": 1, \"vozidlo\": 1, \"zak\": 5, \"cas-od\": \"17:00\", \"cas-do\": \"18:50\", \"pocet-ujetych-km\" : 16, \"spotreba\" : 7.1 }\n  ], \"dokumenty\" : [\n    { \"id\": 1, \"nazev\" : \"STK a emise\", \"datum-vlozeni\" : \"2011-05-01\" },\n    { \"id\": 2, \"nazev\" : \"STK a emise 2\", \"datum-vlozeni\" : \"2013-05-01\" }\n  ] }"
          }
        ]
      },
      {
        "description": "Vytvoreni noveho vozidla    HOTOVO",
        "method": "POST",
        "url": "/vozidla",
        "request": {
          "headers": {
            "Content-Type": "application/json"
          },
          "body": "{ \"znacka\": \"Ford\", \"model\": \"Focus\", \"vin\": \"LJP05GFD5548913\", \"autoskola-id\": 1, \"datum-stk\": \"2014-05-01\", \n  \"pocatecni-stav-km\": 30000, \"typ\" : \"osobní automobil\", \"rok-vyroby\" : 2007, \"spz\" : \"2E2 2222\" }"
        },
        "responses": [
          {
            "status": 201,
            "headers": {
              "Content-Type": "application/json"
            },
            "body": "{ \"id\": 3, \"znacka\": \"Ford\", \"model\": \"Focus\", \"vin\": \"LJP05GFD5548913\", \"autoskola-id\": 1, \"datum-stk\": \"2014-05-01\", \n  \"pocatecni-stav-km\": 30000, \"typ\" : \"osobní automobil\", \"rok-vyroby\" : 2007, \"spz\" : \"2E2 2222\" }"
          }
        ]
      },
      {
        "description": "Upraveni vozidla    HOTOVO",
        "method": "PUT",
        "url": "/vozidla/{id}",
        "request": {
          "headers": {
            "Content-Type": "application/json"
          },
          "body": "{ \"znacka\": \"Ford\", \"model\": \"Focus\", \"vin\": \"LJP05GFD5548913\", \"autoskola-id\": 1, \"datum-stk\": \"2014-05-01\", \n  \"pocatecni-stav-km\": 30000, \"typ\" : \"osobní automobil\", \"rok-vyroby\" : 2007, \"spz\" : \"2E2 2222\" }"
        },
        "responses": [
          {
            "status": 200,
            "headers": {
              "Content-Type": "application/json"
            },
            "body": "{ \"znacka\": \"Ford\", \"model\": \"Focus\", \"vin\": \"vracene vin\", \"autoskola-id\": 1, \"datum-stk\": \"2014-05-01\", \n  \"pocatecni-stav-km\": 30000, \"typ\" : \"osobní automobil\", \"rok-vyroby\" : 2007, \"spz\" : \"2E2 2222\" }"
          }
        ]
      },
      {
        "description": "Odstraneni vozidla    HOTOVO",
        "method": "DELETE",
        "url": "/vozidla/{id}",
        "request": {
          "headers": {},
          "body": null
        },
        "responses": [
          {
            "status": 200,
            "headers": {},
            "body": null
          }
        ]
      },
      {
        "description": "Odstraneni dokumentu    HOTOVO",
        "method": "DELETE",
        "url": "/dokumenty/{id}",
        "request": {
          "headers": {},
          "body": null
        },
        "responses": [
          {
            "status": 200,
            "headers": {},
            "body": null
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
            "body": "{ \"jizdy\": [\n    { \"id\": 1, \"datum\": \"2013-01-01\", \"ucitel\": 2, \"vozidlo\": 1, \"zak\": 1, \"doba-jizdy\": \"02:00\", \"pocet-ujetych-km\" : 15, \"spotreba\" : 6.7 },\n    { \"id\": 2, \"datum\": \"2013-01-01\", \"ucitel\": 1, \"vozidlo\": 1, \"zak\": 5, \"doba-jizdy\": \"01:50\", \"pocet-ujetych-km\" : 16, \"spotreba\" : 7.1 }\n] }"
          }
        ]
      },
      {
        "description": "Vytvoreni nove jizdy    HOTOVO",
        "method": "POST",
        "url": "/jizdy",
        "request": {
          "headers": {
            "Content-Type": "application/json"
          },
          "body": "{ \"datum\": \"2013-01-01\", \"ucitel\": 2, \"vozidlo\": 1, \"zak\": 1, \"cas-od\": \"15:00\", \"cas-do\": \"17:00\", \"pocet-ujetych-km\" : 15, \"spotreba\" : 6.7 },"
        },
        "responses": [
          {
            "status": 201,
            "headers": {
              "Content-Type": "application/json"
            },
            "body": "{ \"id\": 3, \"datum\": \"2013-01-01\", \"ucitel\": 2, \"vozidlo\": 1, \"zak\": 1, \"cas-od\": \"15:00\", \"cas-do\": \"17:00\", \"pocet-ujetych-km\" : 15, \"spotreba\" : 6.7 }"
          }
        ]
      },
      {
        "description": "Odstraneni jizdy    HOTOVO",
        "method": "DELETE",
        "url": "/jizdy/{id}",
        "request": {
          "headers": {},
          "body": null
        },
        "responses": [
          {
            "status": 200,
            "headers": {},
            "body": null
          }
        ]
      }
    ]
  }
]