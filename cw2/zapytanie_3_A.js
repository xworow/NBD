

printjson(
    db.people.aggregate(
    [
        {$group: {
                _id: '$job',
                fieldN: {
                    $sum: 1
                }
            }
        }, 
        {$project: {
                _id: 0,
                job: '$_id'
            }
        },
        {$sort: {
                job: 1
            }
    }
    ]
    ).toArray()
);