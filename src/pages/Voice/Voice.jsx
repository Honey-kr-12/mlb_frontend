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

        // Re-fetch voices when they become available
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }

        // Load voices if already available
        if (window.speechSynthesis.getVoices().length > 0) {
            loadVoices();
        }
    }, []);

    // Define commands for specific actions
    const commands = [
        {
            command: 'reset',
            callback: () => {
                resetTranscript();
                const msg = 'Transcript has been reset!';
                setMessage(msg);
                speakMessage(msg); // Speak the message
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
            command: 'set service name *',
            callback: (name) => {
                setGoodsServicesName(name);
                const msg = `Goods service name set to ${name}`;
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
            const response = await axios.post('http://localhost:5050/api/product/createProduct', data);
            console.log('Data submitted successfully:', response.data);
            // Handle response or reset fields if needed
        } catch (error) {
            console.error('Error submitting data:', error);
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
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3XmSu2CPxs0vphM302ciA7ia6hhf18mkadw&s"
                            alt="Speaker Icon"
                        />
                    ) : (
                        <img
                            src="https://img.freepik.com/premium-vector/cute-girl-talk-using-mic_274619-47.jpg"
                            alt="Speaking Icon"
                        />
                    )}
                </div>
            </div>

            <div className="btn-style">
                <button onClick={startListening}>{listening ? 'Stop' : 'Start'}</button>
                <button onClick={resetTranscript}>Reset</button>
                <button onClick={submitData}>Submit Data</button>
            </div>
        </div>
    );
};

export default Voice;
