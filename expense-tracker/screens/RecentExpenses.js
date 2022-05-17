import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/Expenses/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";

const RecentExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7daysAgo = getDateMinusDays(today, 7);
    return expense.date >= date7daysAgo && expense.date <= today;
  });

  // useEffect(() => {
  //   const getExpenses = async () => {
  //     const expenses = await fetchExpenses();
  //     expensesCtx.setExpenses(expenses);
  //   };

  //   getExpenses();
  // }, []);

  useFocusEffect(
    useCallback(()=>{
      const getExpenses = async () => {
        const expenses = await fetchExpenses();
        expensesCtx.setExpenses(expenses);
      };

      getExpenses();
    }, [])
  )

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod={"Last 7 Days"}
      fallBackText="No expenses registered for last 7 days."
    />
  );
};

export default RecentExpenses;
