import { Alert, Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { supabase } from '../supabase/ConfigSupa';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/ConfigFire';
import * as Haptics from 'expo-haptics';

export default function LoginDoctorScreen({ navigation }: any) {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  async function revisarCredenciales() {
    if (correo.trim() === '' || contrasena.trim() === '') {
      Alert.alert('Campos obligatorios', 'Por favor, completa todos los campos.');
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }

    try {

      //Firebase
      const userCredential = await signInWithEmailAndPassword(auth, correo, contrasena);
      const firebaseUser = userCredential.user;

      if (!firebaseUser) {
        Alert.alert('Error', 'No se pudo autenticar en Firebase.');
        return;
      }

      //Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email: correo,
        password: contrasena,
      });

      if (error) {
        Alert.alert('Error', 'Credenciales incorrectas. Verifique sus datos.');
        return;
      }
      limpiarCampos();
      navigation.navigate('Perfil de doctor');

    } catch (error: any) {
      if (error.code) {
        console.log(error.code)
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        switch (error.code) {
          case 'auth/user-not-found':
            Alert.alert('Usuario no encontrado', 'No existe una cuenta con ese correo.');
            break;
          case 'auth/wrong-password':
            Alert.alert('Contraseña incorrecta', 'La contraseña es incorrecta.');
            break;
          case 'auth/invalid-credential':
            Alert.alert('Credencial inválida', 'La información de autenticación no es válida. Intenta nuevamente.');
            break;
          case 'auth/too-many-requests':
            Alert.alert(
              'Demasiados intentos',
              'Has intentado iniciar sesión demasiadas veces. Por favor, espera unos minutos antes de volver a intentarlo.'
            );
            break;
          default:
            Alert.alert('Error Firebase', error.message || 'Error desconocido en Firebase.');
            break;
        }

      } else {

        Alert.alert('Error', error.message || 'Algo salió mal al iniciar sesión.');
      }
    }
  }

  function limpiarCampos() {
    setCorreo('');
    setContrasena('');
  }

  return (
    <ImageBackground
      source={{ uri: 'https://images.pexels.com/photos/32828950/pexels-photo-32828950.jpeg' }}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.titulo}>MedicPlus</Text>
          <Text style={styles.subtitulo}>Iniciar sesión de Doctor</Text>

          <Image
            style={styles.image}
            source={{
              uri: 'https://hips.hearstapps.com/hmg-prod/images/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg?crop=0.66698xw:1xh;center,top&resize=640:*',
            }}
          />

          <View style={styles.inputContenedor}>
            <TextInput
              style={styles.inputTexto}
              placeholder="Correo electrónico"
              onChangeText={(texto) => setCorreo(texto)}
              keyboardType="email-address"
              value={correo}
              placeholderTextColor="#666"
            />
          </View>

          <View style={styles.inputContenedor}>
            <TextInput
              style={styles.inputTexto}
              placeholder="Contraseña"
              onChangeText={(texto) => setContrasena(texto)}
              value={contrasena}
              secureTextEntry
              placeholderTextColor="#666"
            />
          </View>

          <TouchableOpacity style={styles.Boton} onPress={revisarCredenciales}>
            <View style={styles.btn}>
              <Text style={styles.btnText}>Iniciar sesión</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.ContainerL}>
            <Text style={styles.TextL} onPress={() => navigation.navigate('Registro doctor')}>
              ¿No tienes cuenta? Regístrate
            </Text>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2B7A78',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4CAEA9',
    textAlign: 'center',
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 24,
    borderRadius: 75,
  },
  inputContenedor: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#B6E2DD',
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 18,
  },
  inputTexto: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  Boton: {
    marginBottom: 16,
    borderRadius: 10,
    overflow: 'hidden',
  },
  btn: {
    backgroundColor: '#3AAFA9',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  ContainerL: {
    alignItems: 'center',
    marginTop: 10,
  },
  TextL: {
    fontSize: 14,
    color: '#2B7A78',
    textDecorationLine: 'underline',
  },
});