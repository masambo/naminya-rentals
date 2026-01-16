import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { format, isSameDay, isBefore, isAfter } from "date-fns";
import { toast } from "sonner";

interface BookingCalendarProps {
  availability: {
    startDate: string;
    endDate: string;
    blockedDates?: string[];
  };
  onDateSelect: (checkIn: Date | null, checkOut: Date | null) => void;
  minimumStay?: number;
}

const BookingCalendar = ({ availability, onDateSelect, minimumStay = 1 }: BookingCalendarProps) => {
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);

  const blockedDates = availability.blockedDates?.map(d => new Date(d)) || [];
  const startDate = new Date(availability.startDate);
  const endDate = new Date(availability.endDate);

  const isDateDisabled = (date: Date) => {
    // Block past dates
    if (isBefore(date, new Date())) return true;
    
    // Block dates outside availability
    if (isBefore(date, startDate) || isAfter(date, endDate)) return true;
    
    // Block booked dates
    if (blockedDates.some(blocked => isSameDay(blocked, date))) return true;
    
    return false;
  };

  useEffect(() => {
    if (checkIn && checkOut) {
      onDateSelect(checkIn, checkOut);
    }
  }, [checkIn, checkOut, onDateSelect]);

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    return Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="space-y-4">
      <Calendar
        mode="range"
        selected={{
          from: checkIn || undefined,
          to: checkOut || undefined,
        }}
        onSelect={(range) => {
          if (range?.from) {
            setCheckIn(range.from);
            if (range.to) {
              const nights = Math.ceil((range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24));
              if (nights >= minimumStay) {
                setCheckOut(range.to);
              } else {
                toast.error(`Minimum stay is ${minimumStay} nights`);
                setCheckOut(null);
              }
            } else {
              setCheckOut(null);
            }
          } else {
            setCheckIn(null);
            setCheckOut(null);
          }
        }}
        disabled={isDateDisabled}
        className="rounded-lg border"
        numberOfMonths={1}
      />
      
      {checkIn && (
        <div className="flex items-center gap-2 text-sm flex-wrap">
          <Badge variant="outline">
            Check-in: {format(checkIn, "MMM d, yyyy")}
          </Badge>
          {checkOut && (
            <>
              <span>→</span>
              <Badge variant="outline">
                Check-out: {format(checkOut, "MMM d, yyyy")}
              </Badge>
              <Badge>
                {calculateNights()} {calculateNights() === 1 ? "night" : "nights"}
              </Badge>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default BookingCalendar;
