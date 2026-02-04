import { defineEventHandler } from 'h3'
import { DemotList } from '../../src/data/demots'

export default defineEventHandler(() => {
  return {
    success: true,
    count: DemotList.length,
    data: DemotList
  }
})
