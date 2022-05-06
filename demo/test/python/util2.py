import requests

if __name__ == "__main__":
    # step 1:指定url
    url = 'https://www.sogou.com/'
    # step 2:发送请求
    response = requests.get(url=url)
    # step 3:获取响应数据
    page_text = response.text
    print(page_text)
    # step 4:持久化存储
    with open('./download/sogou.html', 'w', encoding='utf-8') as fp:
        fp.write(page_text)
    print('爬取数据结束')