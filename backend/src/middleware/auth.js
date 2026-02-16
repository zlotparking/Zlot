const supabase = require('../config/supabase')

const getUserRole = (user) =>
  user?.app_metadata?.role || user?.user_metadata?.role || 'USER'

async function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || ''
    const token = header.startsWith('Bearer ')
      ? header.slice(7)
      : header

    if (!token) {
      return res.status(401).json({ message: 'Missing auth token' })
    }

    const { data, error } = await supabase.auth.getUser(token)

    if (error || !data?.user) {
      return res.status(401).json({ message: 'Invalid or expired token' })
    }

    req.user = data.user
    req.userRole = getUserRole(data.user)
    return next()
  } catch (err) {
    return next(err)
  }
}

function requireAdmin(req, res, next) {
  if (req.userRole !== 'ADMIN') {
    return res.status(403).json({ message: 'Admin access required' })
  }
  return next()
}

module.exports = { requireAuth, requireAdmin, getUserRole }
