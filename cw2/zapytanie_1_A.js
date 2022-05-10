printjson(
    db.people.aggregate(
        [{$group: {
            _id: '$sex',
            avg_height: {
                $avg: {$toDecimal: '$height'}
            },
            avg_weight: {
                $avg: {$toDecimal: '$weight'}
            }
        }}, 
        {$project: {
            _id: 0,
            sex: '$_id',
            avg_height: {$round: ['$avg_height', 2]},
            avg_weight: {$round: ['$avg_weight', 2]}
        }}]
    ).toArray()
)