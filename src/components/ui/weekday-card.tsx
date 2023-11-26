import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

// Create an interface for the props weekdayName and weekdayNumber

type WeekdayCardProps = {
    weekdayName: string;
    weekdayNumber: number;
  };
  
// Create a component named WeekdayCard that receives weekdayName and weekdayNumber as props

const WeekdayCard: React.FC<WeekdayCardProps> = ({ weekdayName, weekdayNumber }) => {
  return (
    <Card className="flex-grow">
      <CardHeader>
        <CardTitle>
          <div className="flex space-x-1 place-content-center">
            <p className="font-normal">{weekdayName}</p>
            <p>{weekdayNumber}</p>
          </div>
        </CardTitle>
      </CardHeader>
    </Card>
  );
};

// Create and export as default a function named WeekdayCards that maps the weekdayCard component using a weekdayName and weekdayNumber as props

export default function WeekdayCards() {
  const currentDate = new Date();
  const numberOfDays = 7;

  const calculateDayNumber = (date: Date, index: number) => {
  const currentDayOfWeek = date.getDay();
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - currentDayOfWeek + index).getDate();
};

const formatWeekdayName = (date: Date, index: number) => {
  const updatedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + index);
  return updatedDate.toLocaleDateString("en-US", { weekday: "short" });
};
  const renderWeekdayCards = () => {
    const cards = [];
    for (let index = 0; index < numberOfDays; index++) {
        const weekdayNumber = calculateDayNumber(currentDate, index);
        const weekdayName = formatWeekdayName(currentDate, index);

      cards.push(
        <WeekdayCard
          key={index}
          weekdayName={weekdayName}
          weekdayNumber={weekdayNumber}
        />
      );
    }

    return cards;
  };

  return (
    <>
      <ScrollArea className="flex-nowrap">
          <div className="flex space-x-1 p-8">
            {renderWeekdayCards()}
          </div>
          <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </>
  );
}
