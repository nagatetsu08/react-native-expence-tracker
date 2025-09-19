import { View, Text, StyleSheet, Alert } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../UI/Button";
import { getFormatdate } from "../../util/data";
import { GlobalStyles } from "../../constants/styles";

function ExpenseForm({onCancel, submitButtonLabel, onSubmit, defaultValues}) {

    // 入力値自体を他の画面で引き回さないので、単独のuseStateでOK。
    // setAmountValueの保存先としてamountValueが紐づいた状態で返ってくる。
    // const [amountValue, setAmountValue] = useState('');

    // function amountChangeHandler(enteredText) {
    //     setAmountValue(enteredText);
    // }


    // 管理したいステート変数が複数ある場合のやり方
    // TextInputはString型を求めるので、数値をそのまま渡すのはNG。必ずString型に変換すること。
    // バリデーションもやる場合は、画面へのフィードバックも必要なので各パラメータ内もオブジェクトにする。
    const [inputs, setInputs] = useState({
        amount: { 
            value : defaultValues ? defaultValues.amount.toString() : '', 
            // isValid: defaultValues ? true : false,
            isValid: true
        },
        date: {
            value : defaultValues ? getFormatdate(defaultValues.date) : '',
            isValid: true
        },
        description: {
            value: defaultValues ? defaultValues.description : '',
            isValid: true
        }
    });

    function inputChangeHandler(inputIdentifier ,enteredValue) {
        // 変わってない他の変数はそのままで変えたいところだけ変えたいときは、
        // 以下のようにset関数の引数を関数形式でセットする。
        // [inputIdentifier]はjs構文のテクニックでダイナミックプロパティ（変数値をプロパティのキーとして設定）のやり方
        // これによって、inputのキーだけが異なって後は全部同じ場合の共通関数が出来上がる。
        setInputs((currentInputs) => {
            return {
                ...currentInputs,
                // submitHanderを実行するまでバリデーションをとっておきたいので無条件でtrueを渡す
                [inputIdentifier]: { value: enteredValue, isValid: true }
            }
        });
    }

    function submitHandler() {
        // 入力値集め
        const expenseData = {
            amount: +inputs.amount.value, //このプラスは文字列を数値に変換する役割を持つ
            date: new Date(inputs.date.value),
            description: inputs.description.value, 
        };

        // バリデーション

        // isNanは数値に変換してそれがnullかどうかを判定する。変換失敗はnullになる。これがfalseになる=nullでもないし変換にも成功した数値という扱い
        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0

        // Date変換に失敗しているとInvalid Dateが返ってくる。これをStringに変換して'Invalid Date'と比較すれば、正しい日付かどうかわかる
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date'

        const descriptionIsValid = expenseData.description.trim().length > 0;

        if(!amountIsValid || !dateIsValid || !descriptionIsValid) {
            // Alert.alert('Invalid input. Please check your input');
            setInputs((curInputs) => {
                return {
                    amount: { value: curInputs.amount.value, isValid: amountIsValid},
                    date: { value: curInputs.date.value, isValid: dateIsValid},
                    description: { value: curInputs.description.value, isValid: descriptionIsValid},
                }
            })
            return;
        }

        // 親画面から渡してきた関数定義はこのように引数名(引数)の形で使える。
        // PHPとかには関数を引数で渡すってあまりないので、慣れるのが難しい。。。
        onSubmit(expenseData);
    }

    const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid

    return <View style={styles.form}>
        <Text style={styles.title}>Your Expense</Text>
        <View style={styles.inputRow}>
            <Input
                label="Amount"
                textInputConfig={{
                    keyboardType: 'decimal-pad',
                    // 入力値（上で言うenteredValueはonChangeText経由で渡ってくるので、省略できる）
                    // それ以外は追加引数扱いになるので、以下のようにthisと一緒に値を渡す。
                    onChangeText: inputChangeHandler.bind(this, 'amount'),
                    value: inputs.amount.value
                }}
                // 隣り合う要素にだけ空きスペースを全部使うflex:1を指定したい。
                // Descriptionにまで設定するとレイアウトが崩れたから
                style={styles.rowInput}
                invalid={!inputs.amount.isValid}
            />
            <Input
                label="Date"
                textInputConfig={{
                    placeholder: 'YYYY-MM-DD',
                    maxLength: 10,
                    onChangeText: inputChangeHandler.bind(this, 'date'),
                    value: inputs.date.value
                }}
                // 隣り合う要素にだけ空きスペースを全部使うflex:1を指定したい。
                // Descriptionにまで設定するとレイアウトが崩れたから
                style={styles.rowInput}
                invalid={!inputs.date.isValid}
            />
        </View>
        <Input
            label="Description" 
            textInputConfig={{
                multiline: true,
                autoCorrect: false,         // 誤字もあえて修正しないようにする。
                autoCapitalize: 'none',     // どのような文書を打っても勝手に大文字変換したりしないようにする
                onChangeText: inputChangeHandler.bind(this, 'description'),
                value: inputs.description.value,
            }}
            invalid={!inputs.description.isValid}
        />
        {formIsInvalid && 
            (
                <Text style={styles.errorText}>Invalid Inputs</Text>
            )
        }
        {/* 以下のViewは横並びのスタイルを適用するためのView */}
        <View style={styles.buttons}>
            <Button mode='flat' onPress={onCancel} style={styles.button}>
                Cancel
            </Button>
            <Button onPress={submitHandler} style={styles.button}>
                {submitButtonLabel}
            </Button>
        </View>
    </View>
}

export default ExpenseForm;

const styles = StyleSheet.create({
    form: {
        marginTop: 80,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 24,
        textAlign: 'center',
    },
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    rowInput: {
        flex: 1,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8
    },
    errorText: {
        textAlign: 'center',
        color: GlobalStyles.colors.error500,
        margin: 8
    }
});