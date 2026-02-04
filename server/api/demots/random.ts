import { defineEventHandler } from 'h3'
import { DemotList } from '../../../src/data/demots'

export default defineEventHandler(() => {
  const randomIndex = Math.floor(Math.random() * DemotList.length)
  const randomDemot = DemotList[randomIndex]
  
  return {
    success: true,
    data: randomDemot
  }
})
