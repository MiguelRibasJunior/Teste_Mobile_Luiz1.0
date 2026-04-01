import ParallaxScrollView from '@/components/parallax-scroll-view';
import { Image } from 'expo-image';
import { useState } from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface Item {
  id: string;
  title: string;
  description: string;
  completed: boolean;  // Adicionado para funcionalidade de marcar
}

export default function HomeScreen() {
  const [items, setItems] = useState<Item[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const addItem = () => {
    if (!title.trim()) {
      Alert.alert('Aviso', 'Por favor, insira um título');
      return;
    }

    const newItem: Item = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      completed: false,
    };

    setItems([newItem, ...items]);
    setTitle('');
    setDescription('');
  };

  const toggleComplete = (id: string) => {
    setItems(items.map(item =>
      item.id === id 
        ? { ...item, completed: !item.completed }
        : item
    ));
  };

  const deleteItem = (id: string) => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir este item?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          onPress: () => {
            setItems(items.filter(item => item.id !== id));
          },
          style: 'destructive',
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: Item }) => (
    <View style={styles.itemCard}>
      <TouchableOpacity
        onPress={() => toggleComplete(item.id)}
        style={styles.checkButton}
        activeOpacity={0.7}
      >
        <Text style={styles.checkButtonText}>
          {item.completed ? '✓' : 'X'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => toggleComplete(item.id)}
        style={styles.itemContent}
        activeOpacity={0.7}
      >
        <Text style={[
          styles.itemTitle,
          item.completed && styles.completedText
        ]}>
          {item.title}
        </Text>
        {item.description ? (
          <Text style={[
            styles.itemDescription,
            item.completed && styles.completedText
          ]}>
            {item.description}
          </Text>
        ) : null}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => deleteItem(item.id)}
        style={styles.deleteButton}
        activeOpacity={0.7}
      >
        <Text style={styles.deleteText}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );

  const totalItens = items.length;
  const concluidos = items.filter(item => item.completed).length;

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#c4f1ff', dark: '#aee7f7' }}
      headerImage={
        <Image
          source={require('@/assets/images/RONALDETEKKKK.jpg')}
          style={styles.reactLogo}
        />
      }>

      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Bem vindo ao Site Inicial!</Text>
      </View>

      <View style={styles.sectionContainer}>

        {/* Formulário */}
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Minha Lista de Registros</Text>
        
          <TextInput
            style={styles.input}
            placeholder="Digite o título"
            placeholderTextColor="#999"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Digite a descrição (opcional)"
            placeholderTextColor="#999"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
          />
          <TouchableOpacity style={styles.addButton} onPress={addItem} activeOpacity={0.7}>
            <Text style={styles.addButtonText}>Adicionar</Text>
          </TouchableOpacity>
        </View>

        {/* Contador com estatísticas */}
        <Text style={styles.counterText}>Registros: {totalItens} | Realizadas: {concluidos}</Text>

        {/* Lista */}
        {items.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhum registro ainda. Adicione um acima!</Text>
          </View>
        ) : (
          <FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
            scrollEnabled={true}
          />
        )}
      </View>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    paddingVertical: 10,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000', // Texto preto visível
  },
  reactLogo: {
    width: '100%',
    height: 250,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  sectionContainer: {
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: '#fff', // Fundo branco para o conteúdo
    borderRadius: 12,
    padding: 16,
  },
  formContainer: {
    marginBottom: 20,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#000', // Texto preto
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  counterText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
  itemCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    backgroundColor: '#fff', // Fundo branco para cada item
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  itemContent: {
    flex: 1,
    marginRight: 12,
  },
  itemTitle: {
    fontSize: 16,
    color: '#000', // Texto preto
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  checkButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#007AFF',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkButtonText: {
    fontSize: 18,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#ff4444',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  deleteText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});