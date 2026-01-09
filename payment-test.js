// payment-test.js

async function processUserPayment(userId, amount) {
    // 1. TRIGGER: Attack Simulator (SQL Injection)
    // The parser will detect this insecure concatenation
    const query = "SELECT * FROM user_wallets WHERE user_id = " + userId;
    
    // 2. TRIGGER: PCI Auditor (Real Credit Card Logic)
    // This number passes the Luhn Algorithm (It is a valid Visa Test Number)
    const testCard = "4532 7151 1283 0369";
    
    // 3. TRIGGER: PCI Auditor (Illegal Logging)
    // "cvv" is a sensitive keyword
    console.log("Processing payment for CVV:", "123"); 

    db.execute(query);
    
    return {
        status: "success",
        card: testCard
    };
}
