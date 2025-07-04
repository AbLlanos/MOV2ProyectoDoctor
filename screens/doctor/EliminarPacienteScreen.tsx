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
    container: { flex: 1, padding: 20 },
    titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    botonEliminar: {
        backgroundColor: '#e74c3c',
        padding: 10,
        borderRadius: 5,
    },
    textoEliminar: {
        color: '#fff',
        fontWeight: 'bold',
    },
});