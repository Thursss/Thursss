# -*- coding: utf-8 -*-
import requests
import os
from lxml import html

# 创建存储目录
for path in ['./download', './download/util9', './download/util9/img']:
    if not os.path.exists(path):
        os.mkdir(path)

#
url = 'https://www.zhihu.com/question/27364360'
header = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36"
}

def save(file, path):
    with open(path, 'w') as f:
        f.write(file)

def save_image(image_url):
    resp = requests.get(image_url)
    img = resp.content
    filename = image_url.split('zhimg.com/')[-1]
    save(img, './download/util9/img/' + filename)

def main():
    res = requests.get(url, headers = header)
    save(res.text, './download/util9/data.html')

if __name__ == '__main__':
    main()