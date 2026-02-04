import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/shadcn/button'
import { useTheme } from '@/lib/theme-context'
import { Link } from '@tanstack/react-router'
import DemotIcon from '@/assets/demot-icon'

export function Header() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 md:max-w-2xl mx-auto  ">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <a href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">
              <DemotIcon className="fill-muted-foreground" h={30} w={30} />
            </span>
          </a>
        </div>

        <Link to="/quote">
          <Button variant={'outline'}>quotes</Button>
        </Link>
        <Link to="/apis">
          <Button variant={'ghost'}>API's</Button>
        </Link>
        <nav className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="relative"
          >
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          </Button>
        </nav>
      </div>
    </header>
  )
}
