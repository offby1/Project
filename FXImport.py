__author__ = 'emmaachberger'

import requests
import datetime
import pandas as pd
from sqlalchemy import create_engine


engine = create_engine('sqlite:///money.db')

start_date = "2015-10-06"  # False or Format "YYYY-MM-DD"
end_date = False  # False or Format "YYYY-MM-DD"


def downloadFX():

    import instance
    line = [
        ['address', 'http://apilayer.net/api/historical?'],
        ['access_key', instance.fxaccesskey()],
        ['date', '2010-08-13'],
        ['currencies', 'CAD'],
        ['format', 1]
    ]

    rates = []

    if (end_date == False):
        today = (datetime.date.today())
    else:
        today = datetime.datetime.strptime(end_date, '%Y-%m-%d').date()

    if (start_date == False):
        days = 2
    else:
        days = (today - datetime.datetime.strptime(start_date, '%Y-%m-%d').date()).days


    for i in range(days):
        line[2][1] = str(today - datetime.timedelta(i))
        add = ""
        add += line[0][1]
        add += line[1][0] + "=" + line[1][1]
        add += "&" + line[2][0] + "=" + line[2][1]
        add += "&" + line[3][0] + "=" + line[3][1]
        add += "&" + line[4][0] + "=" + str(line[4][1])
        r = requests.get(add)
        rates.append([today - datetime.timedelta(i), r.json()['quotes'].values()[0]])

    return rates, today


def uploadFX(rates):

    table = rates[0]
    today = rates[1]

    df = pd.read_sql_table('fxrates', engine, parse_dates='FXDate')

    df.loc[df.loc[:, 'FXDate'] == table[0][0], 'Rate'] = table[0][1]

    for i in range(len(table)):

        if i == 0 and today == datetime.date.today():
            df.loc[df.loc[:, 'FXDate'] >= table[i][0], 'Rate'] = table[i][1]
        else:
            df.loc[df.loc[:, 'FXDate'] == table[i][0], 'Rate'] = table[i][1]

    df = df.iloc[:, 1:]

    df.to_csv('CSVs/FX rates.csv', index=False)


def fximport():
    uploadFX(downloadFX())


