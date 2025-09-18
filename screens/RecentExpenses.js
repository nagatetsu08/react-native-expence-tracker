import { View, Text, StyleSheet } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";

// 注意点として、useContextを使ってState変数を使うだけならContextの方をimportする（Providerではない）
import { ExpnsesContext } from "../store/expense-context";
import { getDateMinusDate } from "../util/data";
import { useContext } from "react";

function RecentExpenses() {

  const expensesCtx = useContext(ExpnsesContext);
  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const get7DaysAgo = getDateMinusDate(today, 7);
    
    // 支出の中で7日前より後の日付のexpenseデータだけ返している。
    return expense.data > get7DaysAgo
  })

  return (
      <ExpensesOutput
        expensesPeriod="Last 7 Days"
        expenses={recentExpenses}
      />
  );
}

export default RecentExpenses;
