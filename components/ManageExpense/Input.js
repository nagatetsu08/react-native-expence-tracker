import { View, Text, StyleSheet, TextInput } from "react-native";
import { GlobalStyles } from "../../constants/styles";

// TextInputのオプションはいつ、どれくらい追加になってもいいように最初からオブジェクトを受け付ける形式にしておき、
// スプレッド構文で展開できるようにしておくのがテクニック。

function Input({label, textInputConfig, style, invalid}) {

    const inputStyles = [styles.input]

    // react-nativeはconstで定義しても配列には新たに要素追加したり、上書きできる（dartと違うところ）
    if(textInputConfig && textInputConfig.multiline) {
        inputStyles.push(styles.inputMultiLine);
    }

    if(invalid) {
        inputStyles.push(styles.invalidInput);
    }

    return <View style={[styles.inputContainer, style]}>
        <Text style={[styles.label, invalid && styles.invalidLabel]}>{label}</Text>
        <TextInput style={inputStyles} {...textInputConfig} />
    </View>
}

export default Input;

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 8,
    },
    label: {
        fontSize: 14,
        color: GlobalStyles.colors.primary100,
        marginBottom: 4
    },
    input: {
        backgroundColor: GlobalStyles.colors.primary100,
        padding: 6,
        borderRadius: 6,
        fontSize: 18,
        color: GlobalStyles.colors.primary700,
    },
    inputMultiLine: {
        minHeight: 100,
        textAlignVertical: 'top'
    },
    invalidLabel: {
        color: GlobalStyles.colors.error500
    },
    invalidInput: {
        backgroundColor: GlobalStyles.colors.error50
    }
});