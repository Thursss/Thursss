# -*- coding: utf-8 -*-

import requests
import os

# 创建存储目录
for path in ['./download', './download/util8', './download/util8/img']:
    if not os.path.exists(path):
        os.mkdir(path)

#
url = 'https://movie.douban.com/top250'
reqUrl = ('%u?start=%d'%(url, (num + 1) * 25) for num in range(10))
header = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36"
}

def main():
    start = 1
    while start <= 1:
        res = requests.get('%s?start=%d'%(url, start * 25), headers = header)
        with open('./download/util8/data.txt', 'w', encoding='utf-8') as f:
            f.write(res.text)
        start += 1

if __name__ == '__main__':
    main()