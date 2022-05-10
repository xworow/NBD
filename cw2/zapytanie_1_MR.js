var map_function = function() {
    var key = this.sex;
    var value = {total_height: parseFloat(this.height), 
                total_weight: parseFloat(this.weight), 
                avg_height: 0,
                avg_weight: 0,
                counter: 1};
    emit(key, value);
};


var reduce_function = function(key, values) {
    var reduced_values =    {total_height: 0, 
                            total_weight: 0, 
                            avg_height: 0, 
                            avg_weight: 0, 
                            counter: 0};
    
    values.forEach(function(value) {
        reduced_values.total_height += value.total_height;
        reduced_values.total_weight += value.total_weight;
        reduced_values.counter += value.counter;
    });

    return (reduced_values);
};


var finalize_function = function(key, reduced_values) {
    if(reduced_values.counter > 0) {
        reduced_values.avg_height = reduced_values.total_height / reduced_values.counter;
        reduced_values.avg_weight = reduced_values.total_weight / reduced_values.counter;
    };

    return (reduced_values);
};


db.people.mapReduce(
    map_function,
    reduce_function,
    {
        out: "people_stats",
        finalize: finalize_function
    }
);


printjson(
    db.people_stats.find().toArray()
);