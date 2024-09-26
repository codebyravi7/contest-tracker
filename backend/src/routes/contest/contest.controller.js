import { PLATFORM } from "../../types.js";
import {
  atcoderContests,
  codechefContests,
  codeforcesContests,
  codingninjaContests,
  gfgContests,
  leetcodeContests,
  refreshCache,
} from "../../platforms/cache.js";

const defaultArray = Object.values(PLATFORM);
const DURATION_LIMIT = 15 * 24 * 60;

export const UpcomingContestsController = async (req, res) => {
  let platforms;
  const includedPlatforms = [];

  // Parse platforms from query or use default
  try {
    platforms = JSON.parse(req.query.platforms);
    if (!Array.isArray(platforms)) throw new Error();
  } catch (error) {
    platforms = defaultArray;
  }

  let contests = [];

  await refreshCache();

  // Gather contests based on included platforms
  const platformMap = {
    [PLATFORM.CODECHEF]: codechefContests,
    [PLATFORM.LEETCODE]: leetcodeContests,
    [PLATFORM.CODEFORCES]: codeforcesContests,
    [PLATFORM.GEEKSFORGEEKS]: gfgContests,
    [PLATFORM.ATCODER]: atcoderContests,
    [PLATFORM.CODINGNINJAS]: codingninjaContests,
  };

  platforms.forEach((platform) => {
    if (platformMap[platform]) {
      contests = [...contests, ...platformMap[platform]];
      includedPlatforms.push(platform);
    }
  });

  // Filter contests by duration limit
  contests = contests.filter((contest) => contest.duration <= DURATION_LIMIT);

  // Sort contests by start time
  contests.sort(
    (contest1, contest2) => contest1.startTime - contest2.startTime
  );

  // Respond with the included platforms and upcoming contests
  res.status(200).json({
    platforms: includedPlatforms,
    upcoming_contests: contests,
  });
};
