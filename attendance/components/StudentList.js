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
      keyExtractor={(item) => item.id.toString()} // Ensures unique keys
      renderItem={renderStudentItem}
      contentContainerStyle={styles.listContainer} // Added for better layout
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
  },
  studentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)', // Softer border
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Increased transparency
    borderRadius: 8, // Smooth corners
    marginBottom: 10,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08, // Softer shadow for transparency
    shadowRadius: 4,
  },
  studentName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222', // Darker text for contrast
  },
});

export default StudentList;
