import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

export default function TelaInicio({ onNavegarMedidor }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.titulo}>Sobre a Atividade</Text>
        <Text style={styles.texto}>
          Este aplicativo foi desenvolvido para a atividade acadêmica "Do Sensor ao App" da disciplina de Mobile (4º Semestre
        </Text>
        <Text style={[styles.texto, { marginTop: 8 }]}>
          O sensor escolhido é o <Text style={styles.destaque}>Acelerômetro</Text>,
          responsável por medir a aceleração e inclinação do aparelho em 3 eixos (X, Y e Z).
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.titulo}>Como utilizar:</Text>
        <Text style={styles.texto}>1. Coloque o smartphone sobre a superfície que deseja verificar.</Text>
        <Text style={styles.texto}>2. Observe o movimento da bolha no centro do mostrador.</Text>
        <Text style={styles.texto}>3. Quando a bolha ficar centralizada e verde, a superfície está alinhada.</Text>
        <Text style={styles.texto}>4. Você pode pausar a leitura ou salvar medições no histórico.</Text>
      </View>

      <TouchableOpacity
        style={styles.botao}
        onPress={onNavegarMedidor}
        activeOpacity={0.8}
      >
        <Text style={styles.botaoTexto}>Ir para o Medidor</Text>
      </TouchableOpacity>
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
    marginBottom: 12,
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  texto: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },
  destaque: {
    fontWeight: 'bold',
    color: '#111827',
  },
  botao: {
    backgroundColor: '#2563EB',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 8,
  },
  botaoTexto: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
});