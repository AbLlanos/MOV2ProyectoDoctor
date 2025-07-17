import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
    Modal,
    TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabase/ConfigSupa';

type Cita = {
    id: string;
    nombreApellidoPaciente: string;
    cedula?: string;
    motivo?: string;
    estado?: string;
    fecha?: string;
    ubicacionCita?: string;
    calificacionPaciente?: string;
    precioBase?: number;
    iva?: number;
    porcentajeEmpresa?: number;
    totalFinal?: number;
    reciboUrl?: string;  // Recibo como URL o solo nombre de archivo
};

export default function ObservarCitasDoctorScreen() {
    const [citas, setCitas] = useState<Cita[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [citaSeleccionada, setCitaSeleccionada] = useState<Cita | null>(null);

    const obtenerCitas = async () => {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) {
            console.log('No hay usuario autenticado o hubo un error:', userError);
            setCitas([]);
            return;
        }

        const { data, error } = await supabase
            .from('citaMedica')
            .select('*')
            .eq('doctor_id', user.id);

        if (error) {
            console.error('Error al obtener citas:', error.message);
            setCitas([]);
            return;
        }

        setCitas(data ?? []);
    };

    useEffect(() => {
        obtenerCitas();
    }, []);

    const abrirModal = (cita: Cita) => {
        setCitaSeleccionada(cita);
        setModalVisible(true);
    };

    const cerrarModal = () => {
        setModalVisible(false);
        setCitaSeleccionada(null);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titlePrincipal}>Mis Citas</Text>

            <TouchableOpacity style={styles.botonRefrescar} onPress={obtenerCitas}>
                <Text style={styles.textoBoton}>Actualizar Lista</Text>
            </TouchableOpacity>

            {citas.length === 0 ? (
                <Text style={styles.noCitas}>No tienes citas registradas.</Text>
            ) : (
                <FlatList
                    data={citas}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => abrirModal(item)} style={styles.card}>
                            <Text style={styles.titulo}>ID: {item.id}</Text>
                            <Text style={styles.descripcion}>Paciente: {item.nombreApellidoPaciente}</Text>
                            <Text style={styles.descripcion}>Fecha: {item.fecha}</Text>
                            <Text style={styles.descripcionEstado}>Estado: {item.estado}</Text>
                        </TouchableOpacity>
                    )}
                />
            )}

            <Modal visible={modalVisible && citaSeleccionada !== null} transparent={true}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTexto}>Paciente: {citaSeleccionada?.nombreApellidoPaciente}</Text>
                        <Text style={styles.modalTexto}>Cédula: {citaSeleccionada?.cedula || 'No disponible'}</Text>
                        <Text style={styles.modalTexto}>Fecha: {citaSeleccionada?.fecha || 'No disponible'}</Text>
                        <Text style={styles.modalTexto}>Motivo: {citaSeleccionada?.motivo || 'No disponible'}</Text>
                        <Text style={styles.modalTexto}>Estado: {citaSeleccionada?.estado || 'No disponible'}</Text>
                        <Text style={styles.modalTexto}>Ubicación: {citaSeleccionada?.ubicacionCita || 'No disponible'}</Text>

                        <Text style={styles.modalTexto}>Precio Base: ${citaSeleccionada?.precioBase?.toFixed(2) || '0.00'}</Text>
                        <Text style={styles.modalTexto}>IVA: ${citaSeleccionada?.iva?.toFixed(2) || '0.00'}</Text>
                        <Text style={styles.modalTexto}>Porcentaje Empresa: {citaSeleccionada?.porcentajeEmpresa?.toFixed(2) || '0.00'}%</Text>
                        <Text style={styles.modalTexto}>Total Final: ${citaSeleccionada?.totalFinal?.toFixed(2) || '0.00'}</Text>

                        {citaSeleccionada?.reciboUrl ? (
                            <Image
                                source={{
                                    uri: `${citaSeleccionada.reciboUrl}`,
                                }}
                                style={styles.imagenModal}
                                resizeMode="contain"
                            />
                        ) : (
                            <Text style={styles.textoSinImagen}>Sin recibo adjunto</Text>
                        )}

                        <TouchableOpacity style={styles.botonCerrar} onPress={cerrarModal}>
                            <Text style={styles.textoCerrar}>Cerrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#DFF6F4',
    },
    titlePrincipal: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: '#2B7A78',
    },
    botonRefrescar: {
        backgroundColor: '#2B7A78',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'center',
    },
    textoBoton: {
        color: 'white',
        fontWeight: '600',
    },
    noCitas: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#555',
    },
    card: {
        backgroundColor: '#FFF',
        padding: 12,
        marginBottom: 10,
        borderRadius: 8,
        borderLeftWidth: 5,
        borderLeftColor: '#2B7A78',
    },
    titulo: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 4,
        color: '#20504F',
    },
    descripcion: {
        fontSize: 14,
        color: '#333',
    },
    descripcionEstado: {
        fontSize: 14,
        color: '#333',
        backgroundColor: "#9bcaa7",
        borderRadius: 20,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        padding: 16,
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
    },
    imagenModal: {
        width: '100%',
        height: 200,
        marginBottom: 12,
        borderRadius: 8,
    },
    textoSinImagen: {
        color: 'gray',
        textAlign: 'center',
        marginBottom: 12,
    },
    modalTexto: {
        fontSize: 16,
        marginBottom: 6,
        color: '#17252A',
    },
    botonCerrar: {
        marginTop: 20,
        backgroundColor: '#2B7A78',
        padding: 10,
        borderRadius: 8,
    },
    textoCerrar: {
        color: 'white',
        textAlign: 'center',
        fontWeight: '600',
    },
});
