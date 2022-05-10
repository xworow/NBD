var map_function_3 = function(){
    emit(this.job, 1); 
};

var reduce_function_3 = function(key, values) {
    return 1;
};

db.people.mapReduce(
    map_function_3,
    reduce_function_3,
    {
        out: "jobs"
    }
);

printjson(
    db.jobs.find().sort({_id: 1}).toArray()
);
