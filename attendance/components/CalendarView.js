// components/CalendarView.js
import React from 'react';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';

const CalendarView = ({ selectedDate, onSelectDate }) => {
  return (
    <Calendar
      style={styles.calendarContainer} // Adjust the overall container size
      onDayPress={(day) => onSelectDate(day.dateString)}
      markedDates={{
        [selectedDate]: { selected: true, selectedColor: '#6200ee' },
      }}
      theme={{
        selectedDayBackgroundColor: '#6200ee',
        todayTextColor: '#6200ee',
        arrowColor: '#6200ee',
        textMonthFontSize: 14, // Reduce month name font size
        textDayFontSize: 12,   // Reduce day label font size
        textDayHeaderFontSize: 12, // Reduce day header (Sun, Mon, etc.) font size
        monthMarginVertical: 8, // Reduce spacing above and below the month name
        calendarPaddingVertical: 8, // Reduce padding inside the calendar
      }}
      hideArrows={false} // Optional: Hide arrows if you want a more compact design
      hideExtraDays={true} // Optional: Hide extra days at the start/end of the month
    />
  );
};

// Custom styles for the calendar container
const styles = {
  calendarContainer: {
    height: 300, // Decrease the height of the calendar
    width: '100%', // Ensure it spans the full width
    marginBottom: 16, // Add some spacing below the calendar
  },
};

export default CalendarView;