package main

import (
	"fmt"
	"time"
)

func countPrimes(n int) int {
	primes := []int{}
	isPrime := make([]bool, n)
	for i := range isPrime {
		isPrime[i] = true
	}
	for i := 2; i < n; i++ {
		if isPrime[i] {
			primes = append(primes, i)
		}
		for _, p := range primes {
			if i*p >= n {
				break
			}
			isPrime[i*p] = false
			if i%p == 0 {
				break
			}
		}
	}
	return len(primes)
}

func main() {
	var n int
	var count int
	end := time.Now().Add(time.Second * 10)
	for time.Now().Before(end) {
		n = countPrimes(10000)
		count++
	}
	fmt.Printf("%d,%d", n, count)
}
