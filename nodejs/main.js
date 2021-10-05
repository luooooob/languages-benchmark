var countPrimes = function (n) {
  const isPrime = new Array(n).fill(1);
  const primes = [];
  for (let i = 2; i < n; ++i) {
    if (isPrime[i]) {
      primes.push(i);
    }
    for (let j = 0; j < primes.length && i * primes[j] < n; ++j) {
      isPrime[i * primes[j]] = 0;
      if (i % primes[j] === 0) {
        break;
      }
    }
  }
  return primes.length;
};

const end = Date.now() + 10000
let n;
let count = 0;

while (Date.now() < end) {
  n = countPrimes(10000);
  count++
}


console.log(`${n},${count}`)
