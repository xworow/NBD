
printjson(
    db.people.aggregate(
        [   {$addFields: {
                conv_birth_date: {
                    $dateFromString: {dateString: "$birth_date"}
                    }
                }
            },
            {$project: {_id: 0,
                        birth_year: {$year:"$conv_birth_date"},
                        first_name: 1,
                        last_name: 1,
                        "location.city": 1
                        }
            },
            {$match: {birth_year: {$gte: 2000}}},
            {$project: {birth_year: 0}}
        ]
    ).toArray()
)
