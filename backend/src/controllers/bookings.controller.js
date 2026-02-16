const { z } = require('zod')
const supabase = require('../config/supabase')

const createBookingSchema = z.object({
  space_id: z.string().uuid(),
  start_time: z.string().datetime(),
  end_time: z.string().datetime(),
})

async function listBookings(req, res, next) {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select(
        'id, start_time, end_time, total_amount, status, space:parking_spaces ( id, title, address, city, image_url, price_per_hour )'
      )
      .eq('user_id', req.user.id)
      .order('start_time', { ascending: true })

    if (error) throw error
    res.json({ items: data || [] })
  } catch (err) {
    next(err)
  }
}

async function createBooking(req, res, next) {
  try {
    const payload = createBookingSchema.parse(req.body)

    if (new Date(payload.end_time) <= new Date(payload.start_time)) {
      return res.status(400).json({ message: 'End time must be after start time' })
    }

    const { data: space, error: spaceError } = await supabase
      .from('parking_spaces')
      .select('id, price_per_hour, is_active')
      .eq('id', payload.space_id)
      .single()

    if (spaceError) throw spaceError
    if (!space?.is_active) {
      return res.status(400).json({ message: 'Space is not available' })
    }

    const { count, error: conflictError } = await supabase
      .from('bookings')
      .select('id', { count: 'exact', head: true })
      .eq('space_id', payload.space_id)
      .neq('status', 'cancelled')
      .lt('start_time', payload.end_time)
      .gt('end_time', payload.start_time)

    if (conflictError) throw conflictError
    if (count && count > 0) {
      return res.status(409).json({ message: 'Space is already booked' })
    }

    const durationHours = Math.max(
      1,
      Math.ceil(
        (new Date(payload.end_time).getTime() -
          new Date(payload.start_time).getTime()) /
          (1000 * 60 * 60)
      )
    )
    const totalAmount = durationHours * Number(space.price_per_hour)

    const { data, error } = await supabase
      .from('bookings')
      .insert({
        user_id: req.user.id,
        space_id: payload.space_id,
        start_time: payload.start_time,
        end_time: payload.end_time,
        total_amount: totalAmount,
        status: 'confirmed',
      })
      .select(
        'id, start_time, end_time, total_amount, status, space:parking_spaces ( id, title, address, city, image_url, price_per_hour )'
      )
      .single()

    if (error) throw error
    res.status(201).json({ item: data })
  } catch (err) {
    if (err?.issues) {
      return res.status(400).json({ message: 'Invalid payload', issues: err.issues })
    }
    next(err)
  }
}

module.exports = { listBookings, createBooking }
