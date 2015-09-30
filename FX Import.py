__author__ = 'emmaachberger'

import requests
from datetime import date, timedelta
import instance

line = [
['address', 'http://apilayer.net/api/historical?'],
['access_key',instance.fxaccesskey()],
['date','2010-08-13'],
['currencies','CAD'],
['format',1]
    ]

rates = []
today = (date.today())
for i in range(3):
    line[2][1] = str(today - timedelta(i))
    add = ""
    add += line[0][1]
    add += line[1][0] + "=" + line[1][1]
    add += "&" + line[2][0] + "=" + line[2][1]
    add += "&" + line[3][0] + "=" + line[3][1]
    add += "&" + line[4][0] + "=" + str(line[4][1])
    r = requests.get(add)
    rates.append([today - timedelta(i),r.json()['quotes'].values()[0]])

print rates