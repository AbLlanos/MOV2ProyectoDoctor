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
    container: { flex: 1, padding: 20 },
    header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
    item: {
        padding: 15,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
    },
    titulo: { fontWeight: 'bold', fontSize: 16 },
});