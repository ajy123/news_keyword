#get database data for site
#create a new article json
import os
import json

## generate all question with ? from 2010 - 2019 sept
# final = []
# dir_name = "/Users/joannayen24/Desktop/data_exp/news_keyword/public/data/nyt"
# for file in os.listdir(dir_name):
#     full_filename = "%s/%s" % (dir_name, file)
#     with open(full_filename,'rb') as f:
#         print(full_filename[-16:])
#         d = json.load(f)
#         for i in range(len(d)):
#             if(d[i]['headline']['main'][-1] == "?"):
#                 final.append({
#                     "document_type": d[i]['document_type'],
#                     "headline": d[i]['headline']['main'],
#                     "pub_date": d[i]['pub_date'],
#                     "web_url": d[i]['web_url'],
#                     "news_desk": d[i]['news_desk'],
#                     "keywords": d[i]['keywords']
#                 })

# print(final)           
# open('test_article_nyt.json', 'w').write(
#     json.dumps(final, sort_keys=False, indent=4, separators=(',', ': '))
# )

## generate all question with ? from 2019 sept - 2019 dec
# final = []
# dir_name = "/Users/joannayen24/Desktop/data_exp/news_keyword/public/data/test"
# for file in os.listdir(dir_name):
#     full_filename = "%s/%s" % (dir_name, file)
#     with open(full_filename,'rb') as f:
#         print(full_filename[-16:])
#         d = json.load(f)
#         for i in range(len(d)):
#             if(d[i]['headline'][-1] == "?"):
#                 final.append({
#                     "document_type": d[i]['document_type'],
#                     "headline": d[i]['headline'],
#                     "pub_date": d[i]['pub_date'],
#                     "web_url": d[i]['web_url'],
#                     "news_desk": d[i]['news_desk'],
#                     "keywords": d[i]['keywords']
#                 })

# print(final)           
# open('test_article_nyt_rest.json', 'w').write(
#     json.dumps(final, sort_keys=False, indent=4, separators=(',', ': '))
# )

### created allQ.json for 2010-2019 headline with question
