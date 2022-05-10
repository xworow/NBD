printjson(
    db.people.aggregate(
        [{$match: {
            sex: 'Female',
            nationality: 'Poland'
           }}, {$unwind: {
            path: '$credit'
           }}, {$project: {
            currency: '$credit.currency',
            balance: {
             $toDecimal: '$credit.balance'
            }
           }}, {$group: {
            _id: '$currency',
            avg_balance: {
             $avg: '$balance'
            },
            sum_balance: {
             $sum: '$balance'
            }
           }}, {$project: {
            _id: 0,
            currency: '$_id',
            avg_balance: {
             $round: [
              '$avg_balance',
              2
             ]
            },
            sum_balance: {
             $round: [
              '$sum_balance',
              2
             ]
            }
           }}, {$sort: {
            currency: 1
           }}]
    ).toArray()
)




