import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Date;

class Solution {
    public static int countPrimes(int n) {
        List<Integer> primes = new ArrayList<Integer>();
        int[] isPrime = new int[n];
        Arrays.fill(isPrime, 1);
        for (int i = 2; i < n; ++i) {
            if (isPrime[i] == 1) {
                primes.add(i);
            }
            for (int j = 0; j < primes.size() && i * primes.get(j) < n; ++j) {
                isPrime[i * primes.get(j)] = 0;
                if (i % primes.get(j) == 0) {
                    break;
                }
            }
        }
        return primes.size();
    }
}

public class Main {
    public static void main(String[] args) {
        long end = new Date().getTime()+10000;
        int n = 0;
        int count = 0;
        while (new Date().getTime()<end) {
            n = Solution.countPrimes(10000);
            count++;
        }
        System.out.print(n + "," + count);
    }
}
