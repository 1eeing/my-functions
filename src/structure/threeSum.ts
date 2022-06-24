/**
 * 三数之和
 * @param nums
 */

function threeSum(nums: number[]): number[][] {
  const res = [];
  nums.sort((a, b) => a - b)

  for (let i = 0; i < nums.length; i++) {
    const cur = nums[i]
    const target = 0 - cur
    const rest = [...nums.slice(0, i), ...nums.slice(i + 1)]
    const _res = twoSum(rest, target)
    if (_res.length) {
      _res.forEach(item => {
        res.push([cur, ...item])
      })
    }
  }

  return filterSame(res)
};

function twoSum(nums: number[], target: number): number[][] {
  let left = 0;
  let right = nums.length - 1
  const res = []

  while(left < right) {
    const sum = nums[left] + nums[right]
    if (sum < target) {
      left ++
    } else if (sum > target) {
      right --
    } else {
      res.push([nums[left], nums[right]])
      left++
      right--
    }
  }

  return res
}

function filterSame(nums: number[][]): number[][] {
  const res = []
  nums.forEach(item => {
    const arr = item.sort((a, b) => a - b)
    if (res.every(i => i.join(',') !== arr.join(','))) {
      res.push(arr)
    }
  })
  return res
}
