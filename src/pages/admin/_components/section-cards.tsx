"use client";
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardAction,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";
const revenue = { totalRevenue: 1250000, growthRate: 8.25 };
const customers = { lastMonthNewCustomer: 340, growthRate: -3.4 };
const accounts = { totalActiveUser: 1280, growthRate: 5.9 };
const growth = { growthRate: 4.75 };
export const SectionCards: React.FC = () => {
	return (
		<div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 * :data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
			<Card className="@container/card">
				<CardHeader>
					<CardDescription>Total Revenue</CardDescription>
					<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
						{`₹${revenue?.totalRevenue ?? 0}`}
					</CardTitle>
					<CardAction>
						<Badge variant="outline">
							{(revenue?.growthRate ?? 0) > 0 ? (
								<>
									<TrendingUp className="text-green-500" />
									+{(revenue?.growthRate ?? 0).toFixed(2)}%
								</>
							) : (
								<>
									<TrendingDown className="text-red-500" />
									{(revenue?.growthRate ?? 0).toFixed(2)}%
								</>
							)}
						</Badge>
					</CardAction>

				</CardHeader>
				<CardFooter className="flex-col items-start gap-1.5 text-sm">
					<div className="line-clamp-1 flex gap-2 font-medium">
						{(revenue?.growthRate ?? 0) > 0 ? (
							<>Revenue is up <TrendingUp className="size-4 text-green-500" /></>
						) : (
							<>Revenue is down <TrendingDown className="size-4 text-red-500" /></>
						)}
					</div>
					<div className="text-muted-foreground">
						Visitors for the last 6 months
					</div>
				</CardFooter>
			</Card>
			<Card className="@container/card">
				<CardHeader>
					<CardDescription>New Customers</CardDescription>
					<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
						{customers?.lastMonthNewCustomer ?? 0}
					</CardTitle>
					<CardAction>
						<Badge variant="outline">
							{(customers?.growthRate ?? 0) > 0 ? (
								<>
									<TrendingUp className="text-green-500" />
									+{(customers?.growthRate ?? 0).toFixed(2)}%
								</>
							) : (
								<>
									<TrendingDown className="text-red-500" />
									{(customers?.growthRate ?? 0).toFixed(2)}%
								</>
							)}
						</Badge>
					</CardAction>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1.5 text-sm">
					<div className="line-clamp-1 flex gap-2 font-medium">
						{(customers?.growthRate ?? 0) < 0 ? (
							<>Decline in new customers <TrendingDown className="size-4 text-red-500" /></>
						) : (
							<>Increase in new customers <TrendingUp className="size-4 text-green-500" /></>
						)}
					</div>
					<div className="text-muted-foreground">
						Acquisition needs attention
					</div>
				</CardFooter>
			</Card>
			<Card className="@container/card">
				<CardHeader>
					<CardDescription>Active Accounts</CardDescription>
					<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
						{accounts?.totalActiveUser ?? 0}
					</CardTitle>
					<CardAction>
						<Badge variant="outline">
							{(accounts?.growthRate ?? 0) > 0 ? (
								<>
									<TrendingUp className="text-green-500" />
									+{(accounts?.growthRate ?? 0).toFixed(2)}%
								</>
							) : (
								<>

									<TrendingDown className="text-red-500" />
									{(accounts?.growthRate ?? 0).toFixed(2)}%
								</>
							)}
						</Badge>
					</CardAction>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1.5 text-sm">
					<div className="line-clamp-1 flex gap-2 font-medium">
						{(accounts?.growthRate ?? 0) > 0 ? (
							<>Rise in active accounts <TrendingUp className="size-4 text-green-500" /></>
						) : (
							<>Drop in active accounts <TrendingDown className="size-4 text-red-500" /></>
						)}
					</div>
					<div className="text-muted-foreground">Engagement exceed targets</div>
				</CardFooter>
			</Card>
			<Card className="@container/card">
  <CardHeader>
    <CardDescription>Growth Rate</CardDescription>
    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
      {(growth?.growthRate ?? 0).toFixed(2)}%
    </CardTitle>
    <CardAction>
      <Badge variant="outline">
        {(growth?.growthRate ?? 0) > 0 ? (
          <>
            <TrendingUp className="text-green-500" />
            +{(growth?.growthRate ?? 0).toFixed(2)}%
          </>
        ) : (
          <>
            <TrendingDown className="text-red-500" />
            {(growth?.growthRate ?? 0).toFixed(2)}%
          </>
        )}
      </Badge>
    </CardAction>
  </CardHeader>
  <CardFooter className="flex-col items-start gap-1.5 text-sm">
    <div className="line-clamp-1 flex gap-2 font-medium">
      {(growth?.growthRate ?? 0) > 0 ? (
        <>Positive growth trend <TrendingUp className="size-4 text-green-500" /></>
      ) : (
        <>Negative growth trend <TrendingDown className="size-4 text-red-500" /></>
      )}
    </div>
    <div className="text-muted-foreground">Meets growth projections</div>
  </CardFooter>
</Card>

		</div>
	);
}
