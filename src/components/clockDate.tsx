import { Calendar7day } from './shadcn/calendar7day'

const ClockDate = () => {
  return (
    <div className="my-4">
      <Calendar7day view="week" mode="single" className="rounded-lg border" />
    </div>
  )
}

export default ClockDate
