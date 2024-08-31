import { useAppContext } from "@/components";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Label,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
} from "recharts";

interface ChartData {
  date: string;
  debit: number;
  credit: number;
}

const Home = () => {
  const { transactions, fetchTransactions, formatter } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      await fetchTransactions();
      setIsLoading(false);
    };
    loadData();
  }, [fetchTransactions]);
  const chartConfig = {
    debit: {
      label: "Debit",
      color: "#0000ff",
    },
    credit: {
      label: "Kredit",
      color: "#ff0000",
    },
  } satisfies ChartConfig;

  const chartData = transactions
    ?.sort((a, b) => a.date.localeCompare(b.date)) // Sort transactions by date
    .map((transaction) => {
      return {
        date: new Date(transaction.date).toLocaleDateString(),
        debit:
          transaction.transactionType.toLowerCase() === "debit"
            ? transaction.transactionValue
            : 0,
        credit:
          transaction.transactionType.toLowerCase() === "credit"
            ? transaction.transactionValue
            : 0,
      };
    })
    .reduce((acc, curr) => {
      const existingEntry = acc.find((entry) => entry.date === curr.date);

      if (existingEntry) {
        existingEntry.debit += curr.debit;
        existingEntry.credit += curr.credit;
      } else {
        acc.push(curr);
      }

      return acc;
    }, [] as ChartData[]);

  const [timeRange, setTimeRange] = useState<string>("90d");
  const filteredData =
    chartData &&
    chartData.filter((item: ChartData) => {
      const date = new Date(item.date);
      const now = new Date();
      let daysToSubtract = 90;
      if (timeRange === "30d") {
        daysToSubtract = 30;
      } else if (timeRange === "7d") {
        daysToSubtract = 7;
      }
      now.setDate(now.getDate() - daysToSubtract);
      return date >= now;
    });

  const chartDataTotal = [
    {
      type: "debit",
      total: transactions?.filter(
        (transaction) => transaction.transactionType.toLowerCase() === "debit"
      ).length as number,
      fill: "var(--color-debit)",
    },
    {
      type: "credit",
      total: transactions?.filter(
        (transaction) => transaction.transactionType.toLowerCase() === "credit"
      ).length as number,
      fill: "var(--color-credit)",
    },
  ];
  const chartDataSum = [
    {
      type: "debit",
      total: transactions
        ?.filter(
          (transaction) => transaction.transactionType.toLowerCase() === "debit"
        )
        .reduce((a, b) => a + b.transactionValue, 0) as number,
      fill: "var(--color-debit)",
    },
    {
      type: "credit",
      total: transactions
        ?.filter(
          (transaction) =>
            transaction.transactionType.toLowerCase() === "credit"
        )
        .reduce((a, b) => a + b.transactionValue, 0) as number,
      fill: "var(--color-credit)",
    },
  ];

  const chartConfigPie = {
    total: {
      label: "Total",
    },
    debit: {
      label: "Debit",
      color: "#0000ff",
    },
    credit: {
      label: "Kredit",
      color: "#ff0000",
    },
  } satisfies ChartConfig;

  const totalTransactions = chartDataTotal.reduce(
    (acc, curr) => acc + curr.total,
    0
  );
  const sumTransactions = chartDataSum.reduce(
    (acc, curr) => acc + curr.total,
    0
  );

  return (
    <>
      <Card>
        <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
          <div className="w-[80vw] grid flex-1 gap-1 text-center sm:text-left">
            <CardTitle>Dashboard</CardTitle>
            <CardDescription>
              Menampilkan Total Transaksi Kredit Dan Debit Dalam 3 Bulan
              Terakhir
            </CardDescription>
          </div>
          {isLoading ? (
            <Skeleton className="w-[160px] h-8 rounded-lg" />
          ) : (
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger
                className="w-[160px] rounded-lg sm:ml-auto"
                aria-label="Select a value"
              >
                <SelectValue placeholder="Last 3 months" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="90d" className="rounded-lg">
                  Last 3 months
                </SelectItem>
                <SelectItem value="30d" className="rounded-lg">
                  Last 30 days
                </SelectItem>
                <SelectItem value="7d" className="rounded-lg">
                  Last 7 days
                </SelectItem>
              </SelectContent>
            </Select>
          )}
        </CardHeader>
        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
          {isLoading ? (
            <Skeleton className="aspect-auto h-[250px] w-full rounded-lg" />
          ) : (
            <ChartContainer
              config={chartConfig}
              className="aspect-auto h-[250px] w-full"
            >
              <AreaChart data={filteredData}>
                <defs>
                  <linearGradient id="fillDebit" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-debit)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-debit)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                  <linearGradient id="fillCredit" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-credit)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-credit)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={32}
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      labelFormatter={(value) => {
                        return new Date(value).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        });
                      }}
                      indicator="dot"
                    />
                  }
                />
                <Area
                  dataKey="debit"
                  type="natural"
                  fill="url(#fillDebit)"
                  stroke="var(--color-debit)"
                  stackId="a"
                />
                <Area
                  dataKey="credit"
                  type="natural"
                  fill="url(#fillCredit)"
                  stroke="var(--color-credit)"
                  stackId="a"
                />
                <ChartLegend content={<ChartLegendContent />} />
              </AreaChart>
            </ChartContainer>
          )}
        </CardContent>
      </Card>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>
          <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
              <CardTitle>Total Transaksi</CardTitle>
              <CardDescription>-</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
              {isLoading ? (
                <Skeleton className="aspect-auto h-[250px] w-full rounded-lg" />
              ) : (
                <ChartContainer
                  config={chartConfigPie}
                  className="mx-auto aspect-square max-h-[250px]"
                >
                  <PieChart>
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideLabel />}
                    />
                    <Pie
                      data={chartDataTotal}
                      dataKey="total"
                      nameKey="type"
                      innerRadius={60}
                      strokeWidth={5}
                    >
                      <Label
                        content={({ viewBox }) => {
                          if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                            return (
                              <text
                                x={viewBox.cx}
                                y={viewBox.cy}
                                textAnchor="middle"
                                dominantBaseline="middle"
                              >
                                <tspan
                                  x={viewBox.cx}
                                  y={viewBox.cy}
                                  className="fill-foreground text-3xl font-bold"
                                >
                                  {totalTransactions}
                                </tspan>
                                <tspan
                                  x={viewBox.cx}
                                  y={(viewBox.cy || 0) + 24}
                                  className="fill-muted-foreground"
                                >
                                  Transaksi
                                </tspan>
                              </text>
                            );
                          }
                        }}
                      />
                    </Pie>
                  </PieChart>
                </ChartContainer>
              )}
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
              <div className="leading-none text-muted-foreground">
                Menampilkan Jumlah Transaksi Yang Telah Di Catat
              </div>
            </CardFooter>
          </Card>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>
          <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
              <CardTitle>Jumlah Transaksi</CardTitle>
              <CardDescription>-</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
              {isLoading ? (
                <Skeleton className="aspect-auto h-[250px] w-full rounded-lg" />
              ) : (
                <ChartContainer
                  config={chartConfigPie}
                  className="mx-auto aspect-square max-h-[250px]"
                >
                  <PieChart>
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideLabel />}
                    />
                    <Pie
                      data={chartDataSum}
                      dataKey="total"
                      nameKey="type"
                      innerRadius={70}
                      strokeWidth={5}
                    >
                      <Label
                        content={({ viewBox }) => {
                          if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                            return (
                              <text
                                x={viewBox.cx}
                                y={viewBox.cy}
                                textAnchor="middle"
                                dominantBaseline="middle"
                              >
                                <tspan
                                  x={viewBox.cx}
                                  y={viewBox.cy}
                                  className="fill-foreground text-sm font-bold"
                                >
                                  {formatter.format(sumTransactions)}
                                </tspan>
                                <tspan
                                  x={viewBox.cx}
                                  y={(viewBox.cy || 0) + 24}
                                  className="fill-muted-foreground"
                                >
                                  {"Jumlah Transaksi"}
                                </tspan>
                              </text>
                            );
                          }
                        }}
                      />
                    </Pie>
                  </PieChart>
                </ChartContainer>
              )}
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
              <div className="leading-none text-muted-foreground">
                Menampilkan Jumlah Transaksi Yang Telah Di Catat
              </div>
            </CardFooter>
          </Card>
        </ResizablePanel>
      </ResizablePanelGroup>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>
          <Card>
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
              <div className="w-[20vw] grid flex-1 gap-1 text-center sm:text-left">
                <CardTitle>Kredit</CardTitle>
                <CardDescription>
                  Menampilkan Total Transaksi Kredit
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="aspect-auto h-[250px] w-full rounded-lg" />
              ) : (
                <ChartContainer config={chartConfig}>
                  <LineChart
                    accessibilityLayer
                    data={chartData}
                    margin={{
                      left: 12,
                      right: 12,
                    }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="date"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideLabel />}
                    />
                    <Line
                      dataKey="credit"
                      type="linear"
                      stroke="var(--color-credit)"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ChartContainer>
              )}
            </CardContent>
          </Card>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel>
          <Card>
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
              <div className="w-[20vw] grid flex-1 gap-1 text-center sm:text-left">
                <CardTitle>Kredit</CardTitle>
                <CardDescription>
                  Menampilkan Total Transaksi Kredit
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="aspect-auto h-[250px] w-full rounded-lg" />
              ) : (
                <ChartContainer config={chartConfig}>
                  <LineChart
                    accessibilityLayer
                    data={chartData}
                    margin={{
                      left: 12,
                      right: 12,
                    }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="date"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideLabel />}
                    />
                    <Line
                      dataKey="debit"
                      type="linear"
                      stroke="var(--color-debit)"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ChartContainer>
              )}
            </CardContent>
          </Card>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
};

export default Home;
