import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabase/ConfigSupa';

export default function EliminarPacienteScreen() {
    const [pacientes, setPacientes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPacientes();
    }, []);

    const fetchPacientes = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('pacientes').select('*');
        setLoading(false);
    };

    const eliminarPaciente = async (id: number) => {
        Alert.alert(
            'Confirmar eliminación',
            '¿Estás seguro de que deseas eliminar este paciente?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: async () => {
                        const { error } = await supabase.from('pacientes').delete().eq('id', id);
                        if (!error) {
                            setPacientes(pacientes.filter((p: any) => p.id !== id));
                            Alert.alert('Paciente eliminado');
                        } else {
                            Alert.alert('Error al eliminar');
                        }
                    },
                },
            ]
        );
    };

    const renderItem = ({ item }: any) => (
        <View style={styles.item}>
            <Text>{item.nombre}</Text>
            <TouchableOpacity
                style={styles.botonEliminar}
                onPress={() => eliminarPaciente(item.id)}
            >
                <Text style={styles.textoEliminar}>Eliminar</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Eliminar Paciente</Text>
            {loading ? (
                <Text>Cargando...</Text>
            ) : (
                <FlatList
                    data={pacientes}
                    renderItem={renderItem}
                    ListEmptyComponent={<Text>No hay pacientes para mostrar.</Text>}
                />
            )}
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
    loading: {
        fontSize: 16,
        textAlign: 'center',
        color: '#4CAEA9',
    },
    item: {
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 12,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderLeftWidth: 5,
        borderLeftColor: '#3AAFA9',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textoPaciente: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#2B7A78',
    },
    botonEliminar: {
        backgroundColor: '#3AAFA9',
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 8,
    },
    textoEliminar: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    listContent: {
        paddingBottom: 40,
    },
});
