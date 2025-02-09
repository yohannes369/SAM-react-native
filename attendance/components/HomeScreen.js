// components/HomeScreen.js
import React, { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { getData, saveData } from './storage';
import AddStudentForm from './AddStudentForm';
import CalendarView from './CalendarView';
import StudentList from './StudentList';
import SubmitButton from './SubmitButton';
import AttendanceRecord from './AttendanceRecord';
import moment from 'moment';

const HomeScreen = () => {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  const [currentAttendance, setCurrentAttendance] = useState({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const savedStudents = await getData('students');
    const savedAttendance = await getData('attendance');
    if (savedStudents) setStudents(savedStudents);
    if (savedAttendance) setAttendance(savedAttendance);
  };

  const addStudent = async (name) => {
    const newStudent = { id: Date.now().toString(), name };
    const updatedStudents = [...students, newStudent];
    setStudents(updatedStudents);
    await saveData('students', updatedStudents);
  };

  const markAttendance = (studentId, status) => {
    setCurrentAttendance((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const submitAttendance = async () => {
    const updatedAttendance = {
      ...attendance,
      [selectedDate]: currentAttendance,
    };
    setAttendance(updatedAttendance);
    await saveData('attendance', updatedAttendance);
    setCurrentAttendance({});
    setSelectedDate(moment(selectedDate).add(1, 'day').format('YYYY-MM-DD')); // Automatically move to the next day
  };

  return (
    <ScrollView style={styles.container}>
      <AddStudentForm onAddStudent={addStudent} />
      <CalendarView selectedDate={selectedDate} onSelectDate={setSelectedDate} />
      <StudentList students={students} onMarkAttendance={markAttendance} />
      <SubmitButton onSubmit={submitAttendance} />
      <AttendanceRecord
        attendance={attendance[selectedDate]}
        students={students}
        selectedDate={selectedDate} // Pass the selected date to the AttendanceRecord component
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
});

export default HomeScreen;