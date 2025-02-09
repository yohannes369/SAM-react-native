// components/ToggleButton.js
import React from 'react';
import { Switch, StyleSheet, View } from 'react-native';

const ToggleButton = ({ isDarkMode, onToggle }) => {
  return (
    <View style={styles.container}>
      <Switch
        value={isDarkMode}
        onValueChange={onToggle}
        trackColor={{ false: '#ccc', true: '#6200ee' }}
        thumbColor={isDarkMode ? '#fff' : '#f4f3f4'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 15,
  },
});

export default ToggleButton;