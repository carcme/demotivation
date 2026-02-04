import { defineEventHandler, getRouterParam, createError } from 'h3'
import { DemotList } from '../../../src/data/demots'

export default defineEventHandler((event) => {
  const id = parseInt(getRouterParam(event, 'id') || '0')
  
  const demot = DemotList.find(d => d.id === id)
  
  if (!demot) {
    throw createError({
      statusCode: 404,
      statusMessage: `Quote with id ${id} not found`
    })
  }
  
  return {
    success: true,
    data: demot
  }
})
