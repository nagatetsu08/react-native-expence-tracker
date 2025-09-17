import { View, StyleSheet, Pressable, Text} from "react-native";

// ReactNavigationを画面ではなくコンポーネントで使うにはhooksを使う。
// ReactNavigationを通常使えるのはApp.jsで登録された画面でしか使えない
import { useNavigation } from "@react-navigation/native"

import { GlobalStyles } from "../../constants/styles";
import { getFormatdate } from "../../util/data";

function ExpenseItem({id, description, date, amount}) {

    const navigation = useNavigation();

    function expensePressHandler() {
        navigation.navigate('ManageExpense', {
            expenseId: id
        });
    }

    return (
        <Pressable 
            onPress={expensePressHandler}
            style={({pressed}) => pressed && styles.pressed}
        >
            <View style={styles.expenseItem}>
                {/* 
                // flexDirectionは「そのViewの直下の子要素をどの方向に並べるか」を決定する。
                // 従って、直下のViewには効くが、1個目のView直下のTextには効かない。1個目のView直下のTextに効かせたいのであれば、
                // 1個目のViewに対して、 flexDirectionを設定しないといけないというのがReactNativeのルール。
                //
                // ※ ReactNativeの位置スタイルは基本直下の要素にしか効かない。（直下の孫要素には効かない）
                //.  だから、1個目のView直下のTextは縦に並ぶ。
                // 
                */}
                <View> 
                    <Text style={[styles.textBase, styles.description]}>{description}</Text> 
                    <Text style={styles.textBase}>{getFormatdate(date)}</Text>
                </View>
                <View style={styles.amountContainer}>
                    <Text style={styles.amount}>{amount.toFixed(2)}</Text>
                </View>
            </View>

        </Pressable>
    )
}

export default ExpenseItem;

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.75,
    },
    expenseItem: {
        padding: 12,
        marginVertical: 8,
        backgroundColor: GlobalStyles.colors.primary500,
        // flexDirectionは「そのViewの直下の子要素をどの方向に並べるか」を決定する。
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 6,
        elevation: 3,
        shadowColor: GlobalStyles.colors.gray500,
        shadowRadius: 4,
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.4
    },
    textBase: {
        color: GlobalStyles.colors.primary50
    },
    description: {
        fontSize: 16,
        marginBottom: 4,
        fontWeight: 'bold',
    },
    amountContainer: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        minWidth: 80,
    },
    amount: {
        color: GlobalStyles.colors.primary500,
        fontWeight: 'bold',
    }
});