import requests

#UA：User-Agent 请求载体的身份标识
#UA伪装：门户网站的服务器会检测对应请求的载体身份标识，如果
#        检测到请求载体身份标识为某一款浏览器
#        说明该请求是一个正常请求
#        但是如果检测到请求载体的身份标识不是基于某一款浏览器的，该请求为不正常的请求

# UA伪装  反反扒策略
if __name__ == "__main__":
    # step 1:指定url
    # UA伪装，将对应的user-agent封装到一个字典中
    headers = {
        'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.101 Safari/537.36'
    }
    url = 'https://www.sogou.com/web'
    # 处理url携带的参数
    kw = input('enter a word:')
    param = {
        'query':kw
    }
    # 对指定的url发起的请求对应的url是携带参数的，并且请求过程中处理了参数
    response = requests.get(url=url, params=param, headers=headers)

    page_text = response.text
    file_name = './download/' + kw + '.html'
    with open(file_name, 'w', encoding='utf-8') as fp:
        fp.write(page_text)