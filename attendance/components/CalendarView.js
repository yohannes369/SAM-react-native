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
        textDayFontSize: 16,   // Increase day label font size
        textDayHeaderFontSize: 14, // Increase day header (Sun, Mon, etc.) font size
        monthMarginVertical: 8, // Reduce spacing above and below the month name
        calendarPaddingVertical: 8, // Reduce padding inside the calendar
        backgroundColor: 'transparent', // Set the background color to transparent
        calendarBackground: 'transparent', // Set the calendar background to transparent
        dayTextColor: '#FFFFFF', // Set day text color to white
        monthTextColor: '#FFFFFF', // Set month text color to white
        textSectionTitleColor: '#FFFFFF', // Set day header (Sun, Mon, etc.) color to white
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
    backgroundColor: 'transparent', // Set the container background to transparent
  },
};

export default CalendarView;
