from plantbook import search_plantbook 
from plantbook import get_plantbook_token

import os 

client_secret = os.environ.get('PB_SECRET')
client_id = 'lK0bHixwBIjEtY1IbDunhhQZCUB397zy2bAicja3'
token = os.environ.get('BEARER_TOKEN')

begonia = search_plantbook("strelitzia reginae", token)
token = get_plantbook_token
# begonia = get_plantbook("begonia", token)


print(begonia)