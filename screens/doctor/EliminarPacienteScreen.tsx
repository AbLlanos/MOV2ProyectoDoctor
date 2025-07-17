import React, { useEffect, useState } from 'react';
import {Alert,StyleSheet,Text,TextInput,TouchableOpacity,View,ImageBackground,ScrollView
} from 'react-native';
import { supabase } from '../../supabase/ConfigSupa';
import { ref, remove } from 'firebase/database';
import { db } from '../../firebase/ConfigFire';
import * as Haptics from 'expo-haptics';

export default function EliminarCitaScreen() {
    const [idCita, setIdCita] = useState('');
    const [doctorId, setDoctorId] = useState<string | null>(null);

    useEffect(() => {
        const cargarDoctor = async () => {
            const { data: { user } } = await supabase.auth.getUser();
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

    const eliminarCita = async () => {
        const idTrim = idCita.trim();

        if (!idTrim) {
            await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            Alert.alert('Campo requerido', 'Por favor ingresa el ID de la cita a eliminar');
            return;
        }

        if (!doctorId) {
            await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            Alert.alert('Error', 'No se pudo verificar el doctor autenticado.');
            return;
        }

        try {
            // Verificar que la cita existe y pertenece al doctor
            const { data: cita, error: citaError } = await supabase
                .from('citaMedica')
                .select('id, doctor_id')
                .eq('id', idTrim)
                .maybeSingle();

            if (citaError) {
                await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
                Alert.alert('Error', 'Hubo un problema al verificar la cita.');
                return;
            }

            if (!cita) {
                await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
                Alert.alert('No encontrado', 'No existe una cita con ese ID.');
                return;
            }

            if (cita.doctor_id !== doctorId) {
                await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
                Alert.alert('Acceso denegado', 'No tienes permiso para eliminar esta cita.');
                return;
            }

            Alert.alert(
                'Confirmar eliminación',
                `¿Estás seguro de que deseas eliminar la cita con ID ${idTrim}?`,
                [
                    { text: 'Cancelar', style: 'cancel' },
                    {
                        text: 'Eliminar',
                        style: 'destructive',
                        onPress: async () => {
                            await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);

                            try {

                                // Supabase
                                const { error: supaError } = await supabase
                                    .from('citaMedica')
                                    .delete()
                                    .eq('id', idTrim);

                                if (supaError) {
                                    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
                                    Alert.alert('Error', supaError.message);
                                    return;
                                }

                                //Firebase
                                await remove(ref(db, `citas_medicas/${idTrim}`));

                                await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                                Alert.alert('Cita eliminada', 'La cita se eliminó correctamente.');
                                setIdCita('');
                            } catch (err) {
                                await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
                                Alert.alert('Error', 'Ocurrió un problema al eliminar la cita.');
                            }
                        },
                    },
                ]
            );
        } catch (err) {
            await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            Alert.alert('Error', 'No se pudo completar la operación.');
        }
    };

    return (
        <ImageBackground
            source={{ uri: 'https://i.pinimg.com/736x/72/66/93/726693cf83094cf1cb60e2a107880531.jpg' }}
            style={styles.background}
            resizeMode="cover"
        >
            <ScrollView contentContainerStyle={styles.scroll}>
                <View style={styles.card}>
                    <Text style={styles.titulo}>Eliminar Cita Médica</Text>

                    <Text style={styles.label}>ID de la Cita</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ingrese el ID de la cita"
                        value={idCita}
                        onChangeText={setIdCita}
                        keyboardType="numeric"
                    />

                    <TouchableOpacity style={styles.botonEliminar} onPress={eliminarCita}>
                        <Text style={styles.textoEliminar}>Eliminar Cita</Text>
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
        backgroundColor: 'rgba(255,255,255,0.92)',
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
        textAlign: 'center',
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: '#B6E2DD',
        paddingHorizontal: 14,
        paddingVertical: 12,
        marginBottom: 20,
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    botonEliminar: {
        backgroundColor: '#3AAFA9',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
    },
    textoEliminar: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
