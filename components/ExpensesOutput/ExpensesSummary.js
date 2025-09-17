
import { View, Text, StyleSheet} from "react-native";
import { GlobalStyles } from "../../constants/styles";


function ExpensesSummary ({expenses, periodName }) {

    // javascript標準メソッド。配列を全集約して1つの値をを作る。
    // ちなみにmapは配列の各要素に何らか計算を加えて、新しい配列を作る（単一値ではない）
    // 合計血や最大、最小値を弾き出すのに使われる。
    // 第二引数の値は初期値。sumが一発目のときや経費がないときはnullなのでこけてしまわないように
    const expensesSummary = expenses.reduce((sum, expense) => {
        return sum + expense.amount
    }, 0);
    
    return (
        <View style={styles.container}>
            <Text style={styles.period}>{periodName}</Text>
            {/* 以下の$はお金の$のこと.
                 toFixedは少数第何位までを表すか
            */}
            <Text style={styles.sum}>${expensesSummary.toFixed(2)}</Text>
        </View>
    )
}

export default ExpensesSummary;

const styles = StyleSheet.create({
    container: {
        padding: 8,
        backgroundColor: GlobalStyles.colors.primary50,
        borderRadius: 6,
        flexDirection: 'row',               //periodとsumが横並びになるように
        justifyContent: 'space-between', 
        alignItems: 'center',
    },
    period: {
        fontSize: 12,
        color: GlobalStyles.colors.primary400
    },
    sum: {
        fontSize: 16,
        fontWeight: 'bold',
        color: GlobalStyles.colors.primary500
    }
});