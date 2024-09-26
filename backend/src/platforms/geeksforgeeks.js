import axios from "axios";
import { PLATFORM } from "../types.js";

const GFG_BASE_URL = "https://practice.geeksforgeeks.org/contest/"; // used for generating contest links
const GFG_API =
  "https://practiceapi.geeksforgeeks.org/api/vr/events/?page_number=1&sub_type=all&type=contest";

const fetchGfgContests = async () => {
  try {
    const response = await axios.get(GFG_API);
    const data = response.data;

    let result = [];
    if (data?.results?.upcoming) result = data?.results?.upcoming;
    return result;
  } catch (error) {
    return [];
  }
};

const parseGfgContests = (data) => {
  const contests = [];

  data.forEach((element) => {
    const contest_name = element?.name || "Geeks for Geeks contest";
    const url = GFG_BASE_URL + element?.slug;

    const startDate = new Date(
      new Date(element?.start_time).getTime() - 5.5 * 60 * 60 * 1000
    );
    const startMs = startDate.getTime();
    const endDate = new Date(
      new Date(element?.end_time).getTime() - 5.5 * 60 * 60 * 1000
    );
    const endMs = endDate.getTime();
    const duration =
      Math.abs(endDate.getTime() - startDate.getTime()) / (1000 * 60) || 120; // minutes

    const contest = {
      site: PLATFORM.GEEKSFORGEEKS,
      title: contest_name,
      startTime: startMs,
      endTime: endMs,
      duration,
      url,
    };

    contests.push(contest);
  });

  return contests;
};

const getGfgContests = async () => {
  const data = await fetchGfgContests();
  const parsedData = parseGfgContests(data);

  console.log("Fetched data from gfg!", parsedData.length);

  return parsedData;
};

export default getGfgContests;
