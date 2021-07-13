import math

input

def quadratic(a, b, c):
    a1 = (-b + math.sqrt(b**2 - 4 * a * c)) / (2 * a)
    a2 = (-b - math.sqrt(b**2 - 4 * a * c)) / (2 * a)
    return a1, a2

print(quadratic(2,3,1))