import { Pressable, View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

// 一番外側もViewで囲うことで、外側からもカスタムスタイルを設定できる。
// コンポーネント系は一番外側をViewで囲んでおいた方が無難

function Button({children, onPress, mode, style}) {
    return (
        <View style={style}>
            <Pressable 
                onPress={onPress}
                style={({pressed}) => pressed && styles.pressed}
            >
                <View style={[styles.button, mode === 'flat' && styles.flat]}>
                    <Text style={[styles.buttonText, mode === 'flat' && styles.flatText]}>{children}</Text>
                </View>
            </Pressable>
        </View>
    )
}

export default Button;

const styles = StyleSheet.create({
    button: {
        borderRadius: 4,
        padding: 8,
        backgroundColor: GlobalStyles.colors.primary500,
    },
    flat: {
        backgroundColor: 'transparent',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    flatText: {
        color: GlobalStyles.colors.primary500,
    },
    pressed: {
        opacity: 0.75,
        olor: GlobalStyles.colors.primary100,
        borderRadius: 4
    }
});