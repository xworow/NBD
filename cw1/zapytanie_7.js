printjson(
    db.people.remove(
        {height: {$gt: "190"}}
    )
)