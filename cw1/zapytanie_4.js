printjson(
    db.people.aggregate(
        [ 
            {$addFields: {
                convertedWeight: {$convert : {input: "$weight", to: "decimal"}}
                }
            },
            {$match: {convertedWeight: {$gt: 68, $lt: 71.5}}},
            {$project: {convertedWeight: 0}}
        ]
    ).toArray()
)