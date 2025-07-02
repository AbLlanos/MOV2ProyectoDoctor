import React from 'react';
import { StyleSheet, View } from 'react-native';
import VentanaDoctorNavigator from '../../navigations/VentanaDoctorNavigator';

export default function DoctorScreen() {
  return (
    <View style={styles.container}>
      <VentanaDoctorNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
