# 数据解析原理：
#     - 解析的局部的文本内容都会在标签之间或标签对应的属性中进行存储
#     - 1.进行指定标签的定位
#     - 2.标签或者标签对应属性中存储的数据值进行提取（解析）
#
#数据解析分析：
#    - 正则
#    - bs4
#    - xpath (***)

'''
单字符：
    . : 除换行以外所有字符
    [] : [aoe] [a-w] 匹配集合中任意一个字符
    \d : 数字 [0-9]
    \D : 非数字
    \w : 数字、字母、下划线、中文
    \W : 非\w
    \s : 所有的空白字符，包括空格、制表符、换页符等等
    \S : 非空白
数量修饰：
    * ： 任意多次 >=0
    + : 至少1次 >=1
    ? : 可有可无 0次或1次
    {m} : 固定m次 hello{3,}
    {m,n} : m-n次
边界：
    $ : 以某某结尾
    ^ : 以某某开头
分组：
    (ab)
贪婪模式： .*
非贪婪模式：.*?

re.I : 忽略大小写
re.M : 多行匹配
re.S : 单行匹配

re.sub(正则表达式，替换内容，字符串)
'''
import requests
import json

if __name__ == '__main__':
    url = 'https://pic.qiushibaike.com/system/pictures/12442/124429400/medium/W1760S5MEZXI502X.jpg'
    # text：字符串  content(二进制)     json() 对象
    img_data = requests.get(url=url).content
    with open('./download/giutu.jpg', 'wb') as fp:
        fp.write(img_data)
