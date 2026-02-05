import { defineEventHandler } from 'h3'
import { TestList } from '../../../src/data/test'

export default defineEventHandler(() => {
  const randomIndex = Math.floor(Math.random() * TestList.length)
  const randomDemot = TestList[randomIndex]

  return {
    success: true,
    data: randomDemot,
  }
})
