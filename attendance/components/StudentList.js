// components/StudentList.js
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AttendanceButtons from './AttendanceButtons';

const StudentList = ({ students, onMarkAttendance }) => {
  const renderStudentItem = ({ item }) => (
    <View style={styles.studentItem}>
      <Text style={styles.studentName}>{item.name}</Text>
      <AttendanceButtons onMarkAttendance={(status) => onMarkAttendance(item.id, status)} />
    </View>
  );

  return (
    <FlatList
      data={students}
      keyExtractor={(item) => item.id}
      renderItem={renderStudentItem}
      style={styles.studentList}
    />
  );
};

const styles = StyleSheet.create({
  studentList: {
    marginTop: 20,
  },
  studentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
  },
  studentName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default StudentList;