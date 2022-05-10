var map_function_4 = function(){
    var key = this.nationality;
    var weight = parseFloat(this.weight);
    var height = parseFloat(this.height)/100;
    var bmi = weight/(height*height);

    var value = {
            avg_bmi: bmi,
            min_bmi: bmi,
            max_bmi: bmi,
            counter: 1
        };

    emit(key, value);
}

var reduce_function_4 = function(key, values) {
    
    var reduced_values = {
        avg_bmi: 0,
        min_bmi: 0,
        max_bmi: 0,
        counter: 0
    };
    
    // Duza wartość BMI ktora nie występuje w rzeczywistosci
    var tmp_min_bmi = 10000;

    // Mala wartosc BMI ktora nie wystepuje w rzeczywistosci
    var tmp_max_bmi = -1;

    values.forEach(function(value) {

        if (value.min_bmi < tmp_min_bmi) {
            reduced_values.min_bmi = value.min_bmi;
            tmp_min_bmi = value.min_bmi;
        };

        if (value.max_bmi > tmp_max_bmi) {
            reduced_values.max_bmi = value.max_bmi;
            tmp_max_bmi = value.max_bmi;
        };

        reduced_values.avg_bmi += value.avg_bmi;
        reduced_values.counter += value.counter;
    });

    return reduced_values;
};

var finalize_function_4 = function(key, reduced_values) {
    if(reduced_values.counter > 1) {
        reduced_values.avg_bmi = reduced_values.avg_bmi / reduced_values.counter;
    };

    return (reduced_values);
};

db.people.mapReduce(
    map_function_4,
    reduce_function_4,
    {
        out: "bmi_stats",
        finalize: finalize_function_4
    }
);

printjson(
    db.bmi_stats.find().sort({_id: 1}).toArray()
);