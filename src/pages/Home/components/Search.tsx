import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export const Searchsection: React.FC = () => {
    return (
      
        <Card className="w-full max-w-md border-0 bg-white/90 shadow-xl shadow-sky-100 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-base">Search your stay</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">
                Where are you going?
              </label>
              <Input placeholder="City, landmark or hotel name" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">
                  Check-in
                </label>
                <Input type="date" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">
                  Check-out
                </label>
                <Input type="date" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">
                  Guests
                </label>
                <Input defaultValue="2 adults · 1 room" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">
                  Trip type
                </label>
                <Input defaultValue="Leisure" />
              </div>
            </div>

            <Button className="mt-2 w-full" size="lg">
              Search Hotels
            </Button>

            <p className="text-[11px] text-muted-foreground">
              🔒 No booking fees · Free cancellation on most rooms
            </p>
          </CardContent>
        </Card>
    )
}