printjson(
    db.people.insertOne(
        {
            "sex": "Male",
            "first_name": "Michal",
            "last_name": "Worowski",
            "job": "Analyst",
            "email": "s25336@pjwstk.edu.pl",
            "location": {
                "city": "Warsaw",
                "address": {
                    "streetname": "Koszykowa",
                    "streetnumber": "86"
                }
            },
            "description": "donec posuere metus vitae ipsum aliquam non mauris morbi non lectus aliquam sit amet diam in",
            "height": "178",
            "weight": "67",
            "birth_date": "1983-08-13T05:44:11Z",
            "nationality": "Poland",
            "credit": [
                {
                "type": "poor_card",
                "number": "5586087121891962",
                "currency": "PLN",
                "balance": "20.0"
                },
                {
                "type": "poorer_card",
                "number": "5010120787942724",
                "currency": "PLN",
                "balance": "2.65"
                }
            ]
        }
    )
)