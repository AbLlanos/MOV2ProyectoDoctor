import { Alert, Button, Dimensions, Image, ImageBackground, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase/ConfigSupa';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { auth, db as dbFirebase } from "../firebase/ConfigFire";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import MapView, { Marker } from 'react-native-maps';

export default function RegistroDoctorScreen({ navigation }: any) {
    const [nombre, setNombre] = useState('');
    const [cedula, setCedula] = useState('');
    const [edad, setEdad] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [especialidad_id, setEspecialidad] = useState('');
    const [imagen, setImagen] = useState("");
    const [image, setImage] = useState<string | null>(null);
    const [listaEspecialidades, setListaEspecialidades] = useState([]);

    const [direccion, setDireccion] = useState('');
    const [ubicacion, setUbicacion] = useState<{ latitude: number, longitude: number } | null>(null);
    const [modalVisible, setModalVisible] = useState(false);



    useEffect(() => {
        const obtenerEspecialidades = async () => {
            const { data, error } = await supabase.from('especialidad').select('*');
            if (error) {
                Alert.alert('Error al cargar especialidades', error.message);
            } else {
                setListaEspecialidades(data);
            }
        };
        obtenerEspecialidades();
    }, []);





    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'],
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const pickImageFromCamera = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ['images', 'videos'],
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
        });
        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };




    //SUBIR IMAAGEN
    async function subirImagenStorage(): Promise<string | null> {
        if (!image) return null;
        const nombreArchivo = `fotoperfil_${Date.now()}.png`;

        const { data, error } = await supabase
            .storage
            .from('doctorstatic')
            .upload(`public/${nombreArchivo}`, {
                uri: image,
                cacheControl: '3600',
                upsert: false,
                name: nombreArchivo,
            } as any, {
                contentType: "image/png"
            }
            )
        if (error) {
            Alert.alert('Error al subir imagen', error.message);
            return null;
        }

        const { data: urlData } = supabase.storage
            .from('doctorstatic')
            .getPublicUrl(`public/${nombreArchivo}`);

        return urlData.publicUrl;
    }





    async function registrarDoctor() {
        if (
            nombre.trim() === '' ||
            cedula.trim() === '' ||
            edad.trim() === '' ||
            telefono.trim() === '' ||
            correo.trim() === '' ||
            contrasena.trim() === '' ||
            especialidad_id.trim() === '' ||
            direccion.trim() === "" ||
            (!image && imagen.trim() === '')
        ) {
            Alert.alert('Campos requeridos', 'Por favor, complete todos los campos.');
            return;
        }




        //AUTH en SUPPA
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: correo,
            password: contrasena,
        });

        if (authError) {
            Alert.alert('Error de autenticación', authError.message);
            return;
        }

        const userId = authData.user?.id;
        if (!userId) {
            Alert.alert('Error', 'No se pudo obtener el ID del usuario');
            return;
        }



        //AUTH en FIRE
        try {
            await createUserWithEmailAndPassword(auth, correo, contrasena);
        } catch (firebaseError: any) {
            Alert.alert('Error en Firebase Auth', firebaseError.message);
            return;
        }

        let imagenFinal = imagen;

        if (image) {
            const urlSubida = await subirImagenStorage();
            if (!urlSubida) return;
            imagenFinal = urlSubida;
        }



        //Supabase 
        const { error: dbError } = await supabase.from('doctor').insert([{
            id: userId,
            nombreApellido: nombre,
            cedula,
            edad,
            telefono,
            correo,
            especialidad_id,
            imagen: imagenFinal,
            direccion: direccion,
        }]);


        if (dbError) {
            Alert.alert('Error al guardar en Supabase', dbError.message);
            return;
        }



        //Firerbase
        try {
            await set(ref(dbFirebase, `doctor/${userId}`), {
                id: userId,
                nombreApellido: nombre,
                cedula,
                edad,
                telefono,
                correo,
                especialidad_id,
                imagen: imagenFinal,
                direccion: direccion,
                creadoEn: new Date().toISOString()
            });
        } catch (error) {
            Alert.alert('Error al guardar en Firebase', (error as Error).message);
            return;
        }

        limpiarCampos();
        Alert.alert('Registro exitoso', 'Doctor registrado correctamente en ambas bases de datos.');
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
        setImagen('');
        setImage(null);
    }

    return (
        <ImageBackground
            source={{ uri: 'https://images.pexels.com/photos/3844581/pexels-photo-3844581.jpeg' }}
            style={styles.background}
            resizeMode="cover"
        >
            <ScrollView contentContainerStyle={styles.scroll}>
                <View style={styles.container}>
                    <Text style={styles.titulo}>MedicPlus</Text>
                    <Text style={styles.subtitulo}>Registro de Doctor</Text>

                    <TextInput style={styles.inputContenedor}
                        placeholder="Nombre completo"
                        value={nombre}
                        onChangeText={setNombre} />

                    <TextInput style={styles.inputContenedor}
                        placeholder="Cédula" value={cedula}
                        keyboardType="numeric" maxLength={10}
                        onChangeText={setCedula} />

                    <TextInput style={styles.inputContenedor}
                        placeholder="Edad" value={edad}
                        keyboardType="numeric"
                        onChangeText={setEdad} />

                    <TextInput style={styles.inputContenedor}
                        placeholder="Teléfono" value={telefono}
                        maxLength={10} keyboardType="phone-pad"
                        onChangeText={setTelefono} />

                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.btnSmall} onPress={pickImage}>
                            <Text style={styles.btnText}>Seleccionar imagen</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btnSmall} onPress={pickImageFromCamera}>
                            <Text style={styles.btnText}>Tomar foto</Text>
                        </TouchableOpacity>


                        {image && <Image source={{ uri: image }} style={styles.image} />}

                    </View>




                    <TextInput style={styles.inputContenedor}
                        placeholder="Correo electrónico"
                        value={correo}
                        keyboardType="email-address"
                        onChangeText={setCorreo} />

                    <TextInput style={styles.inputContenedor}
                        placeholder="Contraseña"
                        value={contrasena}
                        secureTextEntry
                        onChangeText={setContrasena} />

                    <View style={styles.pickerContainer}>
                        <Picker selectedValue={especialidad_id} onValueChange={setEspecialidad}>
                            <Picker.Item label="Seleccione una especialidad" value="" />
                            {listaEspecialidades.map((item: any) => (
                                <Picker.Item key={item.id} label={item.nombre_especialidad} value={item.id} />
                            ))}
                        </Picker>
                    </View>


                    <TextInput style={styles.inputContenedor}
                        placeholder="Dirección"
                        value={direccion}
                        onChangeText={(texto) => setDireccion(texto)} />

                    <TouchableOpacity style={styles.Boton} onPress={() => setModalVisible(true)}>
                        <View style={styles.btn}>
                            <Text style={styles.btnText}>Ubicar en el mapa</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.Boton} onPress={registrarDoctor}>
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

            </ScrollView>



            <Modal visible={modalVisible} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <MapView
                            style={styles.map}
                            initialRegion={{
                                latitude: -0.17825,
                                longitude: -78.55250,
                                latitudeDelta: 0.01,
                                longitudeDelta: 0.01,
                            }}
                            onPress={({ nativeEvent }) => {
                                const { latitude, longitude } = nativeEvent.coordinate;
                                const direccionFormateada = `${latitude.toFixed(5)},${longitude.toFixed(5)}`;
                                setDireccion(direccionFormateada);
                                setUbicacion({ latitude, longitude });
                                setModalVisible(false);
                            }}
                        >
                            {ubicacion && (
                                <Marker
                                    coordinate={ubicacion}
                                    title="Ubicación seleccionada"
                                />
                            )}
                        </MapView>

                        <TouchableOpacity
                            onPress={() => setModalVisible(false)}
                            style={styles.closeButton}
                        >
                            <Text style={styles.closeButtonText}>Cerrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>






        </ImageBackground >
    );
}


const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',

    },
    scroll: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
    },
    container: {
        backgroundColor: 'rgba(255,255,255,0.92)',
        padding: 16,
        borderRadius: 14,
        marginVertical: 30,
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
    inputContenedor: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: '#B6E2DD',
        paddingHorizontal: 10,
        paddingVertical: 12,
        marginBottom: 12,
        fontSize: 14,
        color: '#333',
    },
    pickerContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        borderWidth: 1.1,
        borderColor: '#B6E2DD',
        marginBottom: 16,
        overflow: 'hidden',
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
    image: {
        width: 200,
        height: 200,
        resizeMode: "cover",
        marginVertical: 20,
    },


    buttonRow: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 10,
        marginBottom: 16,
        alignItems: "center"
    },
    btnSmall: {
        flex: 1,
        backgroundColor: '#3AAFA9',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        width: "90%"
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '90%',
        height: '70%',
        backgroundColor: '#fff',
        borderRadius: 12,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    map: {
        padding: 20,
        width: '100%',
        height: '85%',
        borderRadius: 12,
    },
    closeButton: {
        width: '90%',
        paddingVertical: 12,
        backgroundColor: '#3AAFA9',
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },

});
