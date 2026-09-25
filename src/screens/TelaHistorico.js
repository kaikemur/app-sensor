import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

export default function TelaHistorico({ historico, onLimpar }) {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.card}>
                <View style={styles.cabecalho}>
                    <Text style={styles.titulo}>Medições Registradas</Text>
                    {historico.length > 0 && (
                        <TouchableOpacity onPress={onLimpar}>
                            <Text style={styles.linkLimpar}>Limpar</Text>
                        </TouchableOpacity>
                    )}
                </View>

                {historico.length === 0 ? (
                    <Text style={styles.textoVazio}>
                        Nenhuma medição salva ainda. Vá para o Medidor e toque em "Salvar Medição".
                    </Text>
                ) : (
                    historico.map((item, index) => (
                        <View key={item.id} style={styles.item}>
                            <View>
                                <Text style={styles.horario}>#{index + 1} • {item.horario}</Text>
                                <Text style={styles.detalhes}>
                                    X: {item.x}g | Y: {item.y}g | Z: {item.z}g
                                </Text>
                            </View>
                            <View style={[styles.tagMini, item.nivelado ? styles.tagVerde : styles.tagAmarela]}>
                                <Text style={[styles.tagMiniTexto, item.nivelado ? styles.tagTextoVerde : styles.tagTextoAmarela]}>
                                    {item.nivelado ? 'Nivelado' : 'Inclinado'}
                                </Text>
                            </View>
                        </View>
                    ))
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 8,
        padding: 16,
    },
    cabecalho: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    titulo: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#111827',
    },
    linkLimpar: {
        color: '#DC2626',
        fontSize: 13,
        fontWeight: 'bold',
    },
    textoVazio: {
        fontSize: 13,
        color: '#9CA3AF',
        fontStyle: 'italic',
        paddingVertical: 12,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    horario: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#111827',
    },
    detalhes: {
        fontSize: 12,
        color: '#6B7280',
        marginTop: 2,
    },
    tagMini: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    tagVerde: {
        backgroundColor:'#DCFCE7',
    },
    tagAmarela:{
         backgroundColor:'#FEF3C7',
     },
     tagMiniTexto:{
         fontSize :11,
         fontWeight:'bold'
     },
     tagTextoVerde:{
            color:'#15803D'
     },
     tagTextoAmarelo:{
         color:'#B45309'
     },
 });