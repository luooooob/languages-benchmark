import time


def countPrimes(n: int) -> int:

    if n < 2:
        return 0
    prime = [-1 for _ in range(n)]
    pn = 0

    mark = [True for _ in range(n)]
    mark[0] = mark[1] = False

    for x in range(2, n):
        if mark[x] == True:
            prime[pn] = x
            pn += 1
        pi = 0
        while pi < pn and x * prime[pi] < n:  # 可以理解成质因数分解的反过程
            y = x * prime[pi]
            mark[y] = False
            pi += 1

    return pn


end = time.time() + 10
n = 0
count = 0
while time.time() < end:
    n = countPrimes(10000)
    count = count + 1

print("%d,%f" % (n, count))
