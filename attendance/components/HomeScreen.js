// // components/HomeScreen.js
// import React, { useState, useEffect } from 'react';
// import { ScrollView, View, StyleSheet } from 'react-native';
// import { getData, saveData } from './storage';
// import AddStudentForm from './AddStudentForm';
// import CalendarView from './CalendarView';
// import StudentList from './StudentList';
// import SubmitButton from './SubmitButton';
// import AttendanceRecord from './AttendanceRecord';
// // import moment from 'moment';

// const HomeScreen = () => {
//   const [students, setStudents] = useState([]);
//   const [attendance, setAttendance] = useState({});
//   const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
//   const [currentAttendance, setCurrentAttendance] = useState({});

//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     const savedStudents = await getData('students');
//     const savedAttendance = await getData('attendance');
//     if (savedStudents) setStudents(savedStudents);
//     if (savedAttendance) setAttendance(savedAttendance);
//   };

//   // Add a new student
//   const addStudent = async (name) => {
//     const newStudent = { id: Date.now().toString(), name };
//     const updatedStudents = [...students, newStudent];
//     setStudents(updatedStudents);
//     await saveData('students', updatedStudents);
//   };

//   // Update a student's name
//   const updateStudent = async (studentId, newName) => {
//     const updatedStudents = students.map((student) =>
//       student.id === studentId ? { ...student, name: newName } : student
//     );
//     setStudents(updatedStudents);
//     await saveData('students', updatedStudents);
//   };

//   // Delete a student
//   const deleteStudent = async (studentId) => {
//     const updatedStudents = students.filter((student) => student.id !== studentId);
//     setStudents(updatedStudents);

//     // Remove the student's attendance records
//     const updatedAttendance = Object.keys(attendance).reduce((acc, date) => {
//       acc[date] = { ...attendance[date] };
//       delete acc[date][studentId];
//       return acc;
//     }, {});

//     setAttendance(updatedAttendance);
//     await saveData('students', updatedStudents);
//     await saveData('attendance', updatedAttendance);
//   };

//   // Mark attendance for a student
//   const markAttendance = (studentId, status) => {
//     setCurrentAttendance((prev) => ({
//       ...prev,
//       [studentId]: status,
//     }));
//   };

//   // Submit attendance for the selected date
//   const submitAttendance = async () => {
//     const updatedAttendance = {
//       ...attendance,
//       [selectedDate]: currentAttendance,
//     };
//     setAttendance(updatedAttendance);
//     setCurrentAttendance({});
//     await saveData('attendance', updatedAttendance);
//     setSelectedDate(moment(selectedDate).add(1, 'day').format('YYYY-MM-DD'));
//   };

//   return (
//     <ScrollView style={styles.container}>
//       {/* Add Student Form */}
//       <AddStudentForm onAddStudent={addStudent} />

//       {/* Calendar View */}
//       <CalendarView
//         selectedDate={selectedDate}
//         onSelectDate={(date) => {
//           setSelectedDate(date);
//           setCurrentAttendance(attendance[date] || {});
//         }}
//       />

//       {/* Student List */}
//       <StudentList
//         students={students}
//         onMarkAttendance={markAttendance}
//         onDeleteStudent={deleteStudent}
//         onUpdateStudent={updateStudent}
//       />

//       {/* Submit Button */}
//       <SubmitButton onSubmit={submitAttendance} />

//       {/* Attendance Record */}
//       <AttendanceRecord attendance={attendance[selectedDate]} students={students} selectedDate={selectedDate} />
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     padding: 20,
//     backgroundColor: '#f5f5f5',
//   },
// });

// export default HomeScreen;