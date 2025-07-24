import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Settings, Sun, Moon, Sunset, Sunrise, Quotes, ArrowClockwise } from '@phosphor-icons/react'

type GreetingStyle = 'casual' | 'formal' | 'inspirational'

interface GreetingData {
  morning: string
  afternoon: string
  evening: string
  night: string
}

const greetingStyles: Record<GreetingStyle, GreetingData> = {
  casual: {
    morning: "Good morning",
    afternoon: "Hey there",
    evening: "Good evening",
    night: "Still up?"
  },
  formal: {
    morning: "Good morning",
    afternoon: "Good afternoon", 
    evening: "Good evening",
    night: "Good evening"
  },
  inspirational: {
    morning: "Rise and shine",
    afternoon: "Keep going strong",
    evening: "Wind down peacefully",
    night: "Rest well tonight"
  }
}

function getTimeOfDay(): keyof GreetingData {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 12) return 'morning'
  if (hour >= 12 && hour < 17) return 'afternoon'
  if (hour >= 17 && hour < 22) return 'evening'
  return 'night'
}

function getTimeIcon(timeOfDay: keyof GreetingData) {
  const iconProps = { size: 24, weight: "duotone" as const }
  switch (timeOfDay) {
    case 'morning': return <Sunrise {...iconProps} />
    case 'afternoon': return <Sun {...iconProps} />
    case 'evening': return <Sunset {...iconProps} />
    case 'night': return <Moon {...iconProps} />
  }
}

function App() {
  const [userName, setUserName] = useKV('user-name', '')
  const [greetingStyle, setGreetingStyle] = useKV<GreetingStyle>('greeting-style', 'casual')
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [tempName, setTempName] = useState('')
  const [motivationalQuote, setMotivationalQuote] = useKV('daily-quote', '')
  const [quoteDate, setQuoteDate] = useKV('quote-date', '')
  const [isLoadingQuote, setIsLoadingQuote] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000) // Update every minute

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    setTempName(userName)
  }, [userName, isSettingsOpen])

  // Generate or refresh daily quote
  const generateDailyQuote = async () => {
    setIsLoadingQuote(true)
    try {
      const timeOfDay = getTimeOfDay()
      const prompt = spark.llmPrompt`Generate a short, inspiring motivational quote (under 50 words) that's appropriate for ${timeOfDay}. Make it uplifting and relevant to starting fresh or maintaining momentum throughout the day. Return only the quote without attribution.`
      
      const quote = await spark.llm(prompt)
      setMotivationalQuote(quote.trim())
      setQuoteDate(new Date().toDateString())
    } catch (error) {
      console.error('Failed to generate quote:', error)
      setMotivationalQuote("Every moment is a fresh beginning.")
    }
    setIsLoadingQuote(false)
  }

  // Check if we need a new daily quote
  useEffect(() => {
    const today = new Date().toDateString()
    if (quoteDate !== today || !motivationalQuote) {
      generateDailyQuote()
    }
  }, [quoteDate, motivationalQuote])

  const timeOfDay = getTimeOfDay()
  const greeting = greetingStyles[greetingStyle][timeOfDay]
  
  const handleSaveSettings = () => {
    setUserName(tempName)
    setIsSettingsOpen(false)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    })
  }

  const getGreetingMessage = () => {
    if (userName.trim()) {
      return `${greeting}, ${userName}!`
    }
    return `${greeting}!`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-secondary p-6 flex items-center justify-center">
      <div className="w-full max-w-2xl space-y-6">
        {/* Main Greeting Card */}
        <Card className="relative overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-card/80 to-secondary/60 backdrop-blur-sm">
          <CardContent className="p-12 text-center space-y-6">
            {/* Time Badge */}
            <div className="flex justify-center">
              <Badge 
                variant="secondary" 
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-muted/50 backdrop-blur-sm"
              >
                {getTimeIcon(timeOfDay)}
                {formatTime(currentTime)}
              </Badge>
            </div>

            {/* Main Greeting */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight tracking-tight">
                {getGreetingMessage()}
              </h1>
              
              {!userName.trim() && (
                <p className="text-lg text-muted-foreground font-light">
                  Welcome to your personal greeting space
                </p>
              )}
            </div>

            {/* Settings Button */}
            <div className="pt-4">
              <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="bg-background/50 backdrop-blur-sm border-border/50 hover:bg-background/80 transition-all duration-200"
                  >
                    <Settings size={20} className="mr-2" />
                    Personalize
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">Personalize Your Greetings</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6 py-4">
                    {/* Name Input */}
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium">
                        Your Name
                      </Label>
                      <Input
                        id="name"
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                        placeholder="Enter your name"
                        className="bg-background/50"
                      />
                    </div>

                    {/* Greeting Style */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">
                        Greeting Style
                      </Label>
                      <Select value={greetingStyle} onValueChange={(value: GreetingStyle) => setGreetingStyle(value)}>
                        <SelectTrigger className="bg-background/50">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="casual">Casual & Friendly</SelectItem>
                          <SelectItem value="formal">Professional</SelectItem>
                          <SelectItem value="inspirational">Motivational</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Preview */}
                    <div className="p-4 rounded-lg bg-muted/30 border border-border/30">
                      <p className="text-sm text-muted-foreground mb-2">Preview:</p>
                      <p className="font-medium text-lg">
                        {greetingStyles[greetingStyle][timeOfDay]}
                        {tempName.trim() && `, ${tempName}`}!
                      </p>
                    </div>

                    {/* Save Button */}
                    <Button 
                      onClick={handleSaveSettings} 
                      className="w-full"
                      size="lg"
                    >
                      Save Changes
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Time Period Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {(Object.keys(greetingStyles[greetingStyle]) as Array<keyof GreetingData>).map((period) => (
            <Card 
              key={period}
              className={`transition-all duration-200 ${
                period === timeOfDay 
                  ? 'bg-primary/10 border-primary/30 shadow-md' 
                  : 'bg-card/50 hover:bg-card/80'
              }`}
            >
              <CardContent className="p-4 text-center space-y-2">
                <div className="flex justify-center">
                  {getTimeIcon(period)}
                </div>
                <p className="text-sm font-medium capitalize">{period}</p>
                <p className="text-xs text-muted-foreground">
                  {greetingStyles[greetingStyle][period]}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Motivational Quote */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-accent/20 to-primary/20 backdrop-blur-sm">
          <CardContent className="p-8 text-center space-y-4">
            <div className="flex justify-center">
              <Quotes size={32} weight="duotone" className="text-accent" />
            </div>
            
            {isLoadingQuote ? (
              <div className="space-y-2">
                <div className="animate-pulse bg-muted/50 h-4 rounded w-3/4 mx-auto"></div>
                <div className="animate-pulse bg-muted/50 h-4 rounded w-1/2 mx-auto"></div>
              </div>
            ) : (
              <blockquote className="text-lg md:text-xl font-medium text-foreground leading-relaxed italic">
                "{motivationalQuote}"
              </blockquote>
            )}
            
            <div className="pt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={generateDailyQuote}
                disabled={isLoadingQuote}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowClockwise size={16} className="mr-2" />
                New Quote
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default App