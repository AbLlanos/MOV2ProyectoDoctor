import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

export default function LoginDoctorScreen({ navigation }: any) {

  const [correo, setcorreo] = useState("")
  const [contrasena, setcontrasena] = useState("")

  function revisarCredenciales(){

  }


    return (
    <View style={styles.container}>
      <Text style={styles.txtTitulo}>Iniciar sesión</Text>

      <Image
        style={styles.img}
        source={{
          uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5nf4k_OkpsG6PXAYtHweHMdS3-hrjKMa-AN_ehSRCpv3HaDge19LgbowoRnp-1dYEMbo"
        }}
      />

      <View style={styles.formGroup}>
        <Text style={styles.label}>Ingrese su correo electrónico</Text>
        <TextInput
          style={styles.input}
          placeholder='Ingrese su correo'
          placeholderTextColor="#555"
          onChangeText={setcorreo}
          keyboardType='email-address'
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Ingrese su contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder='Ingrese su contraseña'
          placeholderTextColor="#555"
          onChangeText={setcontrasena}
        />
      </View>

      <TouchableOpacity style={styles.btn}
      onPress={()=> navigation.navigate("doctor")}>
        <Text style={styles.txtBtn}>Iniciar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6de3d2",
    padding: 20,
    justifyContent: 'center',
  },
  txtTitulo: {
    fontSize: 45,
    fontWeight: 'bold',
    textAlign: "center",
    marginBottom: 30,
    color: "#333",
  },
  img: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: "center",
    marginBottom: 30,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    color: "#333",
    fontWeight: "500",
    textAlign:"center"
  },
  input: {
    backgroundColor: "#e6e6e6",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    textAlign:"center"
  },
  btn: {
    backgroundColor: "#237eb3",
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 10,
  },
  txtBtn: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});