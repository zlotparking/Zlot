const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const healthRoutes = require('./routes/health.routes')
const authRoutes = require('./routes/auth.routes')
const adminRoutes = require('./routes/admin.routes')
const spacesRoutes = require('./routes/spaces.routes')
const bookingsRoutes = require('./routes/bookings.routes')
const { notFound, errorHandler } = require('./middleware/errorHandler')

const app = express()

const allowedOrigin = process.env.CORS_ORIGIN || 'http://localhost:3000'

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
)
app.use(express.json({ limit: '1mb' }))
app.use(cookieParser())

app.use('/api/health', healthRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/spaces', spacesRoutes)
app.use('/api/bookings', bookingsRoutes)

app.use(notFound)
app.use(errorHandler)

module.exports = app
