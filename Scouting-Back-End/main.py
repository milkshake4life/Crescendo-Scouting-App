import requests

headers = {'X-TBA-Auth-Key': ''}
r = requests.get('https://www.thebluealliance.com/api/v3/status', headers=headers)
print(r)