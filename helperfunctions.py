__author__ = 'emmaachberger'


def table_of_dates(y, m, d, t):
### create dataframe of dates from inception until today. returns resulting dataframe

    import pandas as pd
    import datetime

    start_date = datetime.date(y,m,d)

    index = pd.date_range(start=start_date, end=datetime.datetime.today()+datetime.timedelta(days=400), freq=t)

    df = pd.DataFrame(index=index)
    df.reset_index(inplace=True)
    df.columns = ['transdate']
    return df



def convert(native, curr, fx):
### returns USD amount if USD and converts to CAD if otherwise

    if curr == "USD":
        return native
    else:
        return native / fx

def returnTable(df):
# returns list of table columns and data to be sent to google charts

    columns = df.columns.tolist()
    columns = columns
    data = df.values.tolist()

    list = [columns]
    list.append(data)

    return list


def droplevel(df, col1='transdate', col2='owner', col3='fxrate'):
    # for pivoted dataframes. Will drop level of column titles and replace first 3 columns

    df.columns = df.columns.droplevel()
    names = df.columns.tolist()
    names[0:3] = [col1, col2, col3]
    df.columns = names
    return df