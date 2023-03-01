from plantbook import search_plantbook

import os 

secret = os.environ.get('PB_SECRET')
client_id = 'lK0bHixwBIjEtY1IbDunhhQZCUB397zy2bAicja3'
token = os.environ.get('PB_TOKEN')
bearer_token = os.environ.get('BEARER_TOKEN')

begonia = search_plantbook("begonia rex cultorum", token)


print(begonia)