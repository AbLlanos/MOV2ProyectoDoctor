import { Alert, Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { supabase } from '../../supabase/ConfigSupa'
import { ref, update } from 'firebase/database'
import { db } from '../../firebase/ConfigFire'
import { Picker } from '@react-native-picker/picker'
import * as ImagePicker from 'expo-image-picker';
import * as Haptics from 'expo-haptics';

export default function EditarCitaPacienteScreen() {
    const [doctorId, setDoctorId] = useState<string | null>(null);

    // Campos de la cita
    const [idCita, setIdCita] = useState('');
    const [nombreApellidoPaciente, setNombreApellidoPaciente] = useState('');
    const [cedula, setCedula] = useState('');
    const [edad, setEdad] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [tipoSangre, setTipoSangre] = useState('');
    const [direccion, setDireccion] = useState('');
    const [especialidadId, setEspecialidadId] = useState('');
    const [motivo, setMotivo] = useState('');
    const [doctor_id, setDoctor_id] = useState('');
    const [estado, setEstado] = useState('');
    const [fecha, setFecha] = useState('');
    const [ubicacionCita, setUbicacionCita] = useState('');
    const [precioBase, setPrecioBase] = useState('');
    const [iva, setIva] = useState('');
    const [porcentajeEmpresa, setPorcentajeEmpresa] = useState('');
    const [totalFinal, setTotalFinal] = useState('');
    const [reciboUrl, setReciboUrl] = useState('');
    const [calificacionPaciente, setCalificacionPaciente] = useState('');
    const [calificacionDoctor, setCalificacionDoctor] = useState('');
    const [citaCargada, setCitaCargada] = useState(false);
    const [image, setImage] = useState<string | null>(null);

    // Cargar doctor autenticado (como en el ejemplo)
    useEffect(() => {
        const cargarDoctor = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();
            if (!user) {
                setDoctorId(null);
                return;
            }

            const { data, error } = await supabase
                .from('doctor')
                .select('id')
                .eq('correo', user.email)
                .maybeSingle();

            if (!error && data) {
                setDoctorId(data.id);
            } else {
                setDoctorId(null);
            }
        };

        cargarDoctor();
    }, []);

    // Selección de imagen similar
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const pickImageFromCamera = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    // Subir imagen a supabase storage (con manejo de errores)
    async function subirImagenStorage(): Promise<string | null> {
        if (!image) return null;
        const nombreArchivo = `recibo_${Date.now()}.png`;

        const { data, error } = await supabase.storage
            .from('recibos')
            .upload(`public/${nombreArchivo}`, {
                uri: image,
                cacheControl: '3600',
                upsert: false,
                name: nombreArchivo,
            } as any, {
                contentType: 'image/png',
            });

        if (error) {
            Alert.alert('Error al subir imagen', error.message);
            return null;
        }

        const { data: urlData } = supabase.storage
            .from('recibos')
            .getPublicUrl(`public/${nombreArchivo}`);

        return urlData.publicUrl;
    }

    // Buscar cita por ID
    async function buscarCita() {
        const idTrim = idCita.trim();

        if (!idTrim) {
            await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            Alert.alert('Error', 'Por favor ingresa el ID de la cita para buscarla');
            return;
        }

        if (!doctorId) {
            await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            Alert.alert('Error', 'No se pudo verificar el doctor autenticado.');
            return;
        }

        try {
            const { data, error } = await supabase
                .from('citaMedica')
                .select('*')
                .eq('id', idTrim)
                .single();

            if (error || !data) {
                limpiarCampos();
                Alert.alert('No encontrado', 'No existe cita con ese ID');
                setCitaCargada(false);
                return;
            }

            if (data.doctor_id !== doctorId) {
                limpiarCampos();
                Alert.alert('Acceso denegado', 'No puedes editar citas que no te pertenecen.');
                setCitaCargada(false);
                return;
            }

            // Cargar datos al estado
            setEspecialidadId(data.especialidad_id || '');
            setNombreApellidoPaciente(data.nombreApellidoPaciente || '');
            setCedula(data.cedula || '');
            setEdad(data.edad || '');
            setCorreo(data.correoElectronico || '');
            setTelefono(data.telefono || '');
            setTipoSangre(data.tipoSangre || '');
            setDireccion(data.direccion || '');
            setMotivo(data.motivo || '');
            setDoctor_id(data.doctor_id || '');
            setEstado(data.estado || '');
            setFecha(data.fecha || '');
            setUbicacionCita(data.ubicacionCita || '');
            setPrecioBase(data.precioBase?.toString() || '');
            setIva(data.iva?.toString() || '');
            setPorcentajeEmpresa(data.porcentajeEmpresa?.toString() || '');
            setTotalFinal(data.totalFinal?.toString() || '');
            setReciboUrl(data.reciboUrl || '');
            setCalificacionPaciente(data.calificacionPaciente?.toString() || '');
            setCalificacionDoctor(data.calificacionDoctor?.toString() || '');

            setCitaCargada(true);
        } catch (error) {
            console.error(error);
            limpiarCampos();
            Alert.alert('Error', 'Error al buscar la cita');
            setCitaCargada(false);
        }
    }

    // Limpieza de campos
    function limpiarCampos() {
        setIdCita('');
        setNombreApellidoPaciente('');
        setCedula('');
        setEdad('');
        setCorreo('');
        setTelefono('');
        setTipoSangre('');
        setDireccion('');
        setEspecialidadId('');
        setMotivo('');
        setDoctor_id('');
        setEstado('');
        setFecha('');
        setUbicacionCita('');
        setPrecioBase('');
        setIva('');
        setPorcentajeEmpresa('');
        setTotalFinal('');
        setReciboUrl('');
        setCalificacionPaciente('');
        setCalificacionDoctor('');
        setCitaCargada(false);
        setImage(null);
    }

    // Calcular total automáticamente
    useEffect(() => {
        const base = parseFloat(precioBase) || 0;
        const ivaCalc = base * 0.12;
        const empresa = (base + ivaCalc) * 0.05;
        const total = base + ivaCalc + empresa;

        setIva(ivaCalc.toFixed(2));
        setPorcentajeEmpresa(empresa.toFixed(2));
        setTotalFinal(total.toFixed(2));
    }, [precioBase]);

    // Guardar cambios y subir imagen
    async function manejarSubidaYGuardar() {
        if (!citaCargada) {
            await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            Alert.alert('Error', 'Primero debe buscar y cargar una cita válida.');
            return;
        }

        if (motivo.trim() === '') {
            await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            Alert.alert('Error', 'El motivo de la cita no puede estar vacío.');
            return;
        }

        if (estado === 'ACEPTADO') {
            const baseAceptado = parseFloat(precioBase);
            if (isNaN(baseAceptado) || baseAceptado <= 0) {
                await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
                Alert.alert('Error', 'Debe ingresar un precio válido antes de aceptar la cita.');
                return;
            }
        }

        if (!['PENDIENTE', 'ACEPTADO', 'CANCELADO', 'TERMINADO'].includes(estado)) {
            await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            Alert.alert('Error', 'Debe seleccionar un estado válido.');
            return;
        }

        if (estado === 'TERMINADO') {
            if (!image) {
                await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
                Alert.alert('Error', 'Para cerrar la cita como TERMINADA debe subir una imagen del recibo.');
                return;
            }
            if (!calificacionPaciente || parseInt(calificacionPaciente) < 1 || parseInt(calificacionPaciente) > 5) {
                await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
                Alert.alert('Error', 'Debe calificar al paciente (entre 1 y 5) antes de marcar como TERMINADA.');
                return;
            }
        } else {
            setCalificacionPaciente('');
        }

        const base = parseFloat(precioBase);
        if (isNaN(base) || base <= 0) {
            await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            Alert.alert('Error', 'Debe ingresar un precio base válido (mayor que 0).');
            return;
        }

        if (
            calificacionDoctor &&
            (isNaN(parseInt(calificacionDoctor)) || parseInt(calificacionDoctor) < 1 || parseInt(calificacionDoctor) > 5)
        ) {
            await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            Alert.alert('Error', 'La calificación del doctor debe ser entre 1 y 5.');
            return;
        }

        let urlReciboFinal = reciboUrl;
        if (image) {
            const urlSubida = await subirImagenStorage();
            if (!urlSubida) {
                await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
                Alert.alert('Error', 'No se pudo subir la imagen del recibo.');
                return;
            }
            urlReciboFinal = urlSubida;
        }

        await editarConsulta(urlReciboFinal);
    }

    async function editarConsulta(urlRecibo: string) {
        if (idCita.trim() === '') {
            limpiarCampos();
            Alert.alert('Incompleto', 'Debe poner la id de la consulta');
            return;
        }
        if (!citaCargada) {
            limpiarCampos();
            Alert.alert('Error', 'Primero debe cargar una cita válida usando el ID');
            return;
        }

        const datosCita = {
            nombreApellidoPaciente,
            cedula,
            edad,
            correoElectronico: correo,
            telefono,
            tipoSangre,
            direccion,
            especialidad_id: especialidadId,
            motivo,
            doctor_id,
            estado,
            fecha,
            ubicacionCita,
            precioBase: parseFloat(precioBase) || 0,
            iva: parseFloat(iva) || 0,
            porcentajeEmpresa: parseFloat(porcentajeEmpresa) || 0,
            totalFinal: parseFloat(totalFinal) || 0,
            reciboUrl: urlRecibo,
            calificacionPaciente: parseInt(calificacionPaciente) || null,
            calificacionDoctor: parseInt(calificacionDoctor) || null,
        };

        try {
            const { error } = await supabase.from('citaMedica').update(datosCita).eq('id', idCita);

            if (error) {
                Alert.alert('Error en Supabase', error.message);
                return;
            }

            const citaRef = ref(db, `citas_medicas/${idCita}`);
            await update(citaRef, {
                ...datosCita,
                id: idCita,
            });

            limpiarCampos();
            Alert.alert('Éxito', 'La cita se actualizó correctamente en ambas bases.');
        } catch (err) {
            console.error(err);
            Alert.alert('Error', 'Ocurrió un problema al actualizar la cita.');
        }
    }

    return (
        <ImageBackground
            source={{ uri: 'https://i.pinimg.com/1200x/c0/71/8f/c0718ffc0129e0f7fb16a42bf618d34a.jpg' }}
            style={styles.background}
            resizeMode="cover"
        >
            <ScrollView contentContainerStyle={styles.scroll}>
                <View style={styles.card}>
                    <Text style={styles.titulo}>Editar Cita Médica</Text>

                    <Text style={styles.label}>ID de la cita médica</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="ID de la cita médica"
                        value={idCita}
                        onChangeText={setIdCita}
                        keyboardType="numeric"
                    />
                    <TouchableOpacity style={styles.boton} onPress={buscarCita}>
                        <Text style={styles.btnText}>Buscar cita</Text>
                    </TouchableOpacity>

                    {/* Campos no editables */}
                    <Text style={styles.label}>Nombre del paciente</Text>
                    <TextInput style={styles.input} value={nombreApellidoPaciente} editable={false} />

                    <Text style={styles.label}>Cédula</Text>
                    <TextInput style={styles.input} value={cedula} editable={false} />

                    <Text style={styles.label}>Edad</Text>
                    <TextInput style={styles.input} value={edad} editable={false} keyboardType="numeric" />

                    <Text style={styles.label}>Correo electrónico</Text>
                    <TextInput style={styles.input} value={correo} editable={false} keyboardType="email-address" />

                    <Text style={styles.label}>Teléfono</Text>
                    <TextInput style={styles.input} value={telefono} editable={false} keyboardType="phone-pad" />

                    <Text style={styles.label}>Tipo de sangre</Text>
                    <TextInput style={styles.input} value={tipoSangre} editable={false} />

                    <Text style={styles.label}>Dirección</Text>
                    <TextInput style={styles.input} value={direccion} editable={false} />

                    <Text style={styles.label}>Motivo de la cita</Text>
                    <TextInput style={styles.input} value={motivo} onChangeText={setMotivo} />

                    <Text style={styles.label}>Estado de la cita</Text>
                    <Picker selectedValue={estado} onValueChange={setEstado} style={styles.picker}>
                        <Picker.Item label="PENDIENTE" value="PENDIENTE" />
                        <Picker.Item label="ACEPTADO" value="ACEPTADO" />
                        <Picker.Item label="CANCELADO" value="CANCELADO" />
                        <Picker.Item label="TERMINADO" value="TERMINADO" />
                    </Picker>

                    <Text style={styles.label}>Fecha de la cita</Text>
                    <TextInput style={styles.input} value={fecha} editable={false} />

                    <Text style={styles.label}>Ubicación</Text>
                    <TextInput style={styles.input} value={ubicacionCita} editable={false} />

                    <Text style={styles.label}>Precio base</Text>
                    <TextInput
                        style={styles.input}
                        value={precioBase}
                        onChangeText={setPrecioBase}
                        keyboardType="decimal-pad"
                    />

                    <Text style={styles.label}>IVA (12%)</Text>
                    <TextInput style={styles.input} value={iva} editable={false} />

                    <Text style={styles.label}>Ganancia empresa (5%)</Text>
                    <TextInput style={styles.input} value={porcentajeEmpresa} editable={false} />

                    <Text style={styles.label}>Total final</Text>
                    <TextInput
                        style={styles.input}
                        value={totalFinal}
                        onChangeText={setTotalFinal}
                        keyboardType="decimal-pad"
                    />

                    <Text style={styles.label}>Recuerde tomar una foto al recibo</Text>

                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.btnSmall} onPress={pickImage}>
                            <Text style={styles.btnText}>Elegir una  imagen</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btnSmall} onPress={pickImageFromCamera}>
                            <Text style={styles.btnText}>Tomar foto</Text>
                        </TouchableOpacity>
                    </View>

                    {image && <Image source={{ uri: image }} style={styles.image} />}

                    <Text style={styles.label}>Calificación del paciente</Text>
                    <Picker
                        selectedValue={calificacionPaciente}
                        onValueChange={setCalificacionPaciente}
                        style={styles.picker}
                        enabled={estado === 'TERMINADO'}
                    >
                        <Picker.Item label="Seleccione una calificación" value="" />
                        {[1, 2, 3, 4, 5].map((v) => (
                            <Picker.Item key={v} label={v.toString()} value={v.toString()} />
                        ))}
                    </Picker>

                    <TouchableOpacity style={styles.boton} onPress={manejarSubidaYGuardar}>
                        <Text style={styles.btnText}>Actualizar cita médica</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </ImageBackground>
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
    card: {
        backgroundColor: 'rgba(255,255,255,0.95)',
        padding: 20,
        borderRadius: 14,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.18,
        shadowRadius: 4,
        elevation: 5,
    },
    titulo: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2B7A78',
        textAlign: 'center',
        marginBottom: 16,
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 6,
        color: '#2B7A78',
        fontSize: 16,
        textAlign: 'left',
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: '#B6E2DD',
        paddingHorizontal: 14,
        paddingVertical: 12,
        marginBottom: 14,
        fontSize: 16,
        color: '#333',
    },
    picker: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        marginBottom: 14,
    },
    boton: {
        backgroundColor: '#3AAFA9',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent:"center",
        marginBottom: 20,
    },
    btnText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf:"center"
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 14,
    },
    btnSmall: {
        backgroundColor: '#3AAFA9',
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 10,
        flex: 1,
        marginHorizontal: 5,
        alignItems: 'center',
        justifyContent:"center"
    },
    image: {
        width: '100%',
        height: 180,
        borderRadius: 10,
        marginBottom: 14,
    },
});