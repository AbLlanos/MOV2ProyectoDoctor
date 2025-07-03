import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { supabase } from '../../supabase/ConfigSupa'

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


    async function guardarConsulta() {

        const { error } = await supabase
            .from('citaMedica')
            .insert({
                nombreApellidoPaciente: nombreApellidoPaciente,
                cedula: cedula,
                edad: edad,
                correoElectronico: correo,
                telefono: telefono,
                tipoSangre: tipoSangre,
                direccion: direccion,
                especialidadRequerida: especialidadRequerida,
                motivo: motivo,
                nombreApellidoDoctor: nombreApellidoDoctor,
                estado: estado,
                fecha: fecha,
                ubicacionCita: ubicacionCita,
            })
        if (error) {
            Alert.alert("Error", error.message);
        } else {
            Alert.alert("Éxito", "Cita guardada correctamente.");
        }

    }


    async function editarConsulta() {

        if (idCita.trim() === "") {
            Alert.alert("Incomplet", "Debe poner la id de la consulta")
            return
        }

        const { error } = await supabase
            .from('citaMedica')
            .update({
                nombreApellidoPaciente: nombreApellidoPaciente,
                cedula: cedula,
                edad: edad,
                correoElectronico: correo,
                telefono: telefono,
                tipoSangre: tipoSangre,
                direccion: direccion,
                especialidadRequerida: especialidadRequerida,
                motivo: motivo,
                nombreApellidoDoctor: nombreApellidoDoctor,
                estado: estado,
                fecha: fecha,
                ubicacionCita: ubicacionCita,
            })
            .eq('id', 1)
    }


    return (
        <ScrollView style={styles.container}>
            <Text style={styles.titulo}>Revisión de la cita médica del paciente</Text>

            <TextInput
                style={styles.input}
                placeholder="Nombre del paciente"
                onChangeText={(texto) => setnombreApellidoPaciente(texto)}
            />
            <TextInput
                style={styles.input}
                placeholder="Cédula"
                onChangeText={(texto) => setcedula(texto)}
            />
            <TextInput
                style={styles.input}
                placeholder="Edad"
                keyboardType="numeric"
                onChangeText={(texto) => setedad(texto)}
            />
            <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                keyboardType="email-address"
                onChangeText={(texto) => setcorreo(texto)}
            />
            <TextInput
                style={styles.input}
                placeholder="Teléfono"
                keyboardType="phone-pad"
                onChangeText={(texto) => settelefono(texto)}
            />
            <TextInput
                style={styles.input}
                placeholder="Tipo de sangre"
                onChangeText={(texto) => settipoSangre(texto)}
            />
            <TextInput
                style={styles.input}
                placeholder="Dirección"
                onChangeText={(texto) => setdireccion(texto)}
            />
            <TextInput
                style={styles.input}
                placeholder="Especialidad requerida"
                onChangeText={(texto) => setespecialidadRequerida(texto)}
            />
            <TextInput
                style={styles.input}
                placeholder="Motivo de la cita"
                onChangeText={(texto) => setmotivo(texto)}
            />
            <TextInput
                style={styles.input}
                placeholder="Nombre del doctor"
                onChangeText={(texto) => setnombreApellidoDoctor(texto)}
            />
            <TextInput
                style={styles.input}
                placeholder="Estado de la cita"
                onChangeText={(texto) => setestado(texto)}
            />
            <TextInput
                style={styles.input}
                placeholder="fecha de la cita"
                onChangeText={(texto) => setfecha(texto)}
            />
            <TextInput
                style={styles.input}
                placeholder="Ubicacion"
                onChangeText={(texto) => setubicacionCita(texto)}
            />

            <TouchableOpacity style={styles.btn} onPress={guardarConsulta}>
                <Text style={styles.btnText}>Guardar Cita</Text>
            </TouchableOpacity>


            <Text style={styles.titulo}>Edicion</Text>

            <TextInput
                style={styles.input}
                placeholder="Debe ingresar el id de la consulta"
                onChangeText={(texto) => setidCita(texto)}
            />

            <TextInput
                style={styles.input}
                placeholder="Nombre del paciente"
                onChangeText={(texto) => setnombreApellidoPaciente(texto)}
            />
            <TextInput
                style={styles.input}
                placeholder="Cédula"
                onChangeText={(texto) => setcedula(texto)}
            />
            <TextInput
                style={styles.input}
                placeholder="Edad"
                keyboardType="numeric"
                onChangeText={(texto) => setedad(texto)}
            />
            <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                keyboardType="email-address"
                onChangeText={(texto) => setcorreo(texto)}
            />
            <TextInput
                style={styles.input}
                placeholder="Teléfono"
                keyboardType="phone-pad"
                onChangeText={(texto) => settelefono(texto)}
            />
            <TextInput
                style={styles.input}
                placeholder="Tipo de sangre"
                onChangeText={(texto) => settipoSangre(texto)}
            />
            <TextInput
                style={styles.input}
                placeholder="Dirección"
                onChangeText={(texto) => setdireccion(texto)}
            />
            <TextInput
                style={styles.input}
                placeholder="Especialidad requerida"
                onChangeText={(texto) => setespecialidadRequerida(texto)}
            />
            <TextInput
                style={styles.input}
                placeholder="Motivo de la cita"
                onChangeText={(texto) => setmotivo(texto)}
            />
            <TextInput
                style={styles.input}
                placeholder="Nombre del doctor"
                onChangeText={(texto) => setnombreApellidoDoctor(texto)}
            />
            <TextInput
                style={styles.input}
                placeholder="Estado de la cita"
                onChangeText={(texto) => setestado(texto)}
            />
            <TextInput
                style={styles.input}
                placeholder="fecha de la cita"
                onChangeText={(texto) => setfecha(texto)}
            />
            <TextInput
                style={styles.input}
                placeholder="Ubicacion"
                onChangeText={(texto) => setubicacionCita(texto)}
            />

            <TouchableOpacity style={styles.btn} onPress={editarConsulta}>
                <Text style={styles.btnText}>Editar cita del paciente</Text>
            </TouchableOpacity>
        </ScrollView>

    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f4f4f4',
        flex: 1,
    },
    titulo: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 14,
        fontSize: 16,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    btn: {
        backgroundColor: '#5ee8e8',
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 40,
    },
    btnText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});