// ─── ALL DATA IN ONE PLACE ────────────────────────────────────────────────────
// Edit this file to add/remove problems, roadmap topics, etc.

export const PROBLEMS = [
  { id: 1, title: "Two Sum", difficulty: "Easy", topic: "Array", solved: true, bookmarked: true, desc: "Find two numbers that add up to a target.", premium: false },
  { id: 2, title: "Longest Substring Without Repeating Characters", difficulty: "Medium", topic: "Sliding Window", solved: false, bookmarked: false, desc: "Find the length of the longest substring without repeating characters.", premium: false },
  { id: 3, title: "Merge K Sorted Lists", difficulty: "Hard", topic: "Heap", solved: false, bookmarked: true, desc: "Merge k sorted linked lists into one sorted list.", premium: false },
  { id: 4, title: "Binary Tree Level Order Traversal", difficulty: "Medium", topic: "Tree", solved: true, bookmarked: false, desc: "Return level order traversal of binary tree nodes' values.", premium: false },
  { id: 5, title: "Coin Change", difficulty: "Medium", topic: "DP", solved: false, bookmarked: false, desc: "Find minimum number of coins to make up given amount.", premium: true },
  { id: 6, title: "Number of Islands", difficulty: "Medium", topic: "Graph", solved: false, bookmarked: false, desc: "Count the number of islands in a 2D grid.", premium: false },
  { id: 7, title: "Valid Parentheses", difficulty: "Easy", topic: "Stack", solved: true, bookmarked: false, desc: "Determine if the input string is valid with brackets.", premium: false },
  { id: 8, title: "Word Search II", difficulty: "Hard", topic: "Trie", solved: false, bookmarked: false, desc: "Find all words from dictionary in a 2D board.", premium: true },
  { id: 9, title: "Climbing Stairs", difficulty: "Easy", topic: "DP", solved: true, bookmarked: true, desc: "Count ways to climb n stairs taking 1 or 2 steps.", premium: false },
];

export const ROADMAP = [
  {
    level: "Beginner", color: "#00ff87",
    topics: [
      { name: "Arrays", problems: 12, done: 9 },
      { name: "Strings", problems: 10, done: 7 },
      { name: "HashMaps", problems: 8, done: 5 },
      { name: "Recursion", problems: 6, done: 2 },
    ]
  },
  {
    level: "Intermediate", color: "#818cf8",
    topics: [
      { name: "Linked Lists", problems: 10, done: 3 },
      { name: "Stacks & Queues", problems: 8, done: 4 },
      { name: "Binary Trees", problems: 14, done: 2 },
      { name: "Binary Search", problems: 9, done: 1 },
    ]
  },
  {
    level: "Advanced", color: "#f472b6",
    topics: [
      { name: "Graphs", problems: 15, done: 0 },
      { name: "Dynamic Programming", problems: 20, done: 0 },
      { name: "Trie", problems: 7, done: 0 },
      { name: "Segment Trees", problems: 5, done: 0 },
    ]
  },
];

export const CODE_SOLUTIONS = {
  python: `def twoSum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
  javascript: `function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) {
      return [seen.get(complement), i];
    }
    seen.set(nums[i], i);
  }
  return [];
}`,
  java: `public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> seen = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        if (seen.containsKey(complement)) {
            return new int[]{seen.get(complement), i};
        }
        seen.put(nums[i], i);
    }
    return new int[]{};
}`,
  cpp: `vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> seen;
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        if (seen.count(complement))
            return {seen[complement], i};
        seen[nums[i]] = i;
    }
    return {};
}`,
};

export const PREMIUM_PLANS = [
  { icon: '🏢', title: 'FAANG DSA Sheet', desc: '200+ hand-picked problems from Google, Meta, Amazon, Apple & Netflix.', price: '₹499' },
  { icon: '👁️', title: 'Blind 75 Visual Guide', desc: 'All 75 Blind problems with animated explanations and PDF notes.', price: '₹349' },
  { icon: '🕸️', title: 'Graph Mastery Pack', desc: 'BFS, DFS, Dijkstra, Topological Sort with visual intuition.', price: '₹299' },
  { icon: '⚡', title: 'Full Access Bundle', desc: 'Every problem, every PDF, every company sheet. 1 year access.', price: '₹999' },
];

export const FEATURES = [
  { icon: '🎨', title: 'Visual Explanations', desc: 'Step-by-step animated walkthroughs of every algorithm.' },
  { icon: '📄', title: 'Hinglish PDFs', desc: 'Download handcrafted PDF notes in easy Hinglish language.' },
  { icon: '🗺️', title: 'DSA Roadmap', desc: 'Structured path from beginner to FAANG-ready.' },
  { icon: '💻', title: 'Code Playground', desc: 'Write, run, and test code in 4 languages right in browser.' },
  { icon: '🔥', title: 'Streak System', desc: 'Build habits with daily streak tracking and badges.' },
  { icon: '⭐', title: 'Premium Sheets', desc: 'FAANG, Blind 75, company-wise curated problem sets.' },
];
