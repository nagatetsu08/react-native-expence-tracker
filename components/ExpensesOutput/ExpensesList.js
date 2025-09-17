
import { View, Text, StyleSheet, FlatList } from "react-native";
import ExpenseItem from "./ExpenseItem";

// 引数の段階で分割代入しておく
function renderExpenseItem({item}) {
    return <ExpenseItem {...item} />;
}

function ExpensesList ({expenses}) {
    return (
        <FlatList
            data={expenses}
            renderItem={renderExpenseItem}      // 内部で勝手にdataを分解して渡してくれる
            keyExtractor={(item) => item.id}    // こいつは内部で分割代入された状態で渡ってくる。
        />
    )
}

export default ExpensesList;