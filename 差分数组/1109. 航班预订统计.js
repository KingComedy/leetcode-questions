/*
 * @lc app=leetcode.cn id=1109 lang=javascript
 *
 * [1109] 航班预订统计
 *
 * https://leetcode.cn/problems/corporate-flight-bookings/description/
 *
 * algorithms
 * Medium (61.19%)
 * Likes:    369
 * Dislikes: 0
 * Total Accepted:    84.3K
 * Total Submissions: 137.5K
 * Testcase Example:  '[[1,2,10],[2,3,20],[2,5,25]]\n5'
 *
 * 这里有 n 个航班，它们分别从 1 到 n 进行编号。
 *
 * 有一份航班预订表 bookings ，表中第 i 条预订记录 bookings[i] = [firsti, lasti, seatsi] 意味着在从
 * firsti 到 lasti （包含 firsti 和 lasti ）的 每个航班 上预订了 seatsi 个座位。
 *
 * 请你返回一个长度为 n 的数组 answer，里面的元素是每个航班预定的座位总数。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：bookings = [[1,2,10],[2,3,20],[2,5,25]], n = 5
 * 输出：[10,55,45,25,25]
 * 解释：
 * 航班编号        1   2   3   4   5
 * 预订记录 1 ：   10  10
 * 预订记录 2 ：       20  20
 * 预订记录 3 ：       25  25  25  25
 * 总座位数：      10  55  45  25  25
 * 因此，answer = [10,55,45,25,25]
 *
 *
 * 示例 2：
 *
 *
 * 输入：bookings = [[1,2,10],[2,2,15]], n = 2
 * 输出：[10,25]
 * 解释：
 * 航班编号        1   2
 * 预订记录 1 ：   10  10
 * 预订记录 2 ：       15
 * 总座位数：      10  25
 * 因此，answer = [10,25]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= n <= 2 * 10^4
 * 1 <= bookings.length <= 2 * 10^4
 * bookings[i].length == 3
 * 1 <= firsti <= lasti <= n
 * 1 <= seatsi <= 10^4
 *
 *
 */

// @lc code=start
/**
 * @param {number[][]} bookings
 * @param {number} n
 * @return {number[]}
 */
class DiffArray {
  constructor(origin) {
    this.diff = [];
    this.diff[0] = origin[0];
    for (let i = 1; i < origin.length; i++) {
      this.diff[i] = origin[i] - origin[i - 1];
    }
  }
  increment(i, j, val) {
    this.diff[i] += val;
    if (j + 1 < this.diff.length) {
      this.diff[j + 1] -= val;
    }
  }

  getOrigin() {
    const origin = [];
    origin[0] = this.diff[0];
    for (let i = 1; i < this.diff.length; i++) {
      origin[i] = origin[i - 1] + this.diff[i];
    }
    return origin;
  }
}
var corpFlightBookings = function (bookings, n) {
  const arr = new Array(n).fill(0);
  const diff = new DiffArray(arr);
  bookings.forEach((booking) => {
    const i = booking[0] - 1;
    const j = booking[1] - 1;
    const val = booking[2];
    diff.increment(i, j, val);
  });
  return diff.getOrigin();
};
// @lc code=end
