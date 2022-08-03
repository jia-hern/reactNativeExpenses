import { useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

import Input from "./Input";
import Button from "../UI/Button";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";

import DateTimePicker from "@react-native-community/datetimepicker";

function ExpenseForm({ submitButtonLabel, onCancel, onSubmit, defaultValues }) {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
  });

  // show and hide the date picker dialog
  const [datePicker, setDatePicker] = useState(false);
  // hold the selected date
  const [date, setDate] = useState(new Date());
  // show the date picker
  function showDatePicker() {
    setDatePicker(true);
  }
  function hideDatePicker() {
    setDatePicker(false);
  }
  // set selected date into state
  function onDateSelected(event, value) {
    setDatePicker(false);
    setDate(value);
  }

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      // date: new Date(inputs.date.value),
      date: date,
      description: inputs.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    // const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    // if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
    if (!amountIsValid || !descriptionIsValid) {
      // Alert.alert('Invalid input', 'Please check your input values');
      setInputs((curInputs) => {
        return {
          amount: { value: curInputs.amount.value, isValid: amountIsValid },
          // date: { value: curInputs.date.value, isValid: dateIsValid },
          date: { value: date },
          description: {
            value: curInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }

    onSubmit(expenseData);
  }

  const formIsInvalid =
    !inputs.amount.isValid ||
    // !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <>
      {datePicker && (
        <DateTimePicker
          value={date}
          mode={"date"}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          is24Hour={true}
          onChange={onDateSelected}
          onCancel={hideDatePicker}
          style={styles.datePicker}
        />
      )}

      <View style={styles.form}>
        <Text style={styles.title}>Your Expense</Text>
        <View style={styles.inputsRow}>
          <Input
            style={styles.rowInput}
            label="Amount"
            invalid={!inputs.amount.isValid}
            textInputConfig={{
              keyboardType: "decimal-pad",
              onChangeText: inputChangedHandler.bind(this, "amount"),
              value: inputs.amount.value,
            }}
          />
          <View style={(styles.buttons, styles.paddingTop)}>
            <Button style={styles.button} onPress={showDatePicker}>
              {getFormattedDate(date)} | Change
            </Button>
          </View>
        </View>
        <Input
          label="Description"
          invalid={!inputs.description.isValid}
          textInputConfig={{
            multiline: true,
            // autoCapitalize: 'none'
            // autoCorrect: false // default is true
            onChangeText: inputChangedHandler.bind(this, "description"),
            value: inputs.description.value,
          }}
        />
        {formIsInvalid && (
          <Text style={styles.errorText}>
            Invalid input values - please check your entered data!
          </Text>
        )}
        <View style={styles.buttons}>
          <Button style={styles.button} mode="flat" onPress={onCancel}>
            Cancel
          </Button>
          <Button style={styles.button} onPress={submitHandler}>
            {submitButtonLabel}
          </Button>
        </View>
      </View>
    </>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  // date picker css
  MainContainer: {
    flex: 1,
    padding: 6,
    alignItems: "center",
    backgroundColor: "white",
  },

  text: {
    fontSize: 25,
    color: "red",
    padding: 3,
    marginBottom: 10,
    textAlign: "center",
  },

  paddingTop: {
    paddingTop: 30,
  },

  // Style for iOS ONLY...
  datePicker: {
    justifyContent: "center",
    alignItems: "flex-start",
    width: 320,
    height: 260,
    display: "flex",
  },
});
