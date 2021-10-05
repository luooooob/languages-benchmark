#include<stdio.h>
#include <time.h>
#include<string.h>


int countPrimes(int n) {
    if (n < 2) {
        return 0;
    }
    int isPrime[n];
    int primes[n], primesSize = 0;
    memset(isPrime, 0, sizeof(isPrime));
    for (int i = 2; i < n; ++i) {
        if (!isPrime[i]) {
            primes[primesSize++] = i;
        }
        for (int j = 0; j < primesSize && i * primes[j] < n; ++j) {
            isPrime[i * primes[j]] = 1;
            if (i % primes[j] == 0) {
                break;
            }
        }
    }
    return primesSize;
}

int main () {
    int n;
    int count = 0;
    time_t end = time(NULL) + 10;

    while(time(NULL) < end) {
        n = countPrimes(10000);
        count ++;
    }

    printf("%d,%d",n, count);
}

