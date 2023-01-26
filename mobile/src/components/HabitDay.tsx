import { TouchableOpacity, Dimensions, TouchableOpacityProps } from 'react-native';

// Definindo quantos quadrados irão aparecer por linha
const WEEK_DAYS = 7;
// Definindo o tamanho disponivel na tela para exibir os quadrados
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5;
// Definindo o espaçamento entre os quadrados
export const DAY_MARGIN_BETWEEN = 8;
// Definindo o tamanho que cada quadrado vai ter
export const DAY_SIZE = (Dimensions.get('screen').width / WEEK_DAYS) - (SCREEN_HORIZONTAL_PADDING + 5);

interface Props extends TouchableOpacityProps {

};

export function HabitDay({ ...rest }: Props) {
    return (
        <TouchableOpacity
            className='bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800'
            style={{ width: DAY_SIZE, height: DAY_SIZE }}
            activeOpacity={0.7}
            {...rest}
        />
    );
};