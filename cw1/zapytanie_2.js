printjson(
    db.people.find(
        {"sex": "Female", "nationality": "China"}
    ).limit(1).toArray()
)