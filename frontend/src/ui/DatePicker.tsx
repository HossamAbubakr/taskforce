import { useState } from "react";

function DatePicker() {
  const [date, setDate] = useState("");
  const aWeekAhead = new Date();
  console.log(date);

  aWeekAhead.setDate(aWeekAhead.getDate() + 7);
  return (
    <div>
      <input
        type="date"
        defaultValue={aWeekAhead.toDateString()}
        onChange={(e) => setDate(e.target.value)}
      />
    </div>
  );
}

export default DatePicker;
