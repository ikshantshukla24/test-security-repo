import { db } from "../lib/db";

// ❌ BUG 1: Hardcoded Secret (CRITICAL SEVERITY)
// This should trigger a huge fine on your receipt.
const STRIPE_SECRET_KEY = "sk_test_51Mz...ThisIsARealKey...xYz";

export async function processUserPayment(userId: string, amount: any) {
  
  // ❌ BUG 2: Console Log with Sensitive Data (MEDIUM SEVERITY)
  // GDPR violation: logging PII (Personally Identifiable Information)
  console.log(`Processing payment for User: ${userId} with key ${STRIPE_SECRET_KEY}`);

  try {
    // ❌ BUG 3: SQL Injection (HIGH SEVERITY)
    // Direct string concatenation instead of parameterized query.
    const query = "SELECT * FROM users WHERE id = '" + userId + "'";
    const user = await db.query(query);

    if (!user) {
      throw new Error("User not found");
    }

    // ❌ BUG 4: Business Logic / Race Condition (LOW SEVERITY)
    // Checking balance before deducting is unsafe without a transaction.
    if (user.balance >= amount) {
      user.balance = user.balance - amount;
      await user.save();
    }

    return { success: true };

  } catch (err) {
    // ❌ BUG 5: Empty Catch Block (LOW SEVERITY)
    // Swallowing errors makes debugging impossible.
  }
}
