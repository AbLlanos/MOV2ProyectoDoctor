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

    const [citaCargada, setCitaCargada] = useState(false)


    async function buscarCita() {
        if (idCita.trim() === "") {
            Alert.alert("Error", "Por favor ingresa el ID de la cita para buscarla")
            return
        }

        try {

            const { data: { user }, error: userError } = await supabase.auth.getUser()
            if (userError || !user) {
                Alert.alert("Error", "No hay usuario autenticado")
                return
            }

            const { data, error } = await supabase
                .from('citaMedica')
                .select('*')
                .eq('id', idCita)
                .single()

            if (error || !data) {
                limpiarCampos();
                Alert.alert("No encontrado", "No existe cita con ese ID")
                setCitaCargada(false)
                return
            }

            if (data.nombreApellidoDoctor !== user.id) {
                Alert.alert("Acceso denegado", "No puedes acceder a una cita que no te pertenece")
                setCitaCargada(false)
                return
            }

            setnombreApellidoPaciente(data.nombreApellidoPaciente || "")
            setcedula(data.cedula || "")
            setedad(data.edad || "")
            setcorreo(data.correoElectronico || "")
            settelefono(data.telefono || "")
            settipoSangre(data.tipoSangre || "")
            setdireccion(data.direccion || "")
            setespecialidadRequerida(data.especialidadRequerida || "")
            setmotivo(data.motivo || "")
            setnombreApellidoDoctor(data.nombreApellidoDoctor || "")
            setestado(data.estado || "")
            setfecha(data.fecha || "")
            setubicacionCita(data.ubicacionCita || "")

            setCitaCargada(true)
        } catch (error) {
            console.error(error)
            limpiarCampos();
            Alert.alert("Error", "Error al buscar la cita")
            setCitaCargada(false)
        }
    }

    async function editarConsulta() {
        if (idCita.trim() === "") {
            limpiarCampos();
            Alert.alert("Incompleto", "Debe poner la id de la consulta")
            return
        }
        if (!citaCargada) {
            limpiarCampos();
            Alert.alert("Error", "Primero debe cargar una cita válida usando el ID")
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
        }

        try {
            // Actualizar en Supabase
            const { error } = await supabase
                .from('citaMedica')
                .update(datosCita)
                .eq('id', idCita)

            if (error) {
                Alert.alert('Error en Supabase', error.message)
                return
            }

            // Actualizar en Firebase Realtime Database
            const citaRef = ref(db, `citas_medicas/${idCita}`)

            await update(citaRef, {
                ...datosCita,
                nombreApellidoDoctor: nombreApellidoDoctor,
                nombreApellidoPaciente: cedula,
                id: idCita,
            })

            limpiarCampos();
            Alert.alert('Éxito', 'La cita se actualizó correctamente en ambas bases.')

        } catch (err) {
            Alert.alert('Error', 'Ocurrió un problema al actualizar la cita.')
            console.error(err)
        }
    }




    function limpiarCampos() {
        setidCita("")
        setnombreApellidoPaciente("")
        setcedula("")
        setedad("")
        setcorreo("")
        settelefono("")
        settipoSangre("")
        setdireccion("")
        setespecialidadRequerida("")
        setmotivo("")
        setnombreApellidoDoctor("")
        setestado("")
        setfecha("")
        setubicacionCita("")
        setCitaCargada(false)
    }


    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.titulo}>MedicPlus</Text>
                <Text style={styles.subtitulo}>Para editar la cita debe ingresar el ID y buscarla</Text>

                <Text style={styles.label}>ID de la cita médica</Text>
                <TextInput
                    style={styles.input}
                    placeholder="ID de la cita médica"
                    value={idCita}
                    onChangeText={setidCita}
                />
                <TouchableOpacity style={styles.Boton} onPress={buscarCita}>
                    <View style={styles.btn}>
                        <Text style={styles.btnText}>Buscar cita</Text>
                    </View>
                </TouchableOpacity>

                <Text style={styles.label}>Nombre del paciente</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nombre del paciente"
                    value={nombreApellidoPaciente}
                    editable={false}
                />

                <Text style={styles.label}>Cédula</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Cédula"
                    editable={false}
                    value={cedula}
                />

                <Text style={styles.label}>Edad</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Edad"
                    editable={false}
                    keyboardType="numeric"
                    value={edad}
                />

                <Text style={styles.label}>Correo electrónico</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Correo electrónico"
                    editable={false}
                    keyboardType="email-address"
                    value={correo}
                />

                <Text style={styles.label}>Teléfono</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Teléfono"
                    editable={false}
                    keyboardType="phone-pad"
                    value={telefono}
                />

                <Text style={styles.label}>Tipo de sangre</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Tipo de sangre"
                    editable={false}
                    value={tipoSangre}
                />

                <Text style={styles.label}>Dirección</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Dirección"
                    editable={false}
                    value={direccion}
                />

                <Text style={styles.label}>Especialidad requerida</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Especialidad requerida"
                    editable={false}
                    value={especialidadRequerida}
                />

                <Text style={styles.label}>Motivo de la cita</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Motivo de la cita"
                    editable={false}
                    value={motivo}
                />

                <Text style={styles.label}>Estado de la cita (modificable)</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Estado de la cita"
                    value={estado}
                    onChangeText={setestado}
                />

                <Text style={styles.label}>Fecha de la cita</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Fecha de la cita"
                    editable={false}
                    value={fecha}
                />

                <Text style={styles.label}>Ubicación</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ubicación"
                    editable={false}
                    value={ubicacionCita}
                />

                <TouchableOpacity style={styles.Boton} onPress={editarConsulta}>
                    <View style={styles.btn}>
                        <Text style={styles.btnText}>Editar cita del paciente</Text>
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
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#2B7A78',
        marginBottom: 6,
        marginLeft: 6,
    },
})
