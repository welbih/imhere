import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, FlatList, ScrollView, Alert } from 'react-native';

import { Participant } from '../../components/Participant';

import { styles } from './styles';

export function Home() {
  const [participants, setParticipants] = useState<string[]>([]);
  const [participantName, setParticipantName] = useState('');  

  const options = { weekday:"long", year:"numeric", month:"short", day: 'numeric'};
  const dataDeHoje = new Date().toDateString;

  function handleParticipantAdd() {
    if(!participantName) {
      return Alert.alert("Nome vazio", "Você deve informar o nome do participante antes de adicionar.");
    }
    if(participants.includes(participantName)) {
      return Alert.alert("Participante existe", "Já existge um participante na lista do evento");
    }
    
    setParticipants(prevState => [...prevState, participantName]);
    setParticipantName('');
  }

  function handleParticipantRemove(name: string) {

    Alert.alert("Remover", `Remover o participante ${name}?`, [
      {
        text: 'Sim',
        onPress: () => setParticipants(prevState => prevState.filter(participant => participant !== name))
      },
      {
        text: 'Não',
        style: 'cancel'
      }
    ])
  }

  return (
    <View style={styles.container}>
      <Text key="1" style={styles.eventName}>
        Evento XPTO
      </Text>
      <Text key="2" style={styles.eventDate}>
        { new Date().toLocaleDateString('pt-BR', { weekday:"long", year:"numeric", month:"short", day: 'numeric'}) }
      </Text>

      <View style={styles.form}>
        <TextInput 
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6B6B6B"
          onChangeText={setParticipantName}
          value={participantName}
          />

        <TouchableOpacity  style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>
            +
          </Text>          
        </TouchableOpacity>
      </View>

      <FlatList
        data={participants}
        keyExtractor={item => item}
        renderItem={({ item }) => (
            <Participant 
            key={item}
            name={item} 
            onRemove={() => handleParticipantRemove(item)} 
            />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Ninguém chegou no evento ainda? Adicione participantes a sua lista de presença.
          </Text>
        )}
      /> 

      {/* <ScrollView showsVerticalScrollIndicator={false}>
        {
          participants.map(participant => (
            <Participant 
            key={participant}
            name={participant} 
            onRemove={() => handleParticipantRemove(participant)} 
            />
          ))
        }      
      </ScrollView> */}
    </View>
  )
}
