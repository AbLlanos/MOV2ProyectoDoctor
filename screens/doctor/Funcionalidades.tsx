import { Image, ImageBackground, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

export default function Funcionalidades() {
    return (
        <ScrollView >
            <ImageBackground
                source={{ uri: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhF8AX9XTTmkJqdtN26exOamma6DrtPKqovj1IEkZwfrqNBIFcT3boTIzAzX9wGwGEmQUkFlZK5JRfjj1vP0bTs2UgMHa2l6vqwLqutKfAz9YcPDxeUoHvavrt9pwnqTREzGjRDG4KiSDI/w296-h640/medical-wallpaper-hd-4.png' }}
                style={styles.backgroundImage}
                resizeMode="cover"
                blurRadius={3}
            >
                <View />
                <Text style={styles.header}>Bienvenido a MedicPlus</Text>
                <View style={styles.missionVisionContainer}>
                    <TouchableOpacity activeOpacity={0.8} style={styles.card}>
                        <Image
                            source={{
                                uri: 'https://images.unsplash.com/photo-1588776814546-ec7e1b3c7b1b?auto=format&fit=crop&w=800&q=80',
                            }}
                            style={styles.topImage}
                        />
                        <View style={styles.textContent}>
                            <Text style={styles.cardTitle}>Misión</Text>
                            <Text style={styles.cardText}>
                                Brindar atención médica de calidad, humana y profesional a cada paciente.
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} style={styles.card}>
                        <Image
                            source={{
                                uri: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd2e?auto=format&fit=crop&w=800&q=80',
                            }}
                            style={styles.topImage}
                        />
                        <View style={styles.textContent}>
                            <Text style={styles.cardTitle}>Visión</Text>
                            <Text style={styles.cardText}>
                                Ser referente en innovación y excelencia en servicios de salud.
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <Text style={styles.sectionTitle}>Funcionalidades</Text>

                <View style={styles.missionVisionContainer}>
                    <TouchableOpacity activeOpacity={0.8} style={styles.card}>
                        <Image
                            source={{ uri: 'https://images.unsplash.com/photo-1512070679279-8988d32161be?auto=format&fit=crop&w=800&q=80' }}
                            style={styles.topImage}
                        />
                        <View style={styles.textContent}>
                            <Text style={styles.cardTitle}>Editar Citas</Text>
                            <Text style={styles.cardText}>
                                Modifica fecha, hora o motivo de las citas médicas fácilmente.
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} style={styles.card}>
                        <Image
                            source={{ uri: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80' }}
                            style={styles.topImage}
                        />
                        <View style={styles.textContent}>
                            <Text style={styles.cardTitle}>Eliminar Citas</Text>
                            <Text style={styles.cardText}>
                                Cancela citas innecesarias o duplicadas de manera segura.
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.missionVisionContainer}>
                    <TouchableOpacity activeOpacity={0.8} style={styles.card}>
                        <Image
                            source={{ uri: 'https://images.unsplash.com/photo-1519821172141-b5d8b1f6a2c7?auto=format&fit=crop&w=800&q=80' }}
                            style={styles.topImage}
                        />
                        <View style={styles.textContent}>
                            <Text style={styles.cardTitle}>Historial Médico</Text>
                            <Text style={styles.cardText}>
                                Consulta el historial de citas y tratamientos de cada paciente.
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} style={styles.card}>
                        <Image
                            source={{ uri: 'https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=crop&w=800&q=80' }}
                            style={styles.topImage}
                        />
                        <View style={styles.textContent}>
                            <Text style={styles.cardTitle}>Confirmar Atenciones</Text>
                            <Text style={styles.cardText}>
                                Marca las citas como atendidas y lleva control de tus pacientes.
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F7FA',
    },
    backgroundImage: {
        flex: 1, 
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#274472',
        textAlign: 'center',
        marginBottom: 16,
        marginTop: 12,
        letterSpacing: 0.5,
        textShadowColor: '#E9ECEF',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
        zIndex: 1,
    },
    sectionTitle: {
        fontSize: 22,
        color: '#41729F',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
        marginTop: 8,
        letterSpacing: 0.5,
        zIndex: 1,
    },
    missionVisionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 18,
        width: '100%',
        marginBottom: 24,
        zIndex: 1,
    },
    card: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        padding: 14,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: "center",
        shadowColor: '#274472',
        shadowOpacity: 0.10,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        elevation: 4,
        borderWidth: 1,
        borderColor: '#E9ECEF',
        marginHorizontal: 5,
        minWidth: 140,
        maxWidth: 200,
    },
    topImage: {
        width: 110,
        height: 75,
        resizeMode: 'cover',
        borderRadius: 8,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#E9ECEF',
    },
    textContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start', 
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#274472',
        marginBottom: 4,
        textAlign: 'center',
    },
    cardText: {
        fontSize: 13,
        color: '#41729F',
        textAlign: 'justify',
        lineHeight: 18,
    },
})