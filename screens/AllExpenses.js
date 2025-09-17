import { View, Text, StyleSheet } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";



function AllExpenses() {
  return (
      <ExpensesOutput
       //文字列はオブジェクト形式の渡し方でもただの文字列でもどっちでもいい
        expensesPeriod={"Total"}
      />
  );
}

export default AllExpenses;
