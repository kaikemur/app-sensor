import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Accelerometer } from 'expo-sensors';

export default function TelaMedidor({ onSalvar }) {
  const [{ x, y, z }, setDados] = useState({ x: 0, y: 0, z: 0 });
  const [sensorAtivo, setSensorAtivo] = useState(true);
  const [disponivel, setDisponivel] = useState(true);

  useEffect(() => {
    // 1. Checa disponibilidade no hardware
    Accelerometer.isAvailableAsync().then((suportado) => {
      setDisponivel(suportado);
    });

    // 2. Frequência de 100ms (10 leituras por segundo)
    Accelerometer.setUpdateInterval(100);

    let assinatura = null;

    // 3. Registra listener
    if (sensorAtivo) {
      assinatura = Accelerometer.addListener((leitura) => {
        setDados(leitura);
      });
    }

    // 4. Limpeza de memória/bateria ao desmontar ou pausar
    return () => {
      if (assinatura) {
        assinatura.remove();
      }
    };
  }, [sensorAtivo]);

  // Superfície nivelada quando |x| < 0.05 e |y| < 0.05
  const estaNivelado = Math.abs(x) < 0.05 && Math.abs(y) < 0.05;

  // Deslocamento da bolha no centro do mostrador
  const bolhaX = Math.min(Math.max(x * 120, -80), 80);
  const bolhaY = Math.min(Math.max(-y * 120, -80), 80);

  const lidarSalvar = () => {
    const nova = {
      id: Date.now().toString(),
      horario: new Date().toLocaleTimeString('pt-BR'),
      x: x.toFixed(2),
      y: y.toFixed(2),
      z: z.toFixed(2),
      nivelado: estaNivelado,
    };
    onSalvar(nova);
    alert('Medição registrada no histórico!');
  };

  if (!disponivel) {
    return (
      <View style={styles.tela}>
        <View style={styles.avisoErro}>
          <Text style={styles.avisoErroTexto}>
            Acelerômetro não disponível neste aparelho ou emulador.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.tela}>
      {/* Mostrador Físico Circular Flat */}
      <View style={[styles.circuloNivel, estaNivelado && styles.circuloNivelado]}>
        <View style={styles.linhaCruzH} />
        <View style={styles.linhaCruzV} />
        <View style={styles.anelCentral} />
        <View
          style={[
            styles.bolha,
            { transform: [{ translateX: bolhaX }, { translateY: bolhaY }] },
            estaNivelado ? styles.bolhaNivelada : styles.bolhaInclinada,
          ]}
        />
      </View>

      {/* Status de Alinhamento */}
      <View style={[styles.tagStatus, estaNivelado ? styles.tagVerde : styles.tagAmarela]}>
        <Text style={[styles.tagStatusTexto, estaNivelado ? styles.tagTextoVerde : styles.tagTextoAmarela]}>
          {estaNivelado ? 'NIVELADO (0°)' : 'SUPERFÍCIE INCLINADA'}
        </Text>
      </View>

      {/* Tabela dos Eixos X, Y e Z */}
      <View style={styles.tabelaValores}>
        <View style={styles.colunaValor}>
          <Text style={styles.rotuloEixo}>Eixo X</Text>
          <Text style={styles.valorEixo}>{x.toFixed(2)} g</Text>
        </View>
        <View style={styles.separadorColuna} />
        <View style={styles.colunaValor}>
          <Text style={styles.rotuloEixo}>Eixo Y</Text>
          <Text style={styles.valorEixo}>{y.toFixed(2)} g</Text>
        </View>
        <View style={styles.separadorColuna} />
        <View style={styles.colunaValor}>
          <Text style={styles.rotuloEixo}>Eixo Z</Text>
          <Text style={styles.valorEixo}>{z.toFixed(2)} g</Text>
        </View>
      </View>

      {/* Botões de Ação */}
      <View style={styles.linhaBotoes}>
        <TouchableOpacity
          style={[styles.botaoAcao, sensorAtivo ? styles.botaoPausar : styles.botaoRetomar]}
          onPress={() => setSensorAtivo(!sensorAtivo)}
          activeOpacity={0.8}
        >
          <Text style={styles.botaoAcaoTexto}>
            {sensorAtivo ? 'Pausar' : 'Retomar'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botaoAcao, styles.botaoSalvar]}
          onPress={lidarSalvar}
          activeOpacity={0.8}
        >
          <Text style={styles.botaoAcaoTexto}>Salvar Medição</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  circuloNivel: {
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 2,
    borderColor: '#9CA3AF',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 16,
  },
  circuloNivelado: {
    borderColor: '#16A34A',
  },
  linhaCruzH: {
    position: 'absolute',
    width: '100%',
    height: 1,
    backgroundColor: '#D1D5DB',
  },
  linhaCruzV: {
    position: 'absolute',
    height: '100%',
    width: 1,
    backgroundColor: '#D1D5DB',
    },
  areaCentral: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  bolha: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  bolhaNivelada: {
    backgroundColor: '#059669',
  },
  bolhaInclinada: {
    backgroundColor: '#D97706',
  },
  tagStatus: {