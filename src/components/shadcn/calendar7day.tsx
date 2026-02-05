import { useEffect, useRef, useState } from 'react'
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'lucide-react'
import {
  DayPicker,
  getDefaultClassNames,
  type DayButton,
  type Locale, // Keep Locale import, as it's used in CustomCalCaption's props
} from 'react-day-picker'
import { startOfWeek, endOfWeek, isSameDay } from 'date-fns' // Recommended helper

import { cn } from '@/lib/utils'
import { Button } from '@/components/shadcn/button'

// Extension of the Props to include our new view variant
export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  view?: 'default' | 'week'
}

// Define CustomCalCaption outside the Cal function
// Corrected to use calendarMonth and take locale from Cal's scope
const CustomCalCaption = ({
  calendarMonth,
  currentTime,
  calendarLocale,
}: {
  calendarMonth: Date
  currentTime: Date
  calendarLocale?: Locale
}) => {
  const [hasMounted, setHasMounted] = useState(false)
  useEffect(() => {
    setHasMounted(true)
  }, [])

  const formattedTime = hasMounted
    ? currentTime.toLocaleTimeString(calendarLocale?.code, {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
    : '--:--'

  const formattedMonthYear = hasMounted
    ? calendarMonth.toLocaleDateString(calendarLocale?.code, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : 'Loading...'

  return (
    <div className="flex items-center justify-between h-(--cell-size) w-full pl-1 pr-2">
      {/* Added justify-between for spacing */}
      <span className="font-medium text-lg text-primary bg-foreground dark:bg-background rounded-4xl px-2">
        {formattedTime}
      </span>
      <span className="font-medium text-sm">{formattedMonthYear}</span>
    </div>
  )
}

function Calendar7day({
  className,
  classNames,
  captionLayout = 'label', // Revert to 'label'
  view = 'default',
  formatters,
  components,
  locale, // Ensure locale is available in scope for CustomCalCaption
  ...props
}: CalendarProps) {
  const defaultClassNames = getDefaultClassNames()

  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000) // Update every minute
    return () => clearInterval(timer)
  }, [])

  // Logic for the 7-day week view
  const today = new Date()
  // ISO week starts on Monday (1)
  const weekStart = startOfWeek(today, { weekStartsOn: 1 })
  const weekEnd = endOfWeek(today, { weekStartsOn: 1 })

  return (
    <DayPicker
      // Force Monday start for the week view
      weekStartsOn={1}
      // In 'week' mode, we hide anything not in the current week range
      disabled={[{ before: weekStart, after: weekEnd }]}
      hidden={[{ before: weekStart, after: weekEnd }]}
      className={cn(
        'bg-background group/calendar p-2 w-fit md:[--cell-size:--spacing(12)] [--cell-size:--spacing(8)] in-data-[slot=card-content]:bg-transparent in-data-[slot=popover-content]:bg-transparent shadow-md',
        className,
      )}
      classNames={{
        ...classNames,
        root: cn('w-full', defaultClassNames.root),
        // Hide nav and caption if it's just a 7-day static view
        nav: cn(
          'flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between',
          defaultClassNames.nav,
        ),
        month_caption: cn(
          'flex items-center justify-end h-(--cell-size) w-full px-2',
          defaultClassNames.month_caption,
        ),
        day: cn(
          'relative w-full h-full p-0 text-center [&:last-child[data-selected=true]_button]:rounded-r-md group/day aspect-square select-none',
          props.showWeekNumber
            ? '[&:nth-child(2)[data-selected=true]_button]:rounded-l-md'
            : '[&:first-child[data-selected=true]_button]:rounded-l-md',
          defaultClassNames.day,
        ),
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => (
          <div
            data-slot="calendar"
            ref={rootRef}
            className={cn(className)}
            {...props}
          />
        ),
        Chevron: ({ className, orientation, ...props }) => {
          const Icon =
            orientation === 'left'
              ? ChevronLeftIcon
              : orientation === 'right'
                ? ChevronRightIcon
                : ChevronDownIcon
          return <Icon className={cn('size-4', className)} {...props} />
        },
        DayButton: CalendarDayButton,
        MonthCaption: () => (
          <CustomCalCaption
            calendarMonth={currentTime}
            currentTime={currentTime}
          />
        ),
        ...components,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames()
  const ref = useRef<HTMLButtonElement>(null)

  // Custom modifier for "today" to ensure it's always highlighted
  const isToday = isSameDay(day.date, new Date())

  useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-today={isToday}
      className={cn(
        'flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal',
        'group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50',
        // Today Highlight Styling
        'data-[today=true]:bg-accent data-[today=true]:text-accent-foreground data-[today=true]:font-bold data-[today=true]:border data-[today=true]:border-primary/20',
        // Selection Styling
        'data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground',
        defaultClassNames.day,
        className,
      )}
      {...props}
    />
  )
}
export { Calendar7day, CalendarDayButton }
