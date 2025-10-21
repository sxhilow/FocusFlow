import User from "../models/userModel.js"

const toDateKey = (date) => {
  const d = date ? new Date(date) : new Date()
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()))
}

// Returns true if two dates are the same UTC day
const isSameUTCDate = (a, b) => toDateKey(a).getTime() === toDateKey(b).getTime()

// Returns true if `a` is exactly one day before `b` in UTC
const isYesterdayUTC = (a, b) => {
  const oneDay = 24 * 60 * 60 * 1000
  return toDateKey(b).getTime() - toDateKey(a).getTime() === oneDay
}

export const updateStreakOnLogin = async (userId) => {
  const user = await User.findById(userId)
  if (!user) return null

  const today = new Date()
  const last = user.streak && user.streak.lastDate ? new Date(user.streak.lastDate) : null

  if (!last) {
    user.streak.current = 1
    user.streak.lastDate = toDateKey(today)
    if (user.streak.longest < 1) user.streak.longest = 1
    await user.save()
    return user.streak
  }

  if (isSameUTCDate(last, today)) {
    // same day login - nothing to change
    return user.streak
  }

  if (isYesterdayUTC(last, today)) {
    user.streak.current = (user.streak.current || 0) + 1
    if (user.streak.current > (user.streak.longest || 0)) {
      user.streak.longest = user.streak.current
    }
    user.streak.lastDate = toDateKey(today)
    await user.save()
    return user.streak
  }

  // gap > 1 day
  user.streak.current = 1
  user.streak.lastDate = toDateKey(today)
  await user.save()
  return user.streak
}

export default {
  updateStreakOnLogin
}
