import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { supabase } from '../../supabase/ConfigSupa'
import { ref, push } from 'firebase/database'
import { db } from '../../firebase/ConfigFire'

export default function GuardarCitaMedica() {
  const [nombreApellidoPaciente, setNombreApellidoPaciente] = useState("")
  const [cedula, setCedula] = useState("")
  const [edad, setEdad] = useState("")
  const [correoElectronico, setCorreoElectronico] = useState("")
  const [telefono, setTelefono] = useState("")
  const [tipoSangre, setTipoSangre] = useState("")
  const [direccion, setDireccion] = useState("")
  const [especialidadRequerida, setEspecialidadRequerida] = useState("")
  const [motivo, setMotivo] = useState("")
  const [nombreApellidoDoctor, setNombreApellidoDoctor] = useState("")
  const [estado, setEstado] = useState("")
  const [fecha, setFecha] = useState("")
  const [ubicacionCita, setUbicacionCita] = useState("")

  const guardarCita = async () => {
    const datosCita = {
      nombreApellidoPaciente,
      cedula,
      edad,
      correoElectronico,
      telefono,
      tipoSangre,
      direccion,
      especialidadRequerida,
      motivo,
      nombreApellidoDoctor,
      estado,
      fecha,
      ubicacionCita,
    }

    try {
      // 1. Guardar en Supabase
      const { data, error } = await supabase
        .from('citaMedica')
        .insert([datosCita])
        .select()

      if (error) {
        Alert.alert('Error en Supabase', error.message)
        return
      }

      const idGenerado = data[0].id

      // 2. Guardar en Firebase
      const citaRef = ref(db, `citas_medicas/${idGenerado}`)
      await push(citaRef, {
        ...datosCita,
        id: idGenerado,
        id_doctor_supabase: nombreApellidoDoctor,
        id_paciente_firebase: cedula,
      })

      Alert.alert('Éxito', 'La cita médica fue registrada en ambas bases de datos.')
    } catch (err) {
      console.error(err)
      Alert.alert('Error', 'Ocurrió un problema al guardar la cita.')
    }
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.titulo}>Registrar Cita Médica</Text>

        <TextInput style={styles.input} placeholder="Nombre del paciente" onChangeText={setNombreApellidoPaciente} />
        <TextInput style={styles.input} placeholder="Cédula" onChangeText={setCedula} />
        <TextInput style={styles.input} placeholder="Edad" onChangeText={setEdad} />
        <TextInput style={styles.input} placeholder="Correo electrónico" onChangeText={setCorreoElectronico} />
        <TextInput style={styles.input} placeholder="Teléfono" onChangeText={setTelefono} />
        <TextInput style={styles.input} placeholder="Tipo de sangre" onChangeText={setTipoSangre} />
        <TextInput style={styles.input} placeholder="Dirección" onChangeText={setDireccion} />
        <TextInput style={styles.input} placeholder="Especialidad requerida" onChangeText={setEspecialidadRequerida} />
        <TextInput style={styles.input} placeholder="Motivo" onChangeText={setMotivo} />
        <TextInput style={styles.input} placeholder="Nombre del doctor" onChangeText={setNombreApellidoDoctor} />
        <TextInput style={styles.input} placeholder="Estado" onChangeText={setEstado} />
        <TextInput style={styles.input} placeholder="Fecha" onChangeText={setFecha} />
        <TextInput style={styles.input} placeholder="Ubicación" onChangeText={setUbicacionCita} />

        <TouchableOpacity style={styles.boton} onPress={guardarCita}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>Guardar Cita</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#DFF6F4',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2B7A78',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#B6E2DD',
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 16,
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  boton: {
    marginBottom: 30,
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
})
