async function checkServerStatus() {
    try {
        const response = await fetch('/api');
        const data = await response.json();
        
        document.getElementById('serverStatus').innerHTML = `
            <h3>Server Status</h3>
            <p>Message: ${data.message}</p>
            <p>Timestamp: ${data.timestamp}</p>
        `;
    } catch (error) {
        document.getElementById('serverStatus').innerHTML = `
            <h3>Server Status</h3>
            <p style="color: red;">Error connecting to server</p>
        `;
    }
}

// Check server status when page loads
checkServerStatus();

// Update status every 30 seconds
setInterval(checkServerStatus, 30000);