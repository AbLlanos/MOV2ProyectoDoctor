import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabase/ConfigSupa';

type Cita = {
    id: string;
    nombreApellidoPaciente: string;
    cedula: string;
    fecha: string;
    motivo: string;
    estado: string;
    ubicacionCita: string;
};

export default function ObservarCitasDoctorScreen() {
    const [citas, setCitas] = useState<Cita[]>([]);

    useEffect(() => {
        const obtenerCitas = async () => {
            const { data: { user }, error: userError } = await supabase.auth.getUser();
            if (userError || !user) {
                console.log('No hay usuario autenticado o hubo un error:', userError);
                return;
            }

            console.log('Usuario autenticado:', user);

            const { data, error } = await supabase
                .from('citaMedica')
                .select('*')
                .eq('nombreApellidoDoctor', user.id);

            if (error) {
                console.error('Error al obtener citas:', error.message);
                setCitas([]);
                return;
            }

            setCitas(data ?? []);
        };

        obtenerCitas();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.titlePrincipal}>Mis Citas</Text>

            {citas.length === 0 ? (
                <Text style={styles.noCitas}>No tienes citas registradas.</Text>
            ) : (
                <FlatList
                    data={citas}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Text style={styles.titulo}>ID de la cita medica: {item.id}</Text>
                            <Text style={styles.descripcion}>Paciente: {item.nombreApellidoPaciente}</Text>
                            <Text style={styles.descripcion}>Cédula: {item.cedula}</Text>
                            <Text style={styles.descripcion}>Fecha: {item.fecha}</Text>
                            <Text style={styles.descripcion}>Motivo: {item.motivo || 'No disponible'}</Text>
                            <Text style={styles.descripcion}>Estado: {item.estado || 'No disponible'}</Text>
                            <Text style={styles.descripcion}>Ubicación: {item.ubicacionCita || 'No disponible'}</Text>
                        </View>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        backgroundColor: '#DFF6F4',
    },
    titlePrincipal: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 12,
        textAlign: 'center',
        color: '#2B7A78',
    },
    noCitas: {
        textAlign: 'center',
        fontSize: 18,
        marginTop: 40,
        color: '#666',
    },
    card: {
        backgroundColor: '#ffffff',
        padding: 18,
        marginBottom: 15,
        borderRadius: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    titulo: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    descripcion: {
        fontSize: 15,
        color: '#333',
        marginBottom: 3,
    },
});