import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function TabBar({ abaAtual, onSelecionarAba }) {
  const abas = [
    { id: 'inicio', rotulo: 'Início' },
    { id: 'nivel', rotulo: 'Medidor' },
    { id: 'historico', rotulo: 'Histórico' },
    { id: 'sobre', rotulo: 'Sobre' },
  ];

  return (
    <View style={styles.barraAbas}>
      {abas.map((aba) => {
        const ativa = abaAtual === aba.id;
        return (
          <TouchableOpacity
            key={aba.id}
            style={[styles.abaItem, ativa && styles.abaAtiva]}
            onPress={() => onSelecionarAba(aba.id)}
            activeOpacity={0.7}
          >
            <Text style={[styles.abaTexto, ativa && styles.abaTextoAtivo]}>
              {aba.rotulo}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  barraAbas: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  abaItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: '6',
    borderRadius: 6,
  },
  abaAtiva: {
    backgroundColor: '#EFF6FF',
  },
  abaTexto: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '600',
  },
  abaTextoAtivo: {
    color: '#2563EB',
    fontWeight: 'bold',
  },
});