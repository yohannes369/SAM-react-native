import React, { useState, useEffect } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ImageBackground, StyleSheet, View, Dimensions, ScrollView } from 'react-native';
import moment from 'moment';

import ToggleButton from './components/ToggleButton';
import AddStudentForm from './components/AddStudentForm';
import CalendarView from './components/CalendarView';
import StudentList from './components/StudentList';
import AttendanceButtons from './components/AttendanceButtons';
import AttendanceRecord from './components/AttendanceRecord';
import SubmitButton from './components/SubmitButton';
import { getData, saveData } from './components/storage';

const Stack = createStackNavigator();
const { width, height } = Dimensions.get('window');

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

  const updateStudent = async (studentId, newName) => {
    const updatedStudents = students.map((student) =>
      student.id === studentId ? { ...student, name: newName } : student
    );
    setStudents(updatedStudents);
    await saveData('students', updatedStudents);
  };

  const deleteStudent = async (studentId) => {
    const updatedStudents = students.filter((student) => student.id !== studentId);
    setStudents(updatedStudents);

    const updatedAttendance = Object.keys(attendance).reduce((acc, date) => {
      acc[date] = { ...attendance[date] };
      delete acc[date][studentId];
      return acc;
    }, {});

    setAttendance(updatedAttendance);
    await saveData('students', updatedStudents);
    await saveData('attendance', updatedAttendance);
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
    setCurrentAttendance({});
    await saveData('attendance', updatedAttendance);
    setSelectedDate(moment(selectedDate).add(1, 'day').format('YYYY-MM-DD'));
  };

  return (
    <ImageBackground
      source={{ uri: 'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <ScrollView style={styles.container}>
        <AddStudentForm onAddStudent={addStudent} />
        <CalendarView
          selectedDate={selectedDate}
          onSelectDate={(date) => {
            setSelectedDate(date);
            setCurrentAttendance(attendance[date] || {});
          }}
        />
        <StudentList
          students={students}
          onMarkAttendance={markAttendance}
          onDeleteStudent={deleteStudent}
          onUpdateStudent={updateStudent}
        />
        <SubmitButton onSubmit={submitAttendance} />
        <AttendanceRecord attendance={attendance[selectedDate]} students={students} selectedDate={selectedDate} />
      </ScrollView>
    </ImageBackground>
  );
};

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = isDarkMode ? DarkTheme : DefaultTheme;

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Attendance App',
            headerRight: () => (
              <ToggleButton
                isDarkMode={isDarkMode}
                onToggle={() => setIsDarkMode(!isDarkMode)}
              />
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: width,
    height: height,
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: 'transparent',
  },
});

export default App;