import { createContext, useReducer } from "react";

export const ExpnsesContext = createContext({
    // State変数とアクションを定義
    expenses: [],
    // {description, amount, date}は1つのオブジェクトとして受け取るので、{}で囲っている
    addExpense: ({description, amount, date}) => {},
    deleteExpeense: (id) => {},
    updateExpense: (id, {description, amount, date}) => {},
});

// どんなキーワードでアクションが呼ばれるかを定義
function expensesReducer(state, action) {
    switch(action.type) {
        case 'ADD':
            const id = new Date().toString() + Math.random().toString();
            //　新パラメータを展開して先頭に突っ込んで、さらに旧Stateも展開して後方に追加
            return [{...action.payload, id: id}, ...state, ];
        case 'UPDATE':
            // 1.更新対象のidをもつオブジェクトのindexを算出する。
            // 2.1のindexに紐づくオブジェクトを取得。
            // 3.2のオブジェクトを展開して。そこに第二引数でpayloadのデータを上書きでぶちこんでやる。
            // 4.そのままstateへの上書きはできないので、新規変数に現在のstateをコピーする。。
            // 5.4の変数に3のデータを上書きしてやる。対象は1で算出したindex
            const updateItemIndex = state.findeIndex((expense) => expense.id == action.payload.id);
            const updatebaleExpense = state[updateItemIndex];
            const updatedItem = {...updatebaleExpense, ...action.payload.data};
            const updatedExpenses = [...state];
            // 配列そのものを再定義はできないが、以下のようにindexやkey指定で中身を変更することはできる。（dartでは無理）
            updatedExpenses[updateItemIndex] = updatedItem;
            return updatedExpenses;
        case 'DELETE':
            // 引数はidしか渡してないからaction.payloadで取得できる
            return state.filter((expense) => expense.id !== action.payload)
        default: 
            return state;
    }
}

function ExpnsesContextProvider({children}) {

    // expensesStateの名前は勝手に決めていい
    const [expensesState, dispatch] = useReducer(expensesReducer, []);

    function addExpense(expsenseData) {
        // 第一引数の名称はreducerのaction.〜の部分（名称は勝手に決めていい）
        dispatch({ type: 'ADD', payload: expsenseData});
    }

    function deleteExpense(id) {
        dispatch({ type: 'DELETE', payload: id});
    }

    function updateExpense(id, expsenseData) {
        dispatch({ type: 'UPDATE', payload: {id: id, data: expsenseData}});
    }

    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense
    };

    return <ExpnsesContext.Provider value={value}>
        {children}
    </ExpnsesContext.Provider>
}

export default ExpnsesContextProvider;