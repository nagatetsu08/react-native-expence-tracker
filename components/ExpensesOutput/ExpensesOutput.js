import { View, StyleSheet, } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constants/styles";

const  DUMMY_EXPENSES = [
    {
        id: 'e1',
        description: 'A pair of shoes',
        amount: 59.99,
        date: new Date('2025-09-16')
    },
    {
        id: 'e2',
        description: 'A game',
        amount: 90.87,
        date: new Date('2025-09-12')
    },
    {
        id: 'e3',
        description: 'A snack',
        amount: 5.30,
        date: new Date('2025-09-12')
    },
    {
        id: 'e4',
        description: 'A book',
        amount: 25.30,
        date: new Date('2025-09-11')
    },
    {
        id: 'e5',
        description: 'A comic book',
        amount: 8.14,
        date: new Date('2025-09-11')
    },
    {
        id: 'e6',
        description: 'A pair of shoes',
        amount: 59.99,
        date: new Date('2025-09-16')
    },
    {
        id: 'e7',
        description: 'A game',
        amount: 90.87,
        date: new Date('2025-09-12')
    },
    {
        id: 'e8',
        description: 'A snack',
        amount: 5.30,
        date: new Date('2025-09-12')
    },
    {
        id: 'e9',
        description: 'A book',
        amount: 25.30,
        date: new Date('2025-09-11')
    },
    {
        id: 'e20',
        description: 'A comic book',
        amount: 8.14,
        date: new Date('2025-09-11')
    },
];

function ExpensesOutput ({expenses, expensesPeriod}) {
    return (
        <View style={styles.container}>
            <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
            <ExpensesList expenses={expenses} />
        </View>
    )
}

export default ExpensesOutput;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        backgroundColor: GlobalStyles.colors.primary700,
    }
});