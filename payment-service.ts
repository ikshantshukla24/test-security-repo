// src/services/payment-service.ts

/**
 * ⚠️ VULNERABLE CODE FOR TESTING CODEDIFF AI ⚠️
 * Triggers: SQL Injection, Race Condition, PCI Violation (Luhn)
 */

import { db } from '../config/database';

export const processUserPayment = async (userId: string, amount: number, cardNumber: string) => {
  console.log(`[AUDIT] Starting payment for user: ${userId}`);

  // 🚨 VULNERABILITY 1: SQL Injection
  // The AI should flag this as "Critical Financial Risk ($65k Fine)"
  // The Attack Terminal should simulate a payload like: ' OR '1'='1'
  const userAccount = await db.query(
    `SELECT * FROM accounts WHERE user_id = '${userId}'`
  );

  // 🚨 VULNERABILITY 2: Race Condition / Logic Flaw
  // DeepSeek should catch: "No transaction lock found. Double-spend risk."
  // Financial Impact: $90,000 Fraud Risk
  const balance = userAccount.rows[0].balance;
  
  if (balance >= amount) {
    // Simulate processing delay (hacker window)
    await new Promise(resolve => setTimeout(resolve, 100));

    await db.query(
      `UPDATE accounts SET balance = ${balance - amount} WHERE user_id = '${userId}'`
    );
    
    // 🚨 VULNERABILITY 3: PCI-DSS Violation (Luhn Algorithm)
    // This is a VALID Visa Test Number. Your Luhn Script MUST catch this.
    // Logic: Regex finds it -> Luhn Math verifies it -> Alert Triggered.
    const PAN = "4532715542331222"; // Valid VISA test number
    console.log(`Payment Success! Receipt sent to card: ${PAN}`); 

    return { success: true, txn_id: "tx_123" };
  }

  return { success: false };
};
