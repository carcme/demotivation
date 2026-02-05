import { defineHandler } from 'nitro/h3'
//import { defineEventHandler } from 'h3'
import { DemotList } from '../../src/data/demots'

// export default defineEventHandler(() => {
//   return {
//     success: true,
//     count: DemotList.length,
//     data: DemotList,
//   }
// })

export default defineHandler(() => {
  return {
    success: true,
    count: DemotList.length,
    data: DemotList,
  }
})
