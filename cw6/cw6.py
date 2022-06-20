#kod przygotowany na środowisku z pyton'em 3.5
# conda create --name py35 python=3.5
# conda activate py35
# pip install riak

import riak

myClient = riak.RiakClient(http_port=8098)

myBucket = myClient.bucket('s25336')

student = {"imie": "Zenon", 
            "nazwisko": "Wojciechowski", 
            "narodowosc": "Polska", 
            "rok_urodzenia": 2002}

#zapisanie danych
key = myBucket.new("s10", data=student)
key.store()

#pobranie danych
fetched = myBucket.get("s10")
print(fetched.data)

#aktualizacja danych
fetched.data["nazwisko"] = "Adamski"
fetched.store()

fetched = myBucket.get("s10")
print(fetched.data)

#usunięcie danych 
fetched.delete()
fetched = myBucket.get("s10")
print(fetched)
print(myBucket.get("s10").exists)