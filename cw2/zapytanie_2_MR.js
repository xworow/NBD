var map_function_2 = function(){
    for(var idx=0; idx < this.credit.length; idx++){
        var key = this.credit[idx].currency;
        var value = parseFloat(this.credit[idx].balance);

        emit(key, value); 
    }
};

var reduce_function_2 = function(key, values) {
    return Array.sum(values);
};

db.people.mapReduce(
    map_function_2,
    reduce_function_2,
    {
        out: "summary_balance",
    }
);

printjson(
    db.summary_balance.find().sort({_id: 1}).toArray()
);