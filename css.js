body {
    font-family: 'Arial', sans-serif;
    background: linear-gradient(135deg, #d4fc79, #96e6a1);
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.container {
    background: white;
    max-width: 400px;
    margin: auto;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0px 5px 20px rgba(0,0,0,0.2);
    text-align: center;
}

h1 {
    margin-bottom: 20px;
    color: #2e7d32;
}

label {
    display: block;
    margin-top: 15px;
    font-weight: bold;
}

input, select, button {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    border-radius: 8px;
    border: 1px solid #ccc;
}

button {
    background-color: #4caf50;
    color: white;
    font-size: 18px;
    margin-top: 20px;
    border: none;
    cursor: pointer;
    transition: transform 0.2s;
}

button:hover {
    transform: scale(1.05);
    background-color: #388e3c;
}

.result {
    margin-top: 20px;
}

#totalAmount, #profit {
    color: green;
    font-weight: bold;
    font-size: 1.5em;
}

footer {
    text-align: center;
    margin: 20px 0;
    font-size: 0.9em;
}