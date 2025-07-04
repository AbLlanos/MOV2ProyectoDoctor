import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { supabase } from '../supabase/ConfigSupa';


export default function RegistroDoctorScreen({ navigation }: any) {
    const [nombre, setNombre] = useState('');
    const [cedula, setCedula] = useState('');
    const [edad, setEdad] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [especialidad, setEspecialidad] = useState('');

    async function registrarDoctor() {
        if (
            nombre.trim() === '' ||
            cedula.trim() === '' ||
            edad.trim() === '' ||
            telefono.trim() === '' ||
            correo.trim() === '' ||
            contrasena.trim() === '' ||
            especialidad.trim() === ''
        ) {
            Alert.alert('Campos requeridos', 'Por favor, complete todos los campos.');
            return;
        }
        const { error } = await supabase.from('doctores').insert([
            {
                nombreCompleto: nombre,
                cedula: cedula,
                edad: edad,
                telefono: telefono,
                correo: correo,
                contrasena: contrasena,
                especialidad: especialidad,
            },
        ]);

        limpiarCampos();

        Alert.alert('Registro exitoso', 'Doctor registrado correctamente.');
        navigation.navigate('Login doctor');
    }

    function limpiarCampos() {
        setNombre('');
        setCedula('');
        setEdad('');
        setTelefono('');
        setCorreo('');
        setContrasena('');
        setEspecialidad('');
    }

    return (



            <View style={styles.container}>

                <Text style={styles.titulo}>MedicPlus</Text>
                <Text style={styles.subtitulo}>Registro de Doctor</Text>

                <TextInput style={styles.inputContenedor}
                    placeholder="Nombre completo"
                    value={nombre}
                    onChangeText={(texto) => setNombre(texto)} />

                <TextInput
                    style={styles.inputContenedor}
                    placeholder="Cédula"
                    value={cedula}
                    keyboardType="numeric"
                    onChangeText={(texto) => setCedula(texto)} />


                <TextInput
                    style={styles.inputContenedor}
                    placeholder="Edad"
                    value={edad}
                    keyboardType="numeric"
                    onChangeText={(texto) => setEdad(texto)}
                />
                <TextInput
                    style={styles.inputContenedor}
                    placeholder="Teléfono"
                    value={telefono}
                    keyboardType="phone-pad"
                    onChangeText={(texto) => setTelefono(texto)}
                />
                <TextInput
                    style={styles.inputContenedor}
                    value={correo}
                    placeholder="Correo electrónico"
                    keyboardType="email-address"
                    onChangeText={(texto) => setCorreo(texto)}
                />
                <TextInput
                    style={styles.inputContenedor}
                    placeholder="Contraseña"
                    value={contrasena}
                    onChangeText={(texto) => setContrasena(texto)}
                />
                <TextInput
                    style={styles.inputContenedor}
                    placeholder="Especialidad"
                    value={especialidad}
                    onChangeText={(texto) => setEspecialidad(texto)} />

                <TouchableOpacity style={styles.Boton} onPress={() => registrarDoctor()}>
                    <View style={styles.btn}>
                        <Text style={styles.btnText}>Registrarse</Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.ContainerL}>
                    <Text style={styles.TextL} onPress={() => navigation.navigate('Login doctor')}>
                        ¿Ya tienes cuenta? Inicia sesión
                    </Text>
                </View>
            </View>
     
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
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
        fontSize: 16,
        fontWeight: '600',
        color: '#4CAEA9',
        textAlign: 'center',
        marginBottom: 24,
    },
    image: {
        width: 30,
        height: 30,
        alignSelf: 'center',
        marginBottom: 24,
        borderRadius: 100,
    },
    inputContenedor: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: '#B6E2DD',
        paddingHorizontal: 5,
        paddingVertical: 12,
        marginBottom: 16,
        fontSize: 12,
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