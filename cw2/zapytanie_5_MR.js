var map_function_5 = function(){

    var value = {
        avg_balance: 0,
        sum_balance: 0,
        counter: 1
    }

    for(var idx=0; idx < this.credit.length; idx++){

        var key = this.credit[idx].currency;
        var balance = parseFloat(this.credit[idx].balance);

        value.avg_balance = balance;
        value.sum_balance = balance;

        emit(key, value); 
    }
};

var reduce_function_5 = function(key, values) {

    var reduced_values = {
        avg_balance: 0,
        sum_balance: 0,
        counter: 0
    }

    values.forEach(function(value) {
        reduced_values.sum_balance += value.sum_balance;
        reduced_values.counter += value.counter;
    });

    return reduced_values;
};


var finalize_function_5 = function(key, reduced_values) {
    if(reduced_values.counter > 0) {
        reduced_values.avg_balance = reduced_values.sum_balance / reduced_values.counter;
    };

    return (reduced_values);
};


db.people.mapReduce(
    map_function_5,
    reduce_function_5,
    {
        out: "polish_women_sum_balance",
        query: {sex: "Female",
                nationality: "Poland"},
        finalize: finalize_function_5
    }
);

printjson(
    db.polish_women_sum_balance.find().sort({_id: 1}).toArray()
);