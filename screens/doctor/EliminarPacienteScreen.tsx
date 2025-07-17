import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { supabase } from '../../supabase/ConfigSupa';
import { ref, remove } from 'firebase/database';
import { db } from '../../firebase/ConfigFire';

export default function EliminarCitaScreen() {
    const [idCita, setIdCita] = useState('');

    const eliminarCita = async () => {
        if (!idCita.trim()) {
            Alert.alert('Campo requerido', 'Por favor ingresa el ID de la cita a eliminar');
            return;
        }

        Alert.alert(
            'Confirmar eliminación',
            `¿Estás seguro de que deseas eliminar la cita con ID ${idCita}?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            // Eliminar en Supabase
                            const { error: supaError } = await supabase
                                .from('citaMedica')
                                .delete()
                                .eq('id', idCita);

                            Alert.alert('Cita eliminada correctamente', "Recuerde tener en cuetna que no se peude recueprar");

                            if (supaError) {
                                Alert.alert('Error al eliminar en Supabase', supaError.message);
                                return;
                            }


                            await remove(ref(db, `citas_medicas/${idCita}`));

                            Alert.alert('Cita eliminada correctamente', "Recuerde tener en cuetna que no se peude recueprar");
                            console.log('Eliminación completada');

                        } catch (err) {
                            console.error('Error eliminando cita:', err);
                        }
                    },
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
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
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DFF6F4',
        padding: 24,
    },
    titulo: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2B7A78',
        textAlign: 'center',
        marginBottom: 20,
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 6,
        color: '#2B7A78',
        fontSize: 16,
        marginTop: 10,
        textAlign: "center",
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
