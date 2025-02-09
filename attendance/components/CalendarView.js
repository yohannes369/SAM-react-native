// components/CalendarView.js
import React from 'react';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';

const CalendarView = ({ selectedDate, onSelectDate }) => {
  return (
    <Calendar
      onDayPress={(day) => onSelectDate(day.dateString)}
      markedDates={{
        [selectedDate]: { selected: true, selectedColor: '#6200ee' },
      }}
      theme={{
        selectedDayBackgroundColor: '#6200ee',
        todayTextColor: '#6200ee',
        arrowColor: '#6200ee',
      }}
    />
  );
};

export default CalendarView;