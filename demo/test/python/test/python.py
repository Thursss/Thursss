import math

# 解二元一次方程
def quadratic(a, b, c):
    a1 = (-b + math.sqrt(b**2 - 4 * a * c)) / (2 * a)
    a2 = (-b - math.sqrt(b**2 - 4 * a * c)) / (2 * a)
    return a1, a2

# 汉诺塔
def move(n, a, b, c):
    if(n == 1):
        print('{a} --> {c}')
    else:
        print('{a} --> {c}')

# 使用切片去除字符串的首尾空格
def trim(s):
    while s[:1] == '':
        s = s[1:]
    while s[:-1] == '':
        s = s[:-1]
    return s

# 列表生成式
def listCrate(L):
    return [s.lower() for s in L if isinstance(s, str)]

# 斐波拉契数列
def fib(n):
    a, b = 0, 1
    while n > 0:
        a, b = b, a + b
        yield a
        n -= 1
    return 'down'

def normalize(L):
    L2 = map(name.lower(), L)