import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { supabase } from '../../supabase/ConfigSupa'
import { ref, update } from 'firebase/database'
import { db } from '../../firebase/ConfigFire'
import { Picker } from '@react-native-picker/picker'
import * as ImagePicker from 'expo-image-picker';

export default function EditarCitaPacienteScreen() {
    const [idCita, setidCita] = useState("")
    const [nombreApellidoPaciente, setnombreApellidoPaciente] = useState("")
    const [cedula, setcedula] = useState("")
    const [edad, setedad] = useState("")
    const [correo, setcorreo] = useState("")
    const [telefono, settelefono] = useState("")
    const [tipoSangre, settipoSangre] = useState("")
    const [direccion, setdireccion] = useState("")
    const [especialidad_id, setespecialidadRequerida] = useState("")
    const [motivo, setmotivo] = useState("")
    const [doctor_id, setdoctor_id] = useState("")
    const [estado, setestado] = useState("")
    const [fecha, setfecha] = useState("")
    const [ubicacionCita, setubicacionCita] = useState("")
    const [image, setImage] = useState<string | null>(null);

    // Nuevos campos para precios y facturación
    const [precioBase, setPrecioBase] = useState("")
    const [iva, setIva] = useState("")
    const [porcentajeEmpresa, setPorcentajeEmpresa] = useState("")
    const [totalFinal, setTotalFinal] = useState("")
    const [reciboUrl, setReciboUrl] = useState("")

    // Calificaciones
    const [calificacionPaciente, setCalificacionPaciente] = useState("")
    const [calificacionDoctor, setCalificacionDoctor] = useState("")

    const [citaCargada, setCitaCargada] = useState(false)

    // Puedes controlar aquí el rol para mostrar u ocultar campos o controles
    // Por simplicidad, supongamos que esta pantalla la usa el paciente y solo puede editar calificacionPaciente y estado
    // Si necesitas lógica distinta, deberías añadir control de roles y permisos}


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
        const nombreArchivo = `recibo_${Date.now()}.png`; // nombre para recibos

        const { data, error } = await supabase
            .storage
            .from('recibos') // aquí bucket 'recibos'
            .upload(`public/${nombreArchivo}`, {
                uri: image,
                cacheControl: '3600',
                upsert: false,
                name: nombreArchivo,
            } as any, {
                contentType: "image/png"
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


    async function manejarSubidaYGuardar() {
        let urlReciboFinal = reciboUrl;

        if (image) {
            const urlSubida = await subirImagenStorage();
            if (!urlSubida) return; // si falla la subida, para todo
            urlReciboFinal = urlSubida;
        }

        // Llamamos a editarConsulta con la url del recibo actualizada
        await editarConsulta(urlReciboFinal);
    }


    async function buscarCita() {
        if (idCita.trim() === "") {
            Alert.alert("Error", "Por favor ingresa el ID de la cita para buscarla");
            return;
        }
        try {
            const { data, error } = await supabase
                .from('citaMedica')
                .select('*')
                .eq('id', idCita)
                .single();

            if (error || !data) {
                limpiarCampos();
                Alert.alert("No encontrado", "No existe cita con ese ID");
                setCitaCargada(false);
                return;
            }

            // Carga de datos incluyendo los nuevos campos
            setespecialidadRequerida(data.especialidad_id || "");
            setnombreApellidoPaciente(data.nombreApellidoPaciente || "");
            setcedula(data.cedula || "");
            setedad(data.edad || "");
            setcorreo(data.correoElectronico || "");
            settelefono(data.telefono || "");
            settipoSangre(data.tipoSangre || "");
            setdireccion(data.direccion || "");
            setmotivo(data.motivo || "");
            setdoctor_id(data.doctor_id || "");
            setestado(data.estado || "");
            setfecha(data.fecha || "");
            setubicacionCita(data.ubicacionCita || "");

            // Nuevos campos
            setPrecioBase(data.precioBase?.toString() || "");
            setIva(data.iva?.toString() || "");
            setPorcentajeEmpresa(data.porcentajeEmpresa?.toString() || "");
            setTotalFinal(data.totalFinal?.toString() || "");
            setReciboUrl(data.reciboUrl || "");

            setCalificacionPaciente(data.calificacionPaciente?.toString() || "");
            setCalificacionDoctor(data.calificacionDoctor?.toString() || "");

            setCitaCargada(true);
        } catch (error) {
            console.error(error);
            limpiarCampos();
            Alert.alert("Error", "Error al buscar la cita");
            setCitaCargada(false);
        }
    }

    async function editarConsulta(urlRecibo: string) {
        if (idCita.trim() === "") {
            limpiarCampos();
            Alert.alert("Incompleto", "Debe poner la id de la consulta");
            return;
        }
        if (!citaCargada) {
            limpiarCampos();
            Alert.alert("Error", "Primero debe cargar una cita válida usando el ID");
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
            especialidad_id,
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
            const { error } = await supabase
                .from('citaMedica')
                .update(datosCita)
                .eq('id', idCita);

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


    //Calcualr porcentajes
    function calcularTotal() {
        const base = parseFloat(precioBase) || 0;

        const ivaCalculado = base * 0.12;
        const totalSinEmpresa = base + ivaCalculado;
        const gananciaEmpresa = totalSinEmpresa * 0.05;
        const total = totalSinEmpresa + gananciaEmpresa;

        setIva(ivaCalculado.toFixed(2));
        setPorcentajeEmpresa(gananciaEmpresa.toFixed(2));
        setTotalFinal(total.toFixed(2));
    }

    useEffect(() => {
        calcularTotal();
    }, [precioBase]);





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
        setdoctor_id("")
        setestado("")
        setfecha("")
        setubicacionCita("")
        setPrecioBase("")
        setIva("")
        setPorcentajeEmpresa("")
        setTotalFinal("")
        setReciboUrl("")
        setCalificacionPaciente("")
        setCalificacionDoctor("")
        setCitaCargada(false)
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.titulo}>Editar Cita Médica</Text>
                <Text style={styles.subtitulo}>Ingrese el ID de la cita para buscarla y editarla</Text>

                <Text style={styles.label}>ID de la cita médica</Text>
                <TextInput
                    style={styles.input}
                    placeholder="ID de la cita médica"
                    value={idCita}
                    onChangeText={setidCita}
                />
                <TouchableOpacity style={styles.boton} onPress={buscarCita}>
                    <View style={styles.btn}>
                        <Text style={styles.btnText}>Buscar cita</Text>
                    </View>
                </TouchableOpacity>

                {/* Datos paciente (solo lectura) */}
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

                {/* Motivo editable? Aquí lo pones editable o no según negocio */}
                <Text style={styles.label}>Motivo de la cita</Text>
                <TextInput
                    style={styles.input}
                    value={motivo}
                    onChangeText={setmotivo}
                />

                {/* Estado editable */}
                <Text style={styles.label}>Estado de la cita</Text>
                <Picker
                    selectedValue={estado}
                    onValueChange={setestado}
                    style={styles.picker}
                >
                    <Picker.Item label="PENDIENTE" value="PENDIENTE" />
                    <Picker.Item label="ACEPTADO" value="ACEPTADO" />
                    <Picker.Item label="CANCELADO" value="CANCELADO" />
                    <Picker.Item label="TERMINADO" value="TERMINADO" />
                </Picker>

                {/* Fecha cita */}
                <Text style={styles.label}>Fecha de la cita</Text>
                <TextInput style={styles.input} value={fecha} editable={false} />

                {/* Ubicación */}
                <Text style={styles.label}>Ubicación</Text>
                <TextInput style={styles.input} value={ubicacionCita} editable={false} />

                {/* Precios */}
                <Text style={styles.label}>Precio base</Text>
                <TextInput
                    style={styles.input}
                    value={precioBase}
                    onChangeText={setPrecioBase}
                    keyboardType="decimal-pad"
                />
                <Text style={styles.label}>IVA (12%)</Text>
                <TextInput
                    style={styles.input}
                    value={iva}
                    editable={false}
                />


                <Text style={styles.label}>Ganancia empresa (5%)</Text>
                <TextInput
                    style={styles.input}
                    value={porcentajeEmpresa}
                    editable={false}
                />
                
                <Text style={styles.label}>Total final</Text>
                <TextInput
                    style={styles.input}
                    value={totalFinal}
                    onChangeText={setTotalFinal}
                    keyboardType="decimal-pad"
                />


                {/* URL del recibo */}
                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.btnSmall} onPress={pickImage}>
                        <Text style={styles.btnText}>Seleccionar imagen</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnSmall} onPress={pickImageFromCamera}>
                        <Text style={styles.btnText}>Tomar foto</Text>
                    </TouchableOpacity>


                    {image && <Image source={{ uri: image }} style={styles.image} />}

                </View>




                {/* Calificaciones */}
                <Text style={styles.label}>Calificación del paciente</Text>
                <Picker
                    selectedValue={calificacionPaciente}
                    onValueChange={setCalificacionPaciente}
                    style={styles.picker}
                >
                    <Picker.Item label="Seleccione una calificación" value="" />
                    {[1, 2, 3, 4, 5].map((v) => (
                        <Picker.Item key={v} label={v.toString()} value={v.toString()} />
                    ))}
                </Picker>

                <TouchableOpacity style={styles.boton} onPress={manejarSubidaYGuardar}>
                    <View style={styles.btn}>
                        <Text style={styles.btnText}>Actualizar cita médica</Text>
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
    picker: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: '#B6E2DD',
        marginBottom: 16,
        color: '#333',
        textAlign: 'center',
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
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#2B7A78',
        marginBottom: 6,
        marginLeft: 6,
    },
    btnSmall: {
        flex: 1,
        backgroundColor: '#3AAFA9',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        width: "90%"
    },
    buttonRow: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 10,
        marginBottom: 16,
        alignItems: "center"
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: "cover",
        marginVertical: 20,
    },

})
