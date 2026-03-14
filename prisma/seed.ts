// prisma/seed.ts
import { PrismaClient, Difficulty, Language } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ── Admin User ──────────────────────────────────────────────────────────────
  const adminPassword = await bcrypt.hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@codesonnotes.in" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@codesonnotes.in",
      password: adminPassword,
      role: "ADMIN",
      emailVerified: new Date(),
    },
  });
  console.log("✅ Admin user created:", admin.email);

  // ── Demo User ───────────────────────────────────────────────────────────────
  const userPassword = await bcrypt.hash("demo123", 12);
  const demoUser = await prisma.user.upsert({
    where: { email: "demo@codesonnotes.in" },
    update: {},
    create: {
      name: "Rahul Sharma",
      email: "demo@codesonnotes.in",
      password: userPassword,
      role: "USER",
      emailVerified: new Date(),
    },
  });
  console.log("✅ Demo user created:", demoUser.email);

  // ── Topics ──────────────────────────────────────────────────────────────────
  const topicsData = [
    { name: "Array", slug: "array", order: 1 },
    { name: "String", slug: "string", order: 2 },
    { name: "HashMap", slug: "hashmap", order: 3 },
    { name: "Sliding Window", slug: "sliding-window", order: 4 },
    { name: "Stack", slug: "stack", order: 5 },
    { name: "Queue", slug: "queue", order: 6 },
    { name: "Linked List", slug: "linked-list", order: 7 },
    { name: "Tree", slug: "tree", order: 8 },
    { name: "Binary Search", slug: "binary-search", order: 9 },
    { name: "Graph", slug: "graph", order: 10 },
    { name: "DP", slug: "dp", order: 11 },
    { name: "Heap", slug: "heap", order: 12 },
    { name: "Trie", slug: "trie", order: 13 },
  ];

  const topics: Record<string, any> = {};
  for (const t of topicsData) {
    const topic = await prisma.topic.upsert({
      where: { slug: t.slug },
      update: {},
      create: t,
    });
    topics[t.slug] = topic;
  }
  console.log("✅ Topics seeded:", Object.keys(topics).length);

  // ── Problems ────────────────────────────────────────────────────────────────
  const problemsData = [
    {
      number: 1,
      title: "Two Sum",
      slug: "two-sum",
      difficulty: Difficulty.Easy,
      topicSlug: "array",
      isPremium: false,
      isPublished: true,
      statement: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

**Example 1:**
\`\`\`
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: nums[0] + nums[1] == 9, return [0, 1].
\`\`\`

**Constraints:**
- 2 ≤ nums.length ≤ 10^4
- Only one valid answer exists.`,
      hints: [
        "Try using a HashMap to store numbers you've seen",
        "For each number, check if target - num exists in your map",
      ],
      solutions: [
        {
          language: Language.python,
          code: `def twoSum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
          timeComplexity: "O(n)",
          spaceComplexity: "O(n)",
        },
        {
          language: Language.javascript,
          code: `function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) return [seen.get(complement), i];
    seen.set(nums[i], i);
  }
}`,
          timeComplexity: "O(n)",
          spaceComplexity: "O(n)",
        },
      ],
    },
    {
      number: 3,
      title: "Longest Substring Without Repeating Characters",
      slug: "longest-substring-without-repeating-characters",
      difficulty: Difficulty.Medium,
      topicSlug: "sliding-window",
      isPremium: false,
      isPublished: true,
      statement: `Given a string \`s\`, find the length of the **longest substring** without repeating characters.

**Example:**
\`\`\`
Input: s = "abcabcbb"
Output: 3
Explanation: "abc" is the longest substring.
\`\`\``,
      hints: ["Use a sliding window with two pointers", "Track characters in a Set"],
      solutions: [
        {
          language: Language.python,
          code: `def lengthOfLongestSubstring(s):
    chars = set()
    left = max_len = 0
    for right in range(len(s)):
        while s[right] in chars:
            chars.remove(s[left])
            left += 1
        chars.add(s[right])
        max_len = max(max_len, right - left + 1)
    return max_len`,
          timeComplexity: "O(n)",
          spaceComplexity: "O(min(m,n))",
        },
      ],
    },
  ];

  for (const p of problemsData) {
    const { solutions, topicSlug, ...problemData } = p;
    const problem = await prisma.problem.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        ...problemData,
        topicId: topics[topicSlug].id,
      },
    });

    for (const sol of solutions) {
      await prisma.solution.upsert({
        where: { problemId_language: { problemId: problem.id, language: sol.language } },
        update: {},
        create: { ...sol, problemId: problem.id },
      });
    }
  }
  console.log("✅ Problems seeded:", problemsData.length);

  // ── Roadmap ─────────────────────────────────────────────────────────────────
  const levels = [
    { name: "Beginner", order: 1, color: "#00ff87", topics: ["array", "string", "hashmap", "sliding-window"] },
    { name: "Intermediate", order: 2, color: "#818cf8", topics: ["linked-list", "stack", "queue", "tree", "binary-search"] },
    { name: "Advanced", order: 3, color: "#f472b6", topics: ["graph", "dp", "heap", "trie"] },
  ];

  for (const level of levels) {
    const roadmapLevel = await prisma.roadmapLevel.upsert({
      where: { name: level.name },
      update: {},
      create: { name: level.name, order: level.order, color: level.color },
    });

    for (let i = 0; i < level.topics.length; i++) {
      const topic = topics[level.topics[i]];
      if (!topic) continue;
      await prisma.roadmapTopic.upsert({
        where: { id: `${roadmapLevel.id}-${topic.id}` },
        update: {},
        create: { levelId: roadmapLevel.id, topicId: topic.id, order: i + 1 },
      }).catch(() => {}); // ignore duplicate
    }
  }
  console.log("✅ Roadmap seeded");

  // ── Resources ───────────────────────────────────────────────────────────────
  const resources = [
    { title: "Array Cheatsheet", description: "Complete guide to array operations and patterns", fileUrl: "https://example.com/array-cheatsheet.pdf", topic: "Array", isPremium: false },
    { title: "Graph Algorithms Guide", description: "BFS, DFS, Dijkstra's, Topological Sort", fileUrl: "https://example.com/graph-guide.pdf", topic: "Graph", isPremium: false },
    { title: "DP Patterns Handbook", description: "All dynamic programming patterns with examples", fileUrl: "https://example.com/dp-patterns.pdf", topic: "DP", isPremium: true },
  ];

  for (const r of resources) {
    await prisma.resource.create({ data: r }).catch(() => {});
  }
  console.log("✅ Resources seeded");

  console.log("\n🎉 Database seeding complete!");
  console.log("─────────────────────────────────────");
  console.log("Admin login: admin@codesonnotes.in / admin123");
  console.log("Demo login:  demo@codesonnotes.in  / demo123");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
