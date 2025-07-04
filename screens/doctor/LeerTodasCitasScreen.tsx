import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabase/ConfigSupa';

export default function LeerTodasCitasScreen() {
    const [citas, setCitas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCitas();
    }, []);

    const fetchCitas = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('citas').select('*');
        setLoading(false);
    };

    const renderItem = ({ item }: any) => (
        <View style={styles.item}>
            <Text style={styles.titulo}>{item.titulo || 'Sin título'}</Text>
            <Text>Paciente: {item.paciente_id || 'N/A'}</Text>
            <Text>Fecha: {item.fecha || 'N/A'}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Todas las Citas</Text>
            {loading ? (
                <Text>Cargando...</Text>
            ) : (
                <FlatList
                    data={citas}
                    renderItem={renderItem}
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
    header: {
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
    },
    titulo: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#2B7A78',
        marginBottom: 6,
    },
    detalle: {
        fontSize: 14,
        color: '#555',
        marginBottom: 4,
    },
    listContent: {
        paddingBottom: 40,
    }
    

})