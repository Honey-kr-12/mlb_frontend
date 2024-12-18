import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from 'axios';
import "./SpeechToText.css";

const Voice = () => {
    const [message, setMessage] = useState(''); // State to hold the custom message
    const [voice, setVoice] = useState(null);   // State to hold the selected female voice
    const [voicesLoaded, setVoicesLoaded] = useState(false); // State to track if voices are loaded
    const [speaking, setSpeaking] = useState(false);

    // States for the form data
    const [goodServicesDate, setGoodServicesDate] = useState('');
    const [purchaserName, setPurchaserName] = useState('');
    const [goodsServicesName, setGoodsServicesName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [amount, setAmount] = useState('');
    const [gst, setGst] = useState('');
    const [amountPaid, setAmountPaid] = useState('');
    const [amountPending, setAmountPending] = useState('');
    const [paymentMode, setPaymentMode] = useState('');

    const instructions = [
        { field: goodServicesDate, text: 'Set date' },
        { field: purchaserName, text: 'Set name' },
        { field: goodsServicesName, text: 'Set product name' },
        { field: quantity, text: 'Set quantity' },
        { field: amount, text: 'Set amount' },
        { field: gst, text: 'Set GST' },
        { field: amountPaid, text: 'Set amount paid' },
        { field: amountPending, text: 'Set amount pending' },
        { field: paymentMode, text: 'Set payment mode' },
    ];

    // Function to speak the message
    const speakMessage = (msg) => {
        if (!voicesLoaded) {
            console.warn('Voices are not loaded yet!');
            return;
        }
        const utterance = new SpeechSynthesisUtterance(msg);
        if (voice) {
            utterance.voice = voice;
        }
        setSpeaking(true); // Start speaking animation
        utterance.onend = () => setSpeaking(false); // End speaking animation when done
        window.speechSynthesis.speak(utterance);
    };

    // Load available voices and set a female voice
    useEffect(() => {
        const loadVoices = () => {
            const voices = window.speechSynthesis.getVoices();
            if (voices.length > 0) {
                const hindiVoice = voices.find(v => v.name.includes("हिन्दी") || v.voiceURI.includes("हिन्दी"));
                setVoice(hindiVoice || voices[0]); // Set to a specific voice or the first available
                setVoicesLoaded(true);
            }
        };

        if (window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }

        if (window.speechSynthesis.getVoices().length > 0) {
            loadVoices();
        }
    }, []);

    const commands = [
        {
            command: 'reset',
            callback: () => {
                resetTranscript();
                const msg = 'Transcript has been reset!';
                setMessage(msg);
                speakMessage(msg);
            },
        },
        {
            command: 'set date *',
            callback: (date) => {
                setGoodServicesDate(date);
                const msg = `Good services date set to ${date}`;
                setMessage(msg);
                speakMessage(msg);
            },
        },
        {
            command: 'set name *',
            callback: (name) => {
                setPurchaserName(name);
                const msg = `Purchaser name set to ${name}`;
                setMessage(msg);
                speakMessage(msg);
            },
        },
        {
            command: 'set product name *',
            callback: (name) => {
                setGoodsServicesName(name);
                const msg = `Goods product name set to ${name}`;
                setMessage(msg);
                speakMessage(msg);
            },
        },
        {
            command: 'set quantity *',
            callback: (quantity) => {
                setQuantity(quantity);
                const msg = `Quantity set to ${quantity}`;
                setMessage(msg);
                speakMessage(msg);
            },
        },
        {
            command: 'set amount *',
            callback: (amount) => {
                setAmount(amount);
                const msg = `Amount set to ${amount}`;
                setMessage(msg);
                speakMessage(msg);
            },
        },
        {
            command: 'set gst *',
            callback: (gst) => {
                setGst(gst);
                const msg = `GST set to ${gst}`;
                setMessage(msg);
                speakMessage(msg);
            },
        },
        {
            command: 'set amount paid *',
            callback: (amountPaid) => {
                setAmountPaid(amountPaid);
                const msg = `Amount paid set to ${amountPaid}`;
                setMessage(msg);
                speakMessage(msg);
            },
        },
        {
            command: 'set amount pending *',
            callback: (amountPending) => {
                setAmountPending(amountPending);
                const msg = `Amount pending set to ${amountPending}`;
                setMessage(msg);
                speakMessage(msg);
            },
        },
        {
            command: 'set payment mode *',
            callback: (paymentMode) => {
                setPaymentMode(paymentMode);
                const msg = `Payment mode set to ${paymentMode}`;
                setMessage(msg);
                speakMessage(msg);
            },
        },
    ];

    const { transcript, resetTranscript, listening, browserSupportsSpeechRecognition } = useSpeechRecognition({ commands });

    const startListening = () => {
        SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
    };

    const submitData = async () => {
        const data = {
            goodServicesDate,
            purchaserName,
            goodsServicesName,
            quantity,
            amount,
            gst,
            amountPaid,
            amountPending,
            paymentMode,
        };
        console.log(data);
    
        try {
            const response = await axios.post('https://mlb-backnd.duckdns.org/api/product/createProduct', data);
            console.log('Data submitted successfully:', response.data);
            const successMessage = "Order saved successfully!";
            setMessage(successMessage);
            speakMessage(successMessage); // Speak the success message
        } catch (error) {
            console.error('Error submitting data:', error);
            const errorMessage = "Failed to save the order. Please try again.";
            setMessage(errorMessage);
            speakMessage(errorMessage); // Speak the error message
        }
    };
    

    if (!browserSupportsSpeechRecognition) {
        return <p>Your browser doesn't support speech recognition.</p>;
    }

    return (
        <div className="container">
            <div className="transcript-box">
                {transcript ? transcript : 'Start speaking to fill the form...'}
            </div>

            <div className="message-box">
    <strong>Message:</strong> {message ? message : 'No message yet'}
    <div>
        {!speaking ? (
            <div>
                <p>
                    <strong>Good Services Date:</strong> {goodServicesDate || 'Not set'}
                </p>
                <p>
                    <strong>Purchaser Name:</strong> {purchaserName || 'Not set'}
                </p>
                <p>
                    <strong>Goods/Services Name:</strong> {goodsServicesName || 'Not set'}
                </p>
                <p>
                    <strong>Quantity:</strong> {quantity || 'Not set'}
                </p>
                <p>
                    <strong>Amount:</strong> {amount || 'Not set'}
                </p>
                <p>
                    <strong>GST:</strong> {gst || 'Not set'}
                </p>
                <p>
                    <strong>Amount Paid:</strong> {amountPaid || 'Not set'}
                </p>
                <p>
                    <strong>Amount Pending:</strong> {amountPending || 'Not set'}
                </p>
                <p>
                    <strong>Payment Mode:</strong> {paymentMode || 'Not set'}
                </p>
            </div>
        ) : (
            <p>Speaking...</p>
        )}
    </div>
</div>


            <div className="btn-style">
                <button onClick={startListening}>{listening ? 'Stop' : 'Start'}</button>
                <button onClick={resetTranscript}>Reset</button>
                <button onClick={submitData}>Submit Data</button>
            </div>

            <div className="instructions">
                <h3>Instructions:</h3>
                <ul>
                    {instructions.map((instruction, index) => (
                        <li key={index}>
                            {instruction.text}{' '}
                            {instruction.field && (
                                <span style={{ color: 'green', fontWeight: 'bold' }}>✔</span>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Voice;
