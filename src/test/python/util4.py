import requests
import json

if __name__ == "__main__":
    # 查看xhr获取url    参数使用字典进行封装
    post_url = 'https://movie.douban.com/j/chart/top_list'
    param = {
        'type':'24',
        'interval_id':'100:90',
        'action':'',
        'start':'1',
        'limit':'20',
    }
    # 进行UA伪装
    headers = {
        'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.101 Safari/537.36'
    }
    response = requests.get(url=post_url, params=param, headers=headers)
    # 获取响应数据：json()返回的是obj （如果确认响应数据是json类型的，才可以使用json()
    dic_obj = response.json()

    print(dic_obj)

    # 持久化存储
    fp = open('./data/douban.json', 'w', encoding='utf-8')

    # https://www.bejson.com/ 使用json格式化工具查看
    json.dump(dic_obj, fp = fp, ensure_ascii=False)
    print('Over!!!')