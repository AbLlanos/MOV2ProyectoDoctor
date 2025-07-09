import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { supabase } from '../supabase/ConfigSupa';

export default function LoginDoctorScreen({ navigation }: any) {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  async function revisarCredenciales() {
    if (correo.trim() === '' || contrasena.trim() === '') {
      Alert.alert('Campos obligatorios', 'Por favor, completa todos los campos.');
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: correo,
      password: contrasena,
    });

    if (error) {
      console.error(error);
      Alert.alert('Error', 'Credenciales incorrectas o cuenta no existente.');
      return;
    }

    navigation.navigate('Perfil de doctor');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>MedicPlus</Text>
      <Text style={styles.subtitulo}>Iniciar sesión de Doctor</Text>

      <Image
        style={styles.image}
        source={{
          uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5nf4k_OkpsG6PXAYtHweHMdS3-hrjKMa-AN_ehSRCpv3HaDge19LgbowoRnp-1dYEMbo',
        }}
      />

      <View style={styles.inputContenedor}>
        <TextInput
          style={styles.inputTexto}
          placeholder="Correo electrónico"
          onChangeText={setCorreo}
          keyboardType="email-address"
          value={correo}
        />
      </View>

      <View style={styles.inputContenedor}>
        <TextInput
          style={styles.inputTexto}
          placeholder="Contraseña"
          onChangeText={setContrasena}
          value={contrasena}
          secureTextEntry
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
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#DFF6F4',
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
    marginBottom: 24,
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 24,
    borderRadius: 100,
  },
  inputContenedor: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#B6E2DD',
    paddingHorizontal: 14,
    paddingVertical: 7,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  inputTexto: {
    flex: 1,
    marginLeft: 8,
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