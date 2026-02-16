const { z } = require('zod')
const supabase = require('../config/supabase')

const numberFrom = (schema) =>
  z.preprocess((value) => {
    if (value === '' || value === null || value === undefined) return undefined
    if (typeof value === 'string') return Number(value)
    return value
  }, schema)

const createSpaceSchema = z.object({
  title: z.string().min(3),
  address: z.string().min(3),
  city: z.string().min(2),
  price_per_hour: numberFrom(z.number().nonnegative()),
  image_url: z.string().url().optional().nullable(),
  rating: numberFrom(z.number().min(0).max(5)).optional(),
})

const updateSpaceSchema = createSpaceSchema.partial()

async function listSpaces(req, res, next) {
  try {
    const { search, city, maxPrice, minRating } = req.query
    let query = supabase
      .from('parking_spaces')
      .select('*')
      .eq('is_active', true)

    if (search) {
      const term = `%${search}%`
      query = query.or(`title.ilike.${term},address.ilike.${term}`)
    }

    if (city) {
      query = query.ilike('city', `%${city}%`)
    }

    if (maxPrice) {
      query = query.lte('price_per_hour', Number(maxPrice))
    }

    if (minRating) {
      query = query.gte('rating', Number(minRating))
    }

    const { data, error } = await query
    if (error) throw error

    res.json({ items: data || [] })
  } catch (err) {
    next(err)
  }
}

async function getSpace(req, res, next) {
  try {
    const { id } = req.params
    const { data, error } = await supabase
      .from('parking_spaces')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    res.json({ item: data })
  } catch (err) {
    next(err)
  }
}

async function createSpace(req, res, next) {
  try {
    const payload = createSpaceSchema.parse(req.body)
    const { data, error } = await supabase
      .from('parking_spaces')
      .insert({
        ...payload,
        owner_id: req.user.id,
        is_active: true,
      })
      .select('*')
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

async function updateSpace(req, res, next) {
  try {
    const payload = updateSpaceSchema.parse(req.body)
    if (!Object.keys(payload).length) {
      return res.status(400).json({ message: 'No updates provided' })
    }

    const { data, error } = await supabase
      .from('parking_spaces')
      .update(payload)
      .eq('id', req.params.id)
      .eq('owner_id', req.user.id)
      .select('*')
      .single()

    if (error) throw error
    res.json({ item: data })
  } catch (err) {
    if (err?.issues) {
      return res.status(400).json({ message: 'Invalid payload', issues: err.issues })
    }
    next(err)
  }
}

module.exports = {
  listSpaces,
  getSpace,
  createSpace,
  updateSpace,
}
