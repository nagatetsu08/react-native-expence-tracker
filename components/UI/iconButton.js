import { View, Text, StyleSheet, Pressable} from "react-native";
import { Ionicons } from '@expo/vector-icons'

// 外部から好きなアイコン文字列や表示文字やスタイルを渡して表示できるようにコンポーネント化した

function IconButton({icon, size, color, onPress}) {
    // ボタンが押されたのを検知して、pressedがtrueのときだけスタイルを適用する
    // style={({pressed}) で分割代入を使ってpressedの状態をとっている
    return <Pressable onPress={onPress} style={({pressed}) => pressed && styles.pressed}>
        <View style={styles.buttonContainer}>
            <Ionicons
                name={icon}
                size={size}
                color={color}
            />
        </View>
    </Pressable>
}

export default IconButton;

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 24,
        paddin: 6,
        margin: 8,
    },
    pressed: {
        opacity: 0.75
    }
})