import { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { BackButton } from "../components/BackButton";
import { Checkbox } from "../components/Checkbox";
import { Feather } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';

const avaiableWeekDays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

export function New() {
    const [weekDays, setWeekDays] = useState<number[]>([]);

    // Função para verificar quais checkbox estão marcados
    function handleToggleWeekDay(weekDayIndex: number) {
        if (weekDays.includes(weekDayIndex)) {
            setWeekDays(prevState => prevState.filter(weekDay => weekDay !== weekDayIndex));
        } else {
            setWeekDays(prevState => [...prevState, weekDayIndex]);
        }
    };

    return (
        <View className="flex-1 bg-background px-8 pt-16">
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
                <BackButton />

                <Text className="mt-6 text-white font-extrabold text-3xl">
                    Criar habito
                </Text>

                <Text className="mt-6 text-white font-semibold text-base">
                    Qual seu comprometimento?
                </Text>

                <TextInput className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-green-600"
                    placeholder='ex.: Exercícios, Dormir bem, etc...'
                    placeholderTextColor={colors.zinc[400]}
                />

                <Text className="font-semibold mt-4 mb-3 text-white text-base">
                    Qual a recorrência?
                </Text>

                {
                    avaiableWeekDays.map((weekDay, index) => (
                        <Checkbox key={weekDay} title={weekDay} onPress={() => handleToggleWeekDay(index)} checked={weekDays.includes(index)} />
                    ))
                }

                <TouchableOpacity activeOpacity={0.7} className="wfull h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6">
                    <Feather
                        name='check'
                        size={20}
                        color={colors.white}
                    />
                    <Text className='font-semibold text-base text-white ml-2'>
                        Confirmar
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};