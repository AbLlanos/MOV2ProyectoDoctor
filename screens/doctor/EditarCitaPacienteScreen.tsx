import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { supabase } from '../../supabase/ConfigSupa'
import { getDatabase, ref, update } from 'firebase/database'
import { db } from '../../firebase/ConfigFire'


export default function EditarCitaPacienteScreen() {
    const [idCita, setidCita] = useState("")
    const [nombreApellidoPaciente, setnombreApellidoPaciente] = useState("")
    const [cedula, setcedula] = useState("")
    const [edad, setedad] = useState("")
    const [correo, setcorreo] = useState("")
    const [telefono, settelefono] = useState("")
    const [tipoSangre, settipoSangre] = useState("")
    const [direccion, setdireccion] = useState("")
    const [especialidadRequerida, setespecialidadRequerida] = useState("")
    const [motivo, setmotivo] = useState("")
    const [nombreApellidoDoctor, setnombreApellidoDoctor] = useState("")
    const [estado, setestado] = useState("")
    const [fecha, setfecha] = useState("")
    const [ubicacionCita, setubicacionCita] = useState("")

    const editarConsulta = async () => {
        if (idCita.trim() === "") {
            Alert.alert("Incompleto", "Debe poner la id de la consulta")
            return
        }

        const datosCita = {
            nombreApellidoPaciente,
            cedula,
            edad,
            correoElectronico: correo,
            telefono,
            tipoSangre,
            direccion,
            especialidadRequerida,
            motivo,
            nombreApellidoDoctor,
            estado,
            fecha,
            ubicacionCita,
        };

        try {
            
            // Actualizar en Supabase
            const { error } = await supabase
                .from('citaMedica')
                .update(datosCita)
                .eq('id', idCita);

            if (error) {
                Alert.alert('Error en Supabase', error.message);
                return;
            }

            // Actualizar en Firebase Realtime Database
            const citaRef = ref(db, `citas_medicas/${idCita}`);

            await update(citaRef, {
                ...datosCita,
                id_doctor_supabase: nombreApellidoDoctor, 
                id_paciente_firebase: cedula,             
                id: idCita,
            });

            Alert.alert('Éxito', 'La cita se actualizó correctamente en ambas bases.');

        } catch (err) {
            Alert.alert('Error', 'Ocurrió un problema al actualizar la cita.');
            console.error(err);
        }
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.titulo}>MedicPlus</Text>
                <Text style={styles.subtitulo}>Para editar la cita debe ingresar el ID</Text>

                <TextInput
                    style={styles.input}
                    placeholder="ID de la cita médica"
                    onChangeText={setidCita}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Nombre del paciente"
                    onChangeText={setnombreApellidoPaciente}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Cédula"
                    onChangeText={setcedula}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Edad"
                    keyboardType="numeric"
                    onChangeText={setedad}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Correo electrónico"
                    keyboardType="email-address"
                    onChangeText={setcorreo}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Teléfono"
                    keyboardType="phone-pad"
                    onChangeText={settelefono}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Tipo de sangre"
                    onChangeText={settipoSangre}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Dirección"
                    onChangeText={setdireccion}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Especialidad requerida"
                    onChangeText={setespecialidadRequerida}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Motivo de la cita"
                    onChangeText={setmotivo}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Nombre del doctor"
                    onChangeText={setnombreApellidoDoctor}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Estado de la cita"
                    onChangeText={setestado}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Fecha de la cita"
                    onChangeText={setfecha}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Ubicación"
                    onChangeText={setubicacionCita}
                />

                <TouchableOpacity style={styles.Boton} onPress={editarConsulta}>
                    <View style={styles.btn}>
                        <Text style={styles.btnText}>Editar cita del paciente</Text>
                    </View>
                </TouchableOpacity>
            </View>
            
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
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
        fontSize: 16,
        fontWeight: '600',
        color: '#4CAEA9',
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
    Boton: {
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
});
