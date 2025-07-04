import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

export default function WelcomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.bienvenida}>¡Bienvenido!</Text>
      <Text style={styles.title}>MedicPlus</Text>
      <Text style={styles.subtitle}>Portal para Doctores</Text>

      <Image
        source={{
          uri: 'https://images.pexels.com/photos/4386489/pexels-photo-4386489.jpeg',
        }}
        style={styles.bannerImage}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login doctor')}
        >
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/128/295/295128.png' }}
            style={styles.image}
          />
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Registro doctor')}
        >
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/128/16206/16206813.png' }}
            style={styles.image}
          />
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DFF6F4',
    padding: 24,
    justifyContent: 'center',
  },
  bienvenida: {
    fontSize: 25,
    textAlign: 'center',
    color: '#4CAEA9',
    fontWeight: '600',
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#2B7A78',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 18,
    color: '#4CAEA9',
    textAlign: 'center',
    marginBottom: 24,
  },
  bannerImage: {
    width: 250,
    height: 250,
    alignSelf: 'center',
    marginBottom: 30,
    borderRadius: 150,
  },
  buttonContainer: {
    gap: 20,
  },
  button: {
    backgroundColor: '#3AAFA9',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  image: {
    width: 32,
    height: 32,
    marginRight: 14,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
