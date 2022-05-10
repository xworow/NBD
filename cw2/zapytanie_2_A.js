
printjson(
    db.people.aggregate(
    [
		{$unwind: {
            	path: '$credit'
        	}
		}, 
		{$group: {
            	_id: '$credit.currency',
            	summary_balance: {
             		$sum: {
              			$toDecimal: '$credit.balance'
             		}
            	}
        	}
		}, 
		{$sort: {
            	_id: 1
           	}
		}
	]
    ).toArray()
);