import { Card } from './shadcn/card'

const ClockTime = ({ date }: { date: Date }) => {
  let mins: string = date.getMinutes().toString()

  if (mins.length === 1) {
    mins = '0' + mins
  }

  return (
    <div className="my-4">
      <Card className="p-4 w-fit shadow-xl text-2xl">
        <p> {date.getHours() + ':' + mins}</p>
      </Card>
    </div>
  )
}

export default ClockTime
