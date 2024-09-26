import { getAtcoderContests } from "./atcoder.js";
import getCodechefContests from "./codechef.js";
import getCodeforcesContests from "./codeforces.js";
import getCodingNinjaContests from "./codingninja.js";
import getGfgContests from "./geeksforgeeks.js";
import getLeetcodeContests from "./leetcode.js";

const REFRESH_TIMER = 6 * 60 * 60 * 1000; // Cache refresh interval set to 6 hours
let lastRefreshTime = 0; // Use 0 for initial timestamp

// Cache variables for contest data
let contestsCache = {
  codeforces: [],
  leetcode: [],
  codechef: [],
  gfg: [],
  atcoder: [],
  codingninja: [],
};

// Function to refresh cache data
const refreshCache = async () => {
  const currentTime = Date.now(); // Get current timestamp in milliseconds
  if (currentTime - lastRefreshTime <= REFRESH_TIMER) return; // Check if refresh is needed

  lastRefreshTime = currentTime; // Update last refresh time
  console.log("Refreshing cache");

  try {
    // Fetch contests concurrently
    const [codechef, codeforces, leetcode, gfg, atcoder, codingninja] =
      await Promise.all([
        getCodechefContests(),
        getCodeforcesContests(),
        getLeetcodeContests(),
        getGfgContests(),
        getAtcoderContests(),
        getCodingNinjaContests(),
      ]);

    // Update cached contests
    contestsCache = {
      codechef,
      codeforces,
      leetcode,
      gfg,
      atcoder,
      codingninja,
    };

    console.log("Cache refreshed successfully");
  } catch (error) {
    console.error("Error refreshing cache:", error);
  }
};

// Exporting cached contests and refresh function
export const {
  codechef: codechefContests,
  codeforces: codeforcesContests,
  leetcode: leetcodeContests,
  gfg: gfgContests,
  atcoder: atcoderContests,
  codingninja: codingninjaContests,
} = contestsCache;

export { refreshCache };
