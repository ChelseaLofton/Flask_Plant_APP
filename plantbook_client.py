import requests
import os
import json


class PlantBookAPI(object):
    # All PlantBook API URLs begin with this. You only need to
    # pass what comes after /api/v1 as the endpoint to PlantBookAPI.get().
    BASE_URL = "https://open.plantbook.io/api/v1"


    def __init__(self, client_id, client_secret):
        """
        Run this in your terminal once a day. The API_TOKEN is good for 86400 seconds. 
        IMPORTANT! The $PLANTBOOK_ACCESS_TOKEN this command sets is ephemeral unless you
        take the second step of writing it to your secrets.sh. You will need to either
        re-run it in each terminal session or write it to secrets.sh

        export PLANTBOOK_ACCESS_TOKEN=$(curl --location 'https://open.plantbook.io/api/v1/token/' \
            --form 'grant_type="client_credentials"' \
            --form "client_id=\"${CLIENT_ID}\"" \
            --form "client_secret=\"${CLIENT_SECRET}\"" -s | jq -r .access_token)

        Just echo $PLANTBOOK_ACCESS_TOKEN to get the value and write it to secrets.sh. 
        """
        self.client_id = client_id
        self.client_secret = client_secret
        self.logged_in = False

        # Check and see if our access_token has been cached in our local environment. 
        # If so assume it's good to go and create a session.
        token = os.environ.get("PLANTBOOK_ACCESS_TOKEN", None)
        if token is not None:
            self._create_session(token)

    # You can call this to generate an access_token directly from your Python code.
    # Eventually, you will want to call this and cache the token somewhere.
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
            raise Exception(f"Unable to generate access_token (HTTP {r.status_code})")
        
        self._create_session(response.json()["access_token"])
        return True

    # Sets up the requests.Session() object with the correct OAuth2 Authorization
    # HTTP header so we don't have 
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
    # See API docs for all endpoints and arguments:
    # https://documenter.getpostman.com/view/12627470/TVsxBRjD#intro
    def get(self, endpoint, **kwargs):
        return self.session.get(f"{PlantBookAPI.BASE_URL}{endpoint}", params=kwargs)

# Uncomment to test.    
client = PlantBookAPI(os.environ["CLIENT_ID"], os.environ["CLIENT_SECRET"])
# print(json.dumps(client.get("/plant/search", alias="acer", limit=5).json()))







# ##Plant search by alias only returns name/species/category values
# plant_data = {
#     "calathea_11": client.get("/plant/search", alias="calathea setosa", limit=None).json(),
#     "euphorbia_20": client.get("/plant/search", alias="euphorbia tirucalli", limit=5).json(),
#     "heartleaf_philo_10": client.get("/plant/search", alias="philodendron hederaceum", limit=5).json(),
#     "large_bop_01": client.get("/plant/search", alias="strelitzia", limit=5).json(),
#     "jeweled_orchid_12": client.get("/plant/search", alias="ludisia discolor", limit=5).json(),
#     "money_tree_05": client.get("/plant/search", alias="pachira aquatica", limit=5).json(),
#     "purple_sword_24": client.get("/plant/search", alias="alocasia calidora", limit=5).json(),
#     "angel_wing_begonia_22": client.get("/plant/search", alias="begonia grandis", limit=5).json(),
#     "hilo_beauty_07": client.get("/plant/search", alias="caladium bicolor", limit=5).json(),
#     "entry_pothos_23": client.get("/plant/search", alias="epipremnum aurem", limit=5).json(),
#     "livingroom_pothos_21": client.get("/plant/search", alias="epipremnum aurem", limit=5).json(),
#     "old_man_cactus_04": client.get("/plant/search", alias="espostoa melanostele", limit=5).json(),
#     "philodendron_birkin_09": client.get("/plant/search", alias="philodendron con go", limit=5).json(),
#     "pink_princess_02": client.get("/plant/search", alias="philodendron erubescens", limit=5).json(),
#     "snake_plant_08": client.get("/plant/search", alias="saint georges sword", limit=5).json(),
#     "stromanthe_triostar_03": client.get("/plant/search", alias="stromanthe sanguinea", limit=5).json(),
#     "queen_lily_30": client.get("/plant/search", alias="spathiphyllum bingo cupido", limit=5).json(),
#     "alocasia_black_stem_32": client.get("/plant/search", alias="alocasia calidora", limit=5).json(),
#     "aloe_vera_05": client.get("/plant/search", alias="aloe vera", limit=5).json(),
#     "rubber_tree_06": client.get("/plant/search", alias="ficus elastica", limit=5).json(),
#     "small_bop_31": client.get("/plant/search", alias="strelitzia", limit=5).json(), 
# }



# calathea_11: client.get("/plant/details", pid="calathea setosa", limit=5).json()

# print(calathea_11)


print(plant_data["alocasia_black_stem_32"])