import { View, Text, StyleSheet } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext } from "react";
// 注意点として、useContextを使ってState変数を使うだけならContextの方をimportする（Providerではない）
import { ExpnsesContext } from "../store/expense-context";


function AllExpenses() {
  const expensesCtx = useContext(ExpnsesContext);

  return (
      <ExpensesOutput
       //文字列はオブジェクト形式の渡し方でもただの文字列でもどっちでもいい
        expensesPeriod={"Total"}
        expenses={expensesCtx.expenses}
      />
  );
}

export default AllExpenses;
