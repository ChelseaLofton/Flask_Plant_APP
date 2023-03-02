import requests
# import yaml
import logging
import sys
# from tabulate import tabulate
import os

client_secret = os.environ.get('CLIENT_SECRET')
client_id = os.environ.get('CLIENT_ID')
token = os.environ.get('TOKEN')


logging.basicConfig()
_LOGGER = logging.getLogger(__name__)
_LOGGER.setLevel(logging.INFO)

# curl --location 'https://open.plantbook.io/api/v1/token/' \
# --form 'grant_type="client_credentials"' \
# --form 'client_id="lK0bHixwBIjEtY1IbDunhhQZCUB397zy2bAicja3"' \
# --form 'client_secret="U4lMm8WoCIl7JZRtRi4kYYS2LhPtcDgbgap37gX3Rv6RyG0UpCepyZtY7u6O2xSbR3ucHEgTTlWuoL3JwdbqD59qF31BnU23pcu4uV72HDV0cRQpZ6MwwkcRFePho1gt"'

def get_plantbook(alias, token):
    """ Searches plantbook and list results """
    url = "https://open.plantbook.io/api/v1/plant/search?limit=1000&alias={}".format(alias)
    headers = {"Authorization": "Bearer 11dcd3d1dd35be104d5b3aa292aa1887c8dc80ea  {}".format(token)}
    try:
        result = requests.get(url, headers=headers)
        result.raise_for_status()
    except requests.exceptions.Timeout:
        # Maybe set up for a retry, or continue in a retry loop
        _LOGGER.error("Timeout connecting to {}".format(url))
        return
    except requests.exceptions.TooManyRedirects:
        # Tell the user their URL was bad and try a different one
        _LOGGER.error("Too many redirects connecting to {}".format(url))
        return
    except requests.exceptions.HTTPError as err:
        _LOGGER.error(err)
        return
    except requests.exceptions.RequestException as err:
        # catastrophic error. bail.
        _LOGGER.error(err)
        return
    
    return result.json()



    # _LOGGER.debug("Fetched data from {}:".format(url))
    # _LOGGER.debug(res)
    # print(tabulate(res['results'], headers={'pid': 'PID', 'display_pid': 'Display PID', 'alias': 'Alias'}, tablefmt="psql"))
    # print("{} plants found".format(len(res['results'])))

def search_plantbook(species, token):
    """ Searches plantbook and list results """
    url = "https://open.plantbook.io/api/v1/plant/detail/{}".format(species)  # plug species into curly braces
    headers = {"Authorization": "Bearer RTyPsxwvGknYr1UrNCskDVUBK2bWq6{}".format(token)}                     # 
    try:
        result = requests.get(url, headers=headers)                 #make request and save to result
        result.raise_for_status()
    except requests.exceptions.Timeout:
        # Maybe set up for a retry, or continue in a retry loop
        _LOGGER.error("Timeout connecting to {}".format(url))
        return
    except requests.exceptions.TooManyRedirects:
        # Tell the user their URL was bad and try a different one
        _LOGGER.error("Too many redirects connecting to {}".format(url))
        return
    except requests.exceptions.HTTPError as err:
        _LOGGER.error(err)
        return
    except requests.exceptions.RequestException as err:
        # catastrophic error. bail.
        _LOGGER.error(err)
        return
    return result.json()                                             #convert result to json
    
    
    # _LOGGER.debug("Fetched data from {}:".format(url))
    # _LOGGER.debug(res)
    # print(tabulate(res.items(), headers=['Key', 'Value'], tablefmt="psql"))

    # print(tabulate(res['results'], headers={'pid': 'PID', 'display_pid': 'Display PID', 'alias': 'Alias'}, tablefmt="psql"))
    # print("{} plants found".format(len(res['results'])))


def get_plantbook_token(client_id, client_secret):
    """ Gets the token from the openplantbook API """
    url = 'https://open.plantbook.io/api/v1/token/'
    data = {
        'grant_type': 'client_credentials',
        'client_id': client_id,
        'client_secret': client_secret
    }
    try:
        result = requests.post(url, data=data)
        result.raise_for_status()
    except requests.exceptions.Timeout:
        # Maybe set up for a retry, or continue in a retry loop
        _LOGGER.error("Timeout connecting to {}".format(url))
        return
    except requests.exceptions.TooManyRedirects:
        # Tell the user their URL was bad and try a different one
        _LOGGER.error("Too many redirects connecting to {}".format(url))
        return
    except requests.exceptions.HTTPError as err:
        _LOGGER.error(err)
        return
    except requests.exceptions.RequestException as err:
        # catastrophic error. bail.
        _LOGGER.error(err)
        return
    token = result.json().get('access_token')
    _LOGGER.debug("Got token {} from {}".format(token, url))
    
    return token

print(token)


# with open('config.yaml') as file:
#     try:
#         config = yaml.load(file, Loader=yaml.FullLoader)
#     except Exception:
#         print("Unable to open 'config.yaml'")
#         sys.exit()

# if len(sys.argv) < 2:
#     print("Usage: {} <name>".format(sys.argv[0]))
#     sys.exit(1)

# searchstring = sys.argv[1]

# if 'openplantbook' in config:
#     token = get_plantbook_token(
#         config['openplantbook']['client_id'], config['openplantbook']['secret'])
#     search_plantbook(searchstring, token)

print("connected")