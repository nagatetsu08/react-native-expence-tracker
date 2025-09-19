import axios from 'axios'
import config from '../config/config'


export function storeExpense(expenseData) {
    axios.post(
        config.firebaseUrl + "expense.json",
        expenseData

    )
}