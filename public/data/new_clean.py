# 2020.01.03 --> to read end of 2019 json article 
#get data: article type / headline / pub_date / web_url / newsDesk / keyword 
# import json
# test = []
# new = []


# with open("/Users/joannayen24/Desktop/data_exp/news_keyword/public/data/nyt/2019-09_nyt.json") as json_file:
#     obj = json.load(json_file)
#     test.append(obj)
#     print(test[0][1]['web_url'])
#     for i in range(len(test[0])):
#         if(test[0][i]["document_type"] == "article"):
#             new.append({
#                 "document_type": test[0][i]["document_type"], 
#                 "headline": test[0][i]["headline"]['main'],
#                 "pub_date": test[0][i]["pub_date"],
#                 "web_url": test[0][i]["web_url"],
#                 "news_desk": test[0][i]["news_desk"],
#                 "keywords": test[0][i]["keywords"]
#             })

# open('2019-09_nyt.json', 'w').write(
#     json.dumps(new, sort_keys=False, indent=4, separators=(',', ': '))
# )

# print('finish json file')

import json
import os

# # find duplicate based on the headline and create a new list without duplicate          
# # print([dict(t) for t in {tuple(d.items()) for d in l}])

# test = []
# with open("/Users/joannayen24/Desktop/data_exp/news_keyword/public/data/duplicate/2019-12_nyt.json") as json_file:
#     obj = json.load(json_file)
#     test.append([i for n, i in enumerate(obj) if i not in obj[n + 1:]])
# open('2019-11_nyt.json', 'w').write(
#     json.dumps(test, sort_keys=False, indent=4, separators=(',', ': '))
# )
# 2020 - 01 - 06 
# test the kwyword with first and last name
#name = {"keywords": [
#                 {
#                     "name": "organizations",
#                     "value": "Supreme Court (US)",
#                     "rank": 1,
#                     "major": "N"
#                 },
#                 {
#                     "name": "subject",
#                     "value": "Gun Control",
#                     "rank": 2,
#                     "major": "N"
#                 },
#                 {
#                     "name": "subject",
#                     "value": "Second Amendment (US Constitution)",
#                     "rank": 3,
#                     "major": "N"
#                 },
#                 {
#                     "name": "subject",
#                     "value": "Constitution (US)",
#                     "rank": 4,
#                     "major": "N"
#                 },
#                 {
#                     "name": "subject",
#                     "value": "Suits and Litigation (Civil)",
#                     "rank": 5,
#                     "major": "N"
#                 },
#                 {
#                     "name": "persons",
#                     "value": "Gorsuch, Neil M",
#                     "rank": 6,
#                     "major": "N"
#                 },
#                 {
#                     "name": "persons",
#                     "value": "Kavanaugh, Brett M",
#                     "rank": 7,
#                     "major": "N"
#                 },
#                 {
#                     "name": "persons",
#                     "value": "Kennedy, Anthony M",
#                     "rank": 8,
#                     "major": "N"
#                 },
#                 {
#                     "name": "persons",
#                     "value": "Scalia, Antonin",
#                     "rank": 9,
#                     "major": "N"
#                 },
#                 {
#                     "name": "persons",
#                     "value": "Stevens, John Paul",
#                     "rank": 10,
#                     "major": "N"
#                 },
#                 {
#                     "name": "persons",
#                     "value": "Thomas, Clarence",
#                     "rank": 11,
#                     "major": "N"
#                 }
#             ]
#     }

# for i in range(len(name['keywords'])):
#     if(name['keywords'][i]["name"] == "persons"):
#         print(name['keywords'][i]['value'])
#         print(type(name['keywords'][i]['value']))
#         new = name['keywords'][i]['value'].split(', ')
#         print("last name", new[0])
#         print('first name', new[1])

test = []
# create a new list
with open("/Users/joannayen24/Desktop/data_exp/news_keyword/public/data/duplicate/2019-12_nyt.json") as json_file:
    obj = json.load(json_file)
    for i in range(len(obj)):

        for j in range(len(obj[i]['keywords'])):
            if(obj[i]['keywords'][j]['name'] == "persons"):
                new = obj[i]['keywords'][j]['value'].split(', ')
                if(len(new) == 1): 
                    print(new)
            else: 
                continue

# process --> to get specific keywords for final site--> climate change / meToo / Education / Barack Obama / Trump
# make every other line longer