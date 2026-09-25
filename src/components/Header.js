import { StyleSheet, Text, View } from 'react-native'

export default function Header() {
    return (
        <View style={styles.header}>
            <Text style={styles.titulo}>Nível de Bolha</Text>
            <Text style={styles.subtitulo}>App com Acelerômetro • React Native Expo</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#111827',
    },
    subtitulo: {
        fontSize: 12,
        color: '#6B7280',
    },
});