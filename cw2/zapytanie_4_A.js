printjson(
    db.people.aggregate(
    [
        {$project: {
            nationality: 1,
            height: {$divide: [{$toDecimal: '$height'},  100]},
            weight: {$toDecimal: '$weight'}
            }
        }, 
        {$project: {
            nationality: 1,
            bmi: {
                $divide: ['$weight',
                            {$multiply: ['$height','$height']}
                        ]
                }
            }
        }, 
        {$group: {
            _id: '$nationality',
            avg_bmi: {$avg: '$bmi'},
            min_bmi: {$min: '$bmi'},
            max_bmi: {$max: '$bmi'}
            }
        }, 
        {$sort: {_id: 1}},
        {$project: {
            _id: 0,
            nationality: "$_id",
            avg_bmi: {$round: ["$avg_bmi", 2]},
            min_bmi: {$round: ["$min_bmi", 2]},
            max_bmi: {$round: ["$max_bmi", 2]},
            }
        }
    ]
    ).toArray()
)

