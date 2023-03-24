import requests
import os
import json
import urllib.parse

"""
First Things First!
    IMPORTANT! The $PLANTBOOK_ACCESS_TOKEN needs to be written in secrets.sh. 

Run this in the terminal once a day. The API_TOKEN is good for 86400 seconds. Curl command was
found in the PlantBook API documentation.

Run this =>

    export PLANTBOOK_ACCESS_TOKEN=$(curl --location 'https://open.plantbook.io/api/v1/token/' \
        --form 'grant_type="client_credentials"' \
        --form "client_id=\"${CLIENT_ID}\"" \
        --form "client_secret=\"${CLIENT_SECRET}\"" -s | jq -r .access_token)

    curl 'https://open.plantbook.io/api/v1/plant/detail/platanus%20acerifolia/' \
        -H "Authorization: Bearer ${PLANTBOOK_ACCESS_TOKEN}" \
        -H "Accept: application/json" | jq

        
To get the PlantBook API token to copy and paste into secrets.sh
Dont' forget to source secrets.sh after it has been added to secrets.sh

Run this in the terminal =>
    
    echo $PLANTBOOK_ACCESS_TOKEN


    """


class PlantBookAPI(object):

    BASE_URL = "https://open.plantbook.io/api/v1"

    def __init__(self, client_id, client_secret):

        self.client_id = client_id
        self.client_secret = client_secret
        self.logged_in = False


        token = os.environ.get("PLANTBOOK_ACCESS_TOKEN", None)
        if token is not None:
            self._create_session(token)



    def login(self):
        if self.logged_in:
            return True

        post_data = {
            "grant_type": "client_credentials",
            "client_id": self.client_id,
            "client_secret": self.client_secret,
        }

        r = requests.post(f"{PlantBookAPI.BASE_URL}/token/", data=post_data)
        if r.status_code != 200:
            raise Exception(
                f"Unable to generate access_token (HTTP {r.status_code})")

        self._create_session(response.json()["access_token"])
        return True


    def _create_session(self, token):
        self.session = requests.Session()
        self.session.headers.update({
            'Authorization': f"Bearer {token}"
        })
        self.logged_in = True

    # @endpoint string - The part of the path that comes after /api/v1.
    #     e.g. https://open.plantbook.io/api/v1/plant/search would have endpoint = "/plant/search"
    # @kwargs - A list of arguments to pass as ?kwarg1=val1&kwarg2=val2.
    #     e.g. https://open.plantbook.io/api/v1/plant/search?alias=acer&limit=10&offset=20 would
    #     have the same endpoint as above and be called like so:
    #     client.get("/plant/search", alias=acer, limit=1, offset=20)
    #
    # API docs for all endpoints and arguments:
    # https://documenter.getpostman.com/view/12627470/TVsxBRjD#intro
    
    
    def get(self, endpoint, **kwargs):
        url = f"{PlantBookAPI.BASE_URL}{endpoint}"
        return self.session.get(url, params=kwargs)


# Uncomment to test.
client = PlantBookAPI(os.environ["CLIENT_ID"], os.environ["CLIENT_SECRET"])
# print(json.dumps(client.get("/plant/search", alias="acer", limit=5).json()))


# pid = "platanus acerifolia"

# calathea_11 = client.get(f"/plant/detail/{urllib.parse.quote(pid)}/").json()
# print(calathea_11)
