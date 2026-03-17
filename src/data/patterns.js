export const patterns = [
  {
    id: 'sliding-window',
    title: 'Sliding Window',
    slides: [
      {
        title: 'Classic Pattern',
        concept: 'Used for problems involving contiguous subarrays or substrings',
        timeComplexity: 'O(n)',
        timeComplexityExplanation: 'Each element is visited at most twice (once by end pointer, once by start pointer)',
        spaceComplexity: 'O(k) where k is window size',
        spaceComplexityExplanation: 'Additional space needed for storing window elements or tracking seen elements (set/map)',
        keyPoints: [
          'Character Constraint: No duplicate/repeating characters',
          'Length Constraint: Fixed window size (k elements)',
          'Sum Constraint: Sum <= or >= k',
          'Product Constraint: Count subarrays with product < k',
          'Number Constraint: At most k occurrences of something'
        ],
        mnemonic: 'SEAS: Start=0, Expand with end, Add to window, Shrink while invalid',
        template: `def slidingWindow(arr):
    start, result = 0, 0
    for end in range(len(arr)):
        # Add arr[end] to window

        while condition:  # Shrink window
            # Remove arr[start] from window
            start += 1

        result = max(result, end - start + 1)
    return result`,
        usefulSyntax: [
          { name: 'enumerate', example: 'for i, val in enumerate(arr):' },
          { name: 'defaultdict', example: 'from collections import defaultdict; d = defaultdict(int)' },
          { name: 'Counter', example: 'from collections import Counter; Counter([1,2,2]) → {1:1, 2:2}' },
          { name: 'set', example: 'seen = set(); seen.add(x); x in seen' },
          { name: 'dict.get', example: 'count.get(key, 0)  # default 0 if missing' },
          { name: 'deque', example: 'from collections import deque; q = deque()' },
          { name: 'sum', example: 'sum(arr[start:end+1])' },
          { name: 'ord', example: 'ord("a") - ord("a")  # convert char to 0-25' }
        ],
        walkthrough: [
          'Initialize start pointer at 0 and result variable',
          'Loop through array with end pointer expanding the window',
          'Add current element arr[end] to the window',
          'While window violates condition, shrink from left by incrementing start',
          'Update result with maximum window size seen so far',
          'Return the final result after checking all windows'
        ],
        problems: []
      },
      {
        title: 'Variation 1: Character Constraint',
        concept: 'Find longest substring without duplicate characters',
        timeComplexity: 'O(n)',
        timeComplexityExplanation: 'Single pass through string with each character processed at most twice',
        spaceComplexity: 'O(k) for hashmap/set',
        spaceComplexityExplanation: 'Set stores at most k unique characters in current window (min(n, alphabet_size))',
        keyPoints: [
          'Use a Set or HashMap to track characters in window',
          'When duplicate found, shrink window from left',
          'Example: "zxyzxyz" → "xyz" (length 3)'
        ],
        mnemonic: 'SET-STAR: SET tracks chars, Shrink Till duplicate gone, Add char, Record max',
        template: `def lengthOfLongestSubstring(s):
    seen = set()
    left, maxLen = 0, 0

    for right in range(len(s)):
        while s[right] in seen:
            seen.remove(s[left])
            left += 1
        seen.add(s[right])
        maxLen = max(maxLen, right - left + 1)
    return maxLen`,
        usefulSyntax: [
          { name: 'set ops', example: 'char in seen; seen.add(x); seen.remove(x)' },
          { name: 'dict map', example: 'char_idx = {}; char_idx[c] = i' },
          { name: 'slicing', example: 's[left:right+1]  # substring inclusive' },
          { name: 'ord', example: 'ord("c") - ord("a")  # char to index 0-25' },
          { name: 'len(set)', example: 'len(set(s))  # count unique chars' }
        ],
        walkthrough: [
          'Use a set to track characters in current window',
          'Expand window by moving right pointer through the string',
          'If character already exists in set, shrink window from left',
          'Remove characters from set until duplicate is removed',
          'Add current character to set',
          'Track maximum window length seen'
        ],
        problems: []
      },
      {
        title: 'Variation 2: Length Constraint (Fixed Window)',
        concept: 'Find max/min value in subarray of fixed size k',
        timeComplexity: 'O(n)',
        timeComplexityExplanation: 'Single pass through array, adding and removing one element at each step',
        spaceComplexity: 'O(1)',
        spaceComplexityExplanation: 'Only storing constant variables (curSum, maxSum), no additional data structures',
        keyPoints: [
          'Window size is fixed at k elements',
          'Slide the window one element at a time',
          'Example: Max profit in 4 consecutive days'
        ],
        mnemonic: 'SLIDE: Sum first k, Loop from k, Increment sum, Drop old, Evaluate max',
        template: `def maxSumFixedWindow(nums, k):
    curSum = sum(nums[:k])
    maxSum = curSum

    for i in range(k, len(nums)):
        curSum = curSum - nums[i - k] + nums[i]
        maxSum = max(maxSum, curSum)
    return maxSum`,
        walkthrough: [
          'Calculate sum of first k elements as initial window',
          'Set maxSum to this initial sum',
          'Slide the window: remove leftmost element, add new rightmost element',
          'Subtract nums[i-k] (element leaving window)',
          'Add nums[i] (new element entering window)',
          'Update maxSum if current window sum is larger'
        ],
        problems: []
      },
      {
        title: 'Variation 3: Sum Constraint',
        concept: 'Find longest subarray where sum <= k',
        timeComplexity: 'O(n)',
        timeComplexityExplanation: 'Two pointers traverse array, each element added and removed at most once',
        spaceComplexity: 'O(1)',
        spaceComplexityExplanation: 'Only tracking window sum and pointers, no extra space proportional to input',
        keyPoints: [
          'Expand window by adding elements',
          'Shrink window when sum exceeds k',
          'Works for positive numbers'
        ],
        mnemonic: 'EAST: Expand adding to total, Always check sum > k, Shrink removing left, Track maxLen',
        template: `def longestSubarraySum(nums, k):
    left, total, maxLen = 0, 0, 0

    for right in range(len(nums)):
        total += nums[right]
        while total > k:
            total -= nums[left]
            left += 1
        maxLen = max(maxLen, right - left + 1)
    return maxLen`,
        walkthrough: [
          'Initialize left pointer, running sum (total), and maxLen',
          'Expand window by moving right pointer and adding nums[right] to total',
          'If total exceeds k, shrink window from left',
          'Subtract nums[left] from total and increment left pointer',
          'After ensuring total ≤ k, update maxLen with current window size',
          'Return longest valid window length found'
        ],
        problems: []
      },
      {
        title: 'Variation 4: Product Constraint',
        concept: 'Count subarrays where product < k',
        timeComplexity: 'O(n)',
        timeComplexityExplanation: 'Single pass through array with two pointers, each element processed at most twice',
        spaceComplexity: 'O(1)',
        spaceComplexityExplanation: 'Only storing running product and counter variables',
        keyPoints: [
          'Count all valid subarrays, not just longest',
          'Every new element adds (right - left + 1) subarrays',
          'Example: [10,5,2,6] with k=100 has 8 valid subarrays'
        ],
        mnemonic: 'MIDAS: Multiply into product, If ≥k then divide, Add (right-left+1), Sum all counts',
        template: `def numSubarrayProductLessThanK(nums, k):
    if k <= 1:
        return 0

    left, product, count = 0, 1, 0
    for right in range(len(nums)):
        product *= nums[right]
        while product >= k:
            product //= nums[left]
            left += 1
        count += right - left + 1
    return count`,
        walkthrough: [
          'Edge case: if k ≤ 1, no valid subarrays possible',
          'Multiply current element into running product',
          'If product ≥ k, shrink window by dividing out nums[left]',
          'Key insight: when window [left, right] is valid, ALL subarrays ending at right are valid',
          'Add (right - left + 1) to count for all valid subarrays',
          'Return total count of valid subarrays'
        ],
        problems: []
      },
      {
        title: 'Variation 5: Number Constraint',
        concept: 'Longest substring with at most k occurrences',
        timeComplexity: 'O(n)',
        timeComplexityExplanation: 'Two pointers traverse string once, linear time for single pass',
        spaceComplexity: 'O(1) or O(k) for frequency map',
        spaceComplexityExplanation: 'Constant space for counter, or O(k) if using hashmap for multiple character types',
        keyPoints: [
          'Track count/frequency of specific element',
          'Example: At most one "L" character',
          '"llttlltlll" → "ltt" (indices 4-6, length 3)'
        ],
        mnemonic: 'COUNT: Check char match, Observe if exceeds k, Undo from left, Note maxLen, Track result',
        template: `def longestSubstringWithKChars(s, char, k):
    left, count, maxLen = 0, 0, 0

    for right in range(len(s)):
        if s[right] == char:
            count += 1
        while count > k:
            if s[left] == char:
                count -= 1
            left += 1
        maxLen = max(maxLen, right - left + 1)
    return maxLen`,
        walkthrough: [
          'Track count of specific character in current window',
          'Expand window and increment count if s[right] matches target char',
          'If count exceeds k, shrink window from left',
          'Decrement count when removing target char from left',
          'Once count ≤ k, update maxLen with current window size',
          'Return longest valid substring length'
        ],
        problems: []
      }
    ]
  },
  {
    id: 'two-pointers',
    title: 'Two Pointers',
    slides: [
      {
        title: 'Classic Pattern',
        concept: 'Use two pointers, typically starting at different positions, moving based on conditions',
        timeComplexity: 'O(n)',
        timeComplexityExplanation: 'Each element visited once with pointers moving toward each other',
        spaceComplexity: 'O(1)',
        spaceComplexityExplanation: 'Only storing pointer variables, no additional data structures needed',
        keyPoints: [
          'Opposite Direction: Start from both ends, move towards center',
          'Same Direction: Both start from beginning, move at different speeds',
          'Works great on sorted arrays',
          'Helps reduce time complexity from O(n²) to O(n)'
        ],
        mnemonic: 'MEET: Move from ends/start, Evaluate condition, Execute pointer shift, Track result',
        template: `# Opposite Direction
def twoPointers(arr):
    left, right = 0, len(arr) - 1
    while left < right:
        # Process arr[left] and arr[right]
        if condition:
            left += 1
        else:
            right -= 1

# Same Direction (Fast & Slow)
def fastSlow(arr):
    slow = 0
    for fast in range(len(arr)):
        if condition:
            slow += 1
    return slow`,
        usefulSyntax: [
          { name: 'sort', example: 'arr.sort(); arr.sort(reverse=True)' },
          { name: 'sorted', example: 'sorted(arr)  # returns new list' },
          { name: 'reverse', example: 'arr[::-1]' },
          { name: 'str methods', example: 's.lower(); s.upper(); s.isalnum()' },
          { name: 'swap', example: 'arr[i], arr[j] = arr[j], arr[i]' }
        ],
        walkthrough: [
          'Opposite Direction: Start left at beginning, right at end',
          'Move pointers toward each other based on comparison',
          'Works well for sorted arrays and palindrome checks',
          'Same Direction: Fast pointer explores, slow pointer tracks valid elements',
          'Fast pointer moves every iteration, slow moves conditionally',
          'Useful for in-place array modifications'
        ],
        problems: []
      },
      {
        title: 'Variation 1: Palindrome Check',
        concept: 'Check if a string is a palindrome using two pointers',
        timeComplexity: 'O(n)',
        timeComplexityExplanation: 'At most n/2 comparisons, checking half the string from both ends',
        spaceComplexity: 'O(1)',
        spaceComplexityExplanation: 'Only two pointer variables needed, no additional space',
        keyPoints: [
          'Start from both ends of the string',
          'Move towards center comparing characters',
          'Return false if mismatch found'
        ],
        mnemonic: 'MIRROR: Match chars from ends, If different return False, Repeat inward, Result True',
        template: `def isPalindrome(word):
    L, R = 0, len(word) - 1
    while L < R:
        if word[L] != word[R]:
            return False
        L += 1
        R -= 1
    return True`,
        walkthrough: [
          'Place L at start (index 0), R at end (len-1)',
          'Compare characters at L and R positions',
          'If they don\'t match, immediately return False',
          'If they match, move both pointers inward (L++, R--)',
          'Continue until pointers meet or cross',
          'If loop completes, all characters matched - return True'
        ],
        problems: [],
        visualization: {
          steps: [
            {
              array: ['r', 'a', 'c', 'e', 'c', 'a', 'r'],
              pointers: { L: 0, R: 6 },
              highlight: [0, 6],
              variables: { L: 0, R: 6 },
              description: 'Initialize L at start (0) and R at end (6). Compare word[L] and word[R].',
              codeLine: 'L, R = 0, len(word) - 1'
            },
            {
              array: ['r', 'a', 'c', 'e', 'c', 'a', 'r'],
              pointers: { L: 0, R: 6 },
              active: [0, 6],
              variables: { L: 0, R: 6, 'word[L]': 'r', 'word[R]': 'r' },
              description: 'word[0] == word[6] (both are "r"). Match! Move both pointers.',
              codeLine: 'if word[L] != word[R]: return False'
            },
            {
              array: ['r', 'a', 'c', 'e', 'c', 'a', 'r'],
              pointers: { L: 1, R: 5 },
              highlight: [1, 5],
              variables: { L: 1, R: 5 },
              description: 'L = 1, R = 5. Compare word[L] and word[R].',
              codeLine: 'L += 1; R -= 1'
            },
            {
              array: ['r', 'a', 'c', 'e', 'c', 'a', 'r'],
              pointers: { L: 1, R: 5 },
              active: [1, 5],
              variables: { L: 1, R: 5, 'word[L]': 'a', 'word[R]': 'a' },
              description: 'word[1] == word[5] (both are "a"). Match! Move both pointers.',
              codeLine: 'if word[L] != word[R]: return False'
            },
            {
              array: ['r', 'a', 'c', 'e', 'c', 'a', 'r'],
              pointers: { L: 2, R: 4 },
              highlight: [2, 4],
              variables: { L: 2, R: 4 },
              description: 'L = 2, R = 4. Compare word[L] and word[R].',
              codeLine: 'L += 1; R -= 1'
            },
            {
              array: ['r', 'a', 'c', 'e', 'c', 'a', 'r'],
              pointers: { L: 2, R: 4 },
              active: [2, 4],
              variables: { L: 2, R: 4, 'word[L]': 'c', 'word[R]': 'c' },
              description: 'word[2] == word[4] (both are "c"). Match! Move both pointers.',
              codeLine: 'if word[L] != word[R]: return False'
            },
            {
              array: ['r', 'a', 'c', 'e', 'c', 'a', 'r'],
              pointers: { L: 3, R: 3 },
              highlight: [3],
              variables: { L: 3, R: 3 },
              description: 'L = 3, R = 3. L is no longer < R, so loop ends.',
              codeLine: 'while L < R:'
            },
            {
              array: ['r', 'a', 'c', 'e', 'c', 'a', 'r'],
              pointers: {},
              highlight: [],
              variables: { result: 'True' },
              description: 'All characters matched! Return True. "racecar" is a palindrome! ✓',
              codeLine: 'return True'
            }
          ]
        }
      },
      {
        title: 'Variation 2: Two Sum (Sorted Array)',
        concept: 'Find two numbers in sorted array that sum to target',
        timeComplexity: 'O(n)',
        timeComplexityExplanation: 'Pointers meet in middle at most after n steps, each element considered once',
        spaceComplexity: 'O(1)',
        spaceComplexityExplanation: 'Only two pointer variables, no extra data structures',
        keyPoints: [
          'Array must be sorted',
          'If sum too large, move right pointer left',
          'If sum too small, move left pointer right',
          'Assumes exactly one solution exists'
        ],
        mnemonic: 'SUM: Start ends, Undershoot→left++, Match→return, More→right--',
        template: `def targetSum(nums, target):
    L, R = 0, len(nums) - 1
    while L < R:
        if nums[L] + nums[R] > target:
            R -= 1
        elif nums[L] + nums[R] < target:
            L += 1
        else:
            return [L, R]`,
        walkthrough: [
          'Array must be sorted for this approach to work',
          'Start L at beginning, R at end',
          'Calculate sum of nums[L] + nums[R]',
          'If sum > target: R is too large, move R left',
          'If sum < target: L is too small, move L right',
          'If sum == target: found the pair, return indices'
        ],
        problems: []
      }
    ]
  },
  {
    id: 'stacks-queues',
    title: 'Monotonic Stack',
    slides: [
      {
        title: 'Classic Pattern',
        concept: 'Maintain a stack that keeps elements in increasing or decreasing order',
        timeComplexity: 'O(n)',
        timeComplexityExplanation: 'Each element pushed and popped at most once, amortized O(1) per element',
        spaceComplexity: 'O(n)',
        spaceComplexityExplanation: 'Stack can store up to n indices in worst case (e.g., decreasing sequence)',
        keyPoints: [
          'Monotonic Increasing: Elements in stack are in increasing order',
          'Monotonic Decreasing: Elements in stack are in decreasing order',
          'Great for finding next greater/smaller element',
          'Each element pushed and popped at most once'
        ],
        mnemonic: 'STACK: Store indices, Test top against current, Answer pops, Collect result, Keep pushing',
        template: `def nextGreaterElement(arr):
    result = [-1] * len(arr)
    stack = []  # stores indices

    for i in range(len(arr)):
        while stack and arr[i] > arr[stack[-1]]:
            idx = stack.pop()
            result[idx] = arr[i]
        stack.append(i)
    return result

def nextSmallerElement(arr):
    result = [-1] * len(arr)
    stack = []

    for i in range(len(arr)):
        while stack and arr[i] < arr[stack[-1]]:
            idx = stack.pop()
            result[idx] = arr[i]
        stack.append(i)
    return result`,
        usefulSyntax: [
          { name: 'stack ops', example: 'stack = []; stack.append(x); stack.pop(); stack[-1]' },
          { name: 'init array', example: '[-1] * n  # n elements with -1' },
          { name: 'backwards', example: 'range(len(arr)-1, -1, -1)' },
          { name: 'while guard', example: 'while stack and condition:' }
        ],
        walkthrough: [
          'Stack stores indices (not values) to track positions',
          'Initialize result array with -1 (default: no greater element)',
          'For each element, compare with elements in stack',
          'Pop indices while current element is greater/smaller than stack top',
          'For each popped index, current element is the answer',
          'Push current index to stack and continue'
        ],
        problems: []
      },
      {
        title: 'Variation 1: Daily Temperatures',
        concept: 'Find how many days until a warmer temperature',
        timeComplexity: 'O(n)',
        timeComplexityExplanation: 'Each temperature pushed and popped from stack at most once',
        spaceComplexity: 'O(n)',
        spaceComplexityExplanation: 'Stack stores indices, worst case all n temperatures if strictly decreasing',
        keyPoints: [
          'Use monotonic decreasing stack',
          'Stack stores indices, not temperatures',
          'When warmer temp found, pop and calculate difference',
          'Result is days to wait, not the temperature'
        ],
        mnemonic: 'WARMER: While current > top, Answer = i - stackInd, Remove from stack, Must push [t,i], End return res',
        template: `def dailyTemperatures(temperatures):
    res = [0] * len(temperatures)
    stack = []  # stores [temp, index]

    for i, t in enumerate(temperatures):
        while stack and t > stack[-1][0]:
            stackT, stackInd = stack.pop()
            res[stackInd] = i - stackInd
        stack.append([t, i])
    return res`,
        walkthrough: [
          'Stack stores [temperature, index] pairs',
          'Result array initialized to 0 (default: no warmer day)',
          'For each day, check if current temp is warmer than stack top',
          'Pop all cooler temperatures and calculate days waited',
          'Days waited = current index - popped index',
          'Push current [temp, index] to stack'
        ],
        problems: []
      }
    ]
  },
  {
    id: 'prefix-sum',
    title: 'Prefix Sum',
    slides: [
      {
        title: 'Classic Pattern',
        concept: 'Calculate the running sum of a subarray efficiently',
        timeComplexity: 'O(n) preprocessing, O(1) per query',
        timeComplexityExplanation: 'Build prefix array in O(n), then each range sum query takes O(1) using subtraction',
        spaceComplexity: 'O(n)',
        spaceComplexityExplanation: 'Prefix array stores n+1 cumulative sums',
        keyPoints: [
          'prefix[i] = sum of elements from 0 to i',
          'Range sum [left, right] = prefix[right] - prefix[left-1]',
          'Can be extended to 2D arrays',
          'Useful with hash maps for subarray sum problems'
        ],
        mnemonic: 'BUILD-QUERY: Build prefix[0]=0, Unify sums, Indexed cumulative, Loop add, Difference for queries, Query in O(1), Use right-left, Result fast',
        template: `def prefixSum(arr):
    prefix = [0]
    for i in range(len(arr)):
        prefix.append(prefix[i] + arr[i])

    def rangeSum(i, j):
        return prefix[j + 1] - prefix[i]

    return prefix, rangeSum

def subarraySum(arr, k):
    hashmap = {0: 1}
    total, count = 0, 0

    for num in arr:
        total += num
        if total - k in hashmap:
            count += hashmap[total - k]
        hashmap[total] = hashmap.get(total, 0) + 1
    return count`,
        usefulSyntax: [
          { name: 'defaultdict', example: 'from collections import defaultdict; d = defaultdict(int)' },
          { name: 'dict ops', example: 'key in d; d.get(key, 0)' },
          { name: 'init list', example: '[0] * (n+1)  # n+1 zeros' },
          { name: 'sum slice', example: 'sum(arr[i:j+1])' }
        ],
        walkthrough: [
          'Build prefix array where prefix[i] = sum of first i elements',
          'Start with prefix[0] = 0 for empty subarray',
          'Range sum [i,j] = prefix[j+1] - prefix[i] (O(1) time)',
          'For subarray sum problem: use hashmap to store prefix sums',
          'If (total - k) exists in map, found k subarrays ending here',
          'Store each prefix sum with its frequency'
        ],
        problems: []
      },
      {
        title: 'Variation 1: Class-Based Implementation',
        concept: 'Reusable prefix sum class for multiple range queries',
        timeComplexity: 'O(n) init, O(1) per query',
        timeComplexityExplanation: 'Constructor builds prefix array in O(n), each rangeSum call is O(1) arithmetic',
        spaceComplexity: 'O(n)',
        spaceComplexityExplanation: 'Stores n cumulative sums in prefix array',
        keyPoints: [
          'Initialize once, query many times',
          'Prefix array has n+1 elements (starts with 0)',
          'Handle edge cases: left > 0 check',
          'Efficient for multiple queries on same array'
        ],
        mnemonic: 'CACHE: Cumulative sums Array, Check left>0, Handle edge, Extract with prefix[r]-prefix[l-1]',
        template: `class PrefixSum:
    def __init__(self, nums):
        self.prefix = []
        total = 0
        for n in nums:
            total += n
            self.prefix.append(total)

    def rangeSum(self, left, right):
        preRight = self.prefix[right]
        preLeft = self.prefix[left - 1] if left > 0 else 0
        return preRight - preLeft`,
        walkthrough: [
          '__init__: Build prefix array with cumulative sums',
          'prefix[i] stores sum of elements from index 0 to i',
          'rangeSum: Get sum from left to right indices',
          'preRight = sum from 0 to right',
          'preLeft = sum from 0 to left-1 (or 0 if left is 0)',
          'Return preRight - preLeft for range [left, right]'
        ],
        problems: []
      }
    ]
  },
  {
    id: 'binary-search',
    title: 'Binary Search',
    slides: [
      {
        title: 'Classic Pattern',
        concept: 'Search in a sorted array. Cut the array by half each time. Return the target.',
        timeComplexity: 'O(log n)',
        timeComplexityExplanation: 'Search space halved each iteration: n → n/2 → n/4 → ... → 1, which is log₂(n) steps',
        spaceComplexity: 'O(1)',
        spaceComplexityExplanation: 'Only three pointer variables (low, high, mid), no recursion or extra arrays',
        keyPoints: [
          'Array must be sorted',
          'Compare middle element with target',
          'Adjust search range based on comparison',
          'Return -1 if not found'
        ],
        mnemonic: 'HALF: High=end, And low=0, Loop while low≤high, Find mid, match→return / <target→right / >target→left',
        template: `def binarySearch(arr, target):
    low, high = 0, len(arr) - 1

    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1  # not found`,
        usefulSyntax: [
          { name: 'mid calc', example: 'mid = (low + high) // 2' },
          { name: 'bisect_left', example: 'import bisect; bisect.bisect_left(arr, x)' },
          { name: 'bisect_right', example: 'bisect.bisect_right(arr, x)' },
          { name: 'insort', example: 'bisect.insort(arr, x)  # insert sorted' }
        ],
        walkthrough: [
          'Initialize search range: low = 0, high = last index',
          'Calculate mid point: (low + high) // 2',
          'If arr[mid] equals target: found it, return mid',
          'If arr[mid] < target: search right half (low = mid + 1)',
          'If arr[mid] > target: search left half (high = mid - 1)',
          'Repeat until low > high, return -1 if not found'
        ],
        problems: []
      },
      {
        title: 'Variation 1: Left-most Occurrence',
        concept: 'Given an array where the target is a duplicate element, find the left-most occurrence (first) of the target.',
        timeComplexity: 'O(log n)',
        timeComplexityExplanation: 'Same binary search logic, search space halved each iteration, log₂(n) iterations',
        spaceComplexity: 'O(1)',
        spaceComplexityExplanation: 'Only pointer variables, no additional data structures',
        keyPoints: [
          'Even if target is found, continue searching left',
          'Move high pointer to mid - 1',
          'Low pointer ends at first occurrence',
          'Return low at the end'
        ],
        mnemonic: 'LEFT: Low ends at First, <target→low=mid+1, ≥target→high=mid-1, Finally return low',
        template: `def leftmostOccurrence(arr, target):
    low, high = 0, len(arr) - 1

    while low <= high:
        mid = (low + high) // 2
        if arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return low  # low ends up at the first occurrence (if exists)`,
        walkthrough: [
          'Similar to classic binary search, but never returns early',
          'Even if arr[mid] == target, move high left (high = mid - 1)',
          'This ensures we find the leftmost occurrence',
          'When arr[mid] < target: definitely search right',
          'When arr[mid] >= target: search left (could be duplicates)',
          'Low pointer converges to first occurrence position'
        ],
        problems: []
      },
      {
        title: 'Variation 2: Right-most Occurrence',
        concept: 'Given an array where the target is a duplicate element, find the right-most (last) occurrence of the target.',
        timeComplexity: 'O(log n)',
        timeComplexityExplanation: 'Binary search halves search space each time, log₂(n) iterations to find last occurrence',
        spaceComplexity: 'O(1)',
        spaceComplexityExplanation: 'Only using pointer variables, constant space',
        keyPoints: [
          'Even if target is found, continue searching right',
          'Move low pointer to mid + 1',
          'High pointer ends at last occurrence',
          'Return high at the end'
        ],
        mnemonic: 'RIGHT: Return high, ≤target→low=mid+1, >target→high=mid-1, High ends at last, Try searching right',
        template: `def rightmostOccurrence(arr, target):
    low, high = 0, len(arr) - 1

    while low <= high:
        mid = (low + high) // 2
        if arr[mid] <= target:
            low = mid + 1
        else:
            high = mid - 1
    return high  # high ends up at the last occurrence (if exists)`,
        walkthrough: [
          'Mirror of leftmost search - never returns early',
          'Even if arr[mid] == target, move low right (low = mid + 1)',
          'This ensures we find the rightmost occurrence',
          'When arr[mid] <= target: search right (could be duplicates)',
          'When arr[mid] > target: definitely search left',
          'High pointer converges to last occurrence position'
        ],
        problems: []
      },
      {
        title: 'Variation 3: Search Range',
        concept: 'Perform binary search on a range of elements, instead of an array.',
        timeComplexity: 'O(log n)',
        timeComplexityExplanation: 'Range halved each iteration, takes log₂(high - low) steps to converge',
        spaceComplexity: 'O(1)',
        spaceComplexityExplanation: 'Only storing low, high, mid variables',
        keyPoints: [
          'Low and high define a range, not array indices',
          'Use a check() function to validate mid',
          'Minimize or maximize based on problem',
          'Low ends up at the minimum valid answer'
        ],
        mnemonic: 'CHECK: Check(mid) for validity, High=mid if valid, Else low=mid+1, Converge to min, Keep searching',
        template: `def searchRange(low, high):
    while low < high:
        mid = (low + high) // 2
        if check(mid):  # check() defines whether mid is valid
            high = mid  # try to minimize
        else:
            low = mid + 1
    return low  # low ends up at the minimum valid answer`,
        walkthrough: [
          'Not searching an array - searching a range of values',
          'Define check() function: returns true if mid is valid answer',
          'Calculate mid of current range',
          'If check(mid) is true: mid is valid, try smaller (high = mid)',
          'If check(mid) is false: mid too small, search larger (low = mid+1)',
          'Low converges to minimum valid answer in range'
        ],
        problems: []
      }
    ]
  },
  {
    id: 'linked-list',
    title: 'Linked Lists',
    slides: [
      {
        title: 'Classic Pattern',
        concept: 'Master common linked list manipulation techniques',
        timeComplexity: 'O(n)',
        timeComplexityExplanation: 'Most linked list operations require traversing n nodes once',
        spaceComplexity: 'O(1)',
        spaceComplexityExplanation: 'Only pointer manipulation, no additional data structures (for iterative solutions)',
        keyPoints: [
          'Fast & Slow Pointers (Floyd\'s Cycle Detection)',
          'Reverse Linked List (Iterative & Recursive)',
          'Merge Two Lists',
          'Dummy Node Technique'
        ],
        mnemonic: 'REVERSE: Remember prev=None, Each step save next, Verse curr.next to prev, End: prev=curr curr=next, Return prev, Same for fast/slow',
        template: `# Fast & Slow Pointers
def hasCycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False

# Reverse Linked List
def reverseList(head):
    prev = None
    curr = head
    while curr:
        next_temp = curr.next
        curr.next = prev
        prev = curr
        curr = next_temp
    return prev`,
        problems: []
      }
    ]
  },
  {
    id: 'trees',
    title: 'Trees',
    slides: [
      {
        title: 'Classic Pattern',
        concept: 'DFS and BFS approaches for tree problems',
        timeComplexity: 'O(n)',
        timeComplexityExplanation: 'Visit each of n nodes exactly once during traversal',
        spaceComplexity: 'O(h) for DFS, O(w) for BFS',
        spaceComplexityExplanation: 'DFS uses recursion stack of height h (worst case O(n) for skewed tree). BFS uses queue of width w (worst case O(n) for complete tree)',
        keyPoints: [
          'Inorder, Preorder, Postorder (DFS)',
          'Level Order Traversal (BFS)',
          'Recursive vs Iterative',
          'Path Sum Problems'
        ],
        mnemonic: 'DFS-BFS: Depth→recursion stack, Breadth→queue, For each: check null, Stack/Queue children, Return result',
        template: `# DFS - Inorder
def inorder(root):
    if not root:
        return []
    return inorder(root.left) + [root.val] + inorder(root.right)

# BFS - Level Order
def levelOrder(root):
    if not root:
        return []
    result, queue = [], [root]
    while queue:
        level = []
        for _ in range(len(queue)):
            node = queue.pop(0)
            level.append(node.val)
            if node.left: queue.append(node.left)
            if node.right: queue.append(node.right)
        result.append(level)
    return result`,
        problems: []
      }
    ]
  },
  {
    id: 'graphs',
    title: 'Graphs',
    slides: [
      {
        title: 'Classic Pattern',
        concept: 'DFS, BFS, and topological sort for graphs',
        timeComplexity: 'O(V + E)',
        timeComplexityExplanation: 'Visit all V vertices and explore all E edges once (adjacency list representation)',
        spaceComplexity: 'O(V)',
        spaceComplexityExplanation: 'Visited set stores V vertices, recursion/queue can hold up to V nodes',
        keyPoints: [
          'DFS for connected components',
          'BFS for shortest path',
          'Topological Sort (Kahn\'s Algorithm)',
          'Cycle Detection'
        ],
        mnemonic: 'VISITED: Visit node, Initialize visited set, Stack/Queue for traversal, Iterate neighbors, Track seen, End when empty, Done',
        template: `# DFS
def dfs(graph, node, visited):
    if node in visited:
        return
    visited.add(node)
    for neighbor in graph[node]:
        dfs(graph, neighbor, visited)

# BFS
def bfs(graph, start):
    visited = set([start])
    queue = [start]
    while queue:
        node = queue.pop(0)
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)`,
        problems: []
      }
    ]
  },
  {
    id: 'dynamic-programming',
    title: 'Dynamic Programming',
    slides: [
      {
        title: 'Classic Pattern',
        concept: 'Breaking down problems into overlapping subproblems',
        timeComplexity: 'O(n) to O(n²)',
        timeComplexityExplanation: '1D DP fills n states once = O(n). 2D DP fills m×n grid = O(m×n)',
        spaceComplexity: 'O(n) to O(n²)',
        spaceComplexityExplanation: '1D array stores n states. 2D array stores m×n states (can often optimize to O(n))',
        keyPoints: [
          '1D DP (Fibonacci, Climbing Stairs)',
          '2D DP (Grid, LCS)',
          'Knapsack (0/1, Unbounded)',
          'Top-down (Memoization) vs Bottom-up (Tabulation)'
        ],
        mnemonic: 'STAMP: State definition, Transition equation, Accumulate in table/memo, Memoize results, Plan base cases',
        template: `# 1D DP - Climbing Stairs
def climbStairs(n):
    if n <= 2:
        return n
    dp = [0] * (n + 1)
    dp[1], dp[2] = 1, 2
    for i in range(3, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]

# 2D DP - Unique Paths
def uniquePaths(m, n):
    dp = [[1] * n for _ in range(m)]
    for i in range(1, m):
        for j in range(1, n):
            dp[i][j] = dp[i-1][j] + dp[i][j-1]
    return dp[m-1][n-1]`,
        usefulSyntax: [
          { name: '1D DP', example: 'dp = [0] * (n+1)' },
          { name: '2D DP', example: 'dp = [[0]*n for _ in range(m)]' },
          { name: '@lru_cache', example: 'from functools import lru_cache; @lru_cache(maxsize=None)' },
          { name: 'memo dict', example: 'memo = {}; memo[key] = value' },
          { name: 'infinity', example: 'float("inf"); float("-inf")' },
          { name: 'recurrence', example: 'dp[i] = max(dp[i-1], dp[i-2] + arr[i])' }
        ],
        problems: []
      }
    ]
  },
  {
    id: 'backtracking',
    title: 'Backtracking',
    slides: [
      {
        title: 'Classic Pattern',
        concept: 'Explore all possible solutions by trying and undoing choices',
        timeComplexity: 'O(2ⁿ) to O(n!)',
        timeComplexityExplanation: 'Subsets/combinations = O(2ⁿ) branches. Permutations = O(n!) possibilities. Must explore all',
        spaceComplexity: 'O(n)',
        spaceComplexityExplanation: 'Recursion depth is at most n (length of path), plus current path storage',
        keyPoints: [
          'Combinations',
          'Permutations',
          'Subsets',
          'N-Queens, Sudoku Solver'
        ],
        mnemonic: 'CHOOSE-EXPLORE-UNCHOOSE: Choose option, Explore recursively, Undo choice (backtrack)',
        template: `# Subsets
def subsets(nums):
    result = []
    def backtrack(start, path):
        result.append(path[:])
        for i in range(start, len(nums)):
            path.append(nums[i])
            backtrack(i + 1, path)
            path.pop()
    backtrack(0, [])
    return result

# Permutations
def permute(nums):
    result = []
    def backtrack(path):
        if len(path) == len(nums):
            result.append(path[:])
            return
        for num in nums:
            if num not in path:
                path.append(num)
                backtrack(path)
                path.pop()
    backtrack([])
    return result`,
        problems: []
      }
    ]
  },
  {
    id: 'heaps',
    title: 'Heaps/Priority Queue',
    slides: [
      {
        title: 'Classic Pattern',
        concept: 'Use heaps for top K, median, and merge problems',
        timeComplexity: 'O(n log k)',
        timeComplexityExplanation: 'Process n elements, each heap operation (insert/pop) takes O(log k) for k-sized heap',
        spaceComplexity: 'O(k)',
        spaceComplexityExplanation: 'Maintain heap of size k (for top k problems), not storing all n elements',
        keyPoints: [
          'Top K Elements (Min/Max Heap)',
          'K Closest Points',
          'Merge K Sorted Lists',
          'Find Median from Data Stream'
        ],
        mnemonic: 'HEAP: Heapify initial data, Extract/push as needed, Always O(log k), Pop to get min/max',
        template: `import heapq

# Top K Elements
def topKFrequent(nums, k):
    count = {}
    for num in nums:
        count[num] = count.get(num, 0) + 1
    return heapq.nlargest(k, count.keys(), key=count.get)

# Kth Largest Element
def findKthLargest(nums, k):
    heap = nums[:k]
    heapq.heapify(heap)
    for num in nums[k:]:
        if num > heap[0]:
            heapq.heapreplace(heap, num)
    return heap[0]`,
        usefulSyntax: [
          { name: 'heappush/pop', example: 'import heapq; heapq.heappush(h, x); heapq.heappop(h)' },
          { name: 'heapify', example: 'heapq.heapify(list)  # O(n) in-place' },
          { name: 'nlargest', example: 'heapq.nlargest(k, arr)' },
          { name: 'nsmallest', example: 'heapq.nsmallest(k, arr)' },
          { name: 'max-heap', example: 'heapq.heappush(h, -x)  # negate for max' },
          { name: 'heapreplace', example: 'heapq.heapreplace(h, item)  # pop+push' },
          { name: 'peek', example: 'heap[0]  # smallest element' }
        ],
        problems: []
      }
    ]
  },
  {
    id: 'tries',
    title: 'Tries',
    slides: [
      {
        title: 'Classic Pattern',
        concept: 'Efficient storage and retrieval of strings',
        timeComplexity: 'O(m) where m is word length',
        timeComplexityExplanation: 'Insert/search traverses m characters, one TrieNode per character',
        spaceComplexity: 'O(n * m)',
        spaceComplexityExplanation: 'Worst case: n words with average length m, each character needs a TrieNode (shared prefixes reduce space)',
        keyPoints: [
          'Insert and Search Words',
          'Prefix Search',
          'Word Dictionary',
          'Autocomplete Systems'
        ],
        mnemonic: 'TRIE: Traverse each char, Root starts empty, Insert creates nodes, End marks isWord',
        template: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.isWord = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.isWord = True

    def search(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                return False
            node = node.children[char]
        return node.isWord`,
        usefulSyntax: [
          { name: 'children', example: 'self.children = {}  # char -> TrieNode' },
          { name: 'isWord', example: 'self.isWord = False  # end marker' },
          { name: 'check char', example: 'char in node.children' },
          { name: 'add child', example: 'node.children[char] = TrieNode()' },
          { name: 'traverse', example: 'node = node.children[char]' }
        ],
        problems: []
      }
    ]
  },
  {
    id: 'intervals',
    title: 'Intervals',
    slides: [
      {
        title: 'Classic Pattern',
        concept: 'Merge, insert, and find overlapping intervals',
        timeComplexity: 'O(n log n)',
        timeComplexityExplanation: 'Sorting intervals takes O(n log n), then single pass through sorted intervals is O(n)',
        spaceComplexity: 'O(n)',
        spaceComplexityExplanation: 'Storing merged intervals, worst case all n intervals are non-overlapping',
        keyPoints: [
          'Merge Intervals',
          'Insert Interval',
          'Non-overlapping Intervals',
          'Meeting Rooms'
        ],
        mnemonic: 'SORT-MERGE: Sort by start, Overlap check, Resolve by merging, Track merged list, Merge end=max(ends)',
        template: `# Merge Intervals
def merge(intervals):
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]

    for interval in intervals[1:]:
        if interval[0] <= merged[-1][1]:
            merged[-1][1] = max(merged[-1][1], interval[1])
        else:
            merged.append(interval)
    return merged

# Insert Interval
def insert(intervals, newInterval):
    result = []
    i = 0

    # Add all intervals before newInterval
    while i < len(intervals) and intervals[i][1] < newInterval[0]:
        result.append(intervals[i])
        i += 1

    # Merge overlapping intervals
    while i < len(intervals) and intervals[i][0] <= newInterval[1]:
        newInterval[0] = min(newInterval[0], intervals[i][0])
        newInterval[1] = max(newInterval[1], intervals[i][1])
        i += 1
    result.append(newInterval)

    # Add remaining intervals
    while i < len(intervals):
        result.append(intervals[i])
        i += 1
    return result`,
        problems: []
      }
    ]
  }
];
