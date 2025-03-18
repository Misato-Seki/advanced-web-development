import http from "k6/http";  // Import the HTTP module
import { check, sleep } from "k6";  // Import assertion and sleep modules

// Defined options (load test settings)
export let options = {
    stages: [
        { duration: "30s", target: 50 },  // Scale up to 50 virtual users over 30 seconds
        { duration: "1m", target: 50 },   // Maintain 50 virtual users for 1 minute
        { duration: "10s", target: 0 },   // Scale down to 0 virtual users over 10 seconds
    ],
};

// Default function (executed by each virtual user)
export default function () {
    // Create data for the POST request (dummy data)
    const payload = JSON.stringify({
        firstName: "John",
        lastName: "Doe",
        phoneNumber: "123-456-7890"
    });

    // Set headers (Content-Type as JSON)
    const headers = { "Content-Type": "application/json" };

    // Send a POST request to the /add-user endpoint
    let res = http.post("http://localhost:3000/add-user", payload, { headers: headers });

    // Assertions (Check if the response is as expected)
    check(res, {
        "status is 201": (r) => r.status === 201,
        "response is JSON": (r) => r.headers['Content-Type'] === 'application/json; charset=utf-8',
        "ID is returned": (r) => JSON.parse(r.body).id !== undefined,
    });

    // Wait for 1 second between requests for each virtual user
    sleep(1);
}
