import { useState } from "react";
import "./App.css";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, ABI } from "./contract";

function App() {
  const [message, setMessage] = useState("");
  const [retrievedMessage, setRetrievedMessage] = useState("");

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function setMessageInContract() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      try {
        const transaction = await contract.setMessage(message);
        await transaction.wait();
        console.log("Message set successfully");
      } catch (err) {
        console.error("Error setting message:", err);
      }
    }
  }

  async function getMessageFromContract() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      try {
        const retrievedMessage = await contract.getMessage();
        setRetrievedMessage(retrievedMessage);
        console.log("Message retrieved:", retrievedMessage);
      } catch (err) {
        console.error("Error getting message:", err);
      }
    }
  }

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Enter message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="input-field"
        />
        <button onClick={setMessageInContract}>Set Message</button>
        <button onClick={getMessageFromContract}>Get Message</button>
        <p>Retrieved Message: {retrievedMessage}</p>
      </div>
    </>
  );
}

export default App;
