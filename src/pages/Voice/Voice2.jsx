import "./SpeechToText.css";
import { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from 'axios';
import { FaMicrophone, FaVolumeUp } from 'react-icons/fa';

const Voice2 = () => {
    const [message, setMessage] = useState(''); // State to hold the custom message
    const [voice, setVoice] = useState(null);   // State to hold the selected female voice
    const [voicesLoaded, setVoicesLoaded] = useState(false); // State to track if voices are loaded
    const [aiResponse, setAiResponse] = useState(''); 
    const [speaking, setSpeaking] = useState(false);

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

    const callOpenAI = async (transcript) => {
        try {
            const response = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCRn0pQX-QT0NVQCGp40n9HJMp4-AD_b-E`, {
                contents: [{ parts: [{ text: transcript }] }],
            });

            if (response && response.data) {
                const fullText = response.data.candidates[0].content.parts[0].text;
const aiText = fullText.split('.')[0]; // Get the part before the first period
                setAiResponse(aiText); // Set the AI response first
                speakMessage(aiText);   // Then speak the response
            }
        } catch (error) {
            console.error("Error fetching AI response:", error);
        }
    };

    // Define commands for specific actions
    const commands = [
        {
            command: 'anna *',
            callback: async (query) => {
                setMessage(query); // Set the user's query as message
                await callOpenAI(query); // Call OpenAI with the query
            },
        },
        {
            command: 'what is your name',
            callback: () => {
                resetTranscript();
                const msg = 'mera naam hai anna  .';
                setMessage(msg);
                speakMessage(msg); 
            },
        },
        {
            command: 'what is my name',
            callback: () => {
                resetTranscript();
                const msg = 'aap ka naam hai honey';
                setMessage(msg);
                speakMessage(msg); 
            },
        },
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
            command: 'Please open * and search for *',
            callback: async (website, query) => {
                const urlMap = {
                    youtube: `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`,
                    google: `https://www.google.com/search?q=${encodeURIComponent(query)}`
                };
    
                const lowerCaseWebsite = website.toLowerCase();
                const searchUrl = urlMap[lowerCaseWebsite] || `https://${website}.com`;
    
                const msg = `Opening ${lowerCaseWebsite} and searching for ${query}.`;
                window.open(searchUrl, '_blank');
                setMessage(msg);
                speakMessage(msg); // Speak the message
            },
        },
        {
            command: 'gadi wala game',
            callback: async (website) => {
                const msg = `Opening gaadi vala game`;
                window.open(`https://kidzone-edugames.itch.io/numbers-racing-game`, '_blank');
                setMessage(msg);
                speakMessage(msg); // Speak the message
            },
        },
        {
            command: 'chidiya wala game',
            callback: async (website) => {
                const msg = `Opening chidiya vala game`;
                window.open(`https://kidzone-edugames.itch.io/balloon-buster-math-edition`, '_blank');
                setMessage(msg);
                speakMessage(msg); // Speak the message
            },
        },
        {
            command: 'open * please',
            callback: async (website) => {
                const msg = `Opening ${website}.com`;
                window.open(`https://${website}.com`, '_blank');
                setMessage(msg);
                speakMessage(msg); // Speak the message
            },
        },
        {
            command: 'open karo *',
            callback: (website) => {
                const msg = `tere baap ki nokar nahi hu jo ${website} kholke du`;
                setMessage(msg);
                speakMessage(msg); // Speak the message
            },
        },
        {
            command: 'change background colour to *',
            callback: (color) => {
                try {
                    document.body.style.backgroundColor = color;
                    const msg = `Changed background color to ${color}`;
                    setMessage(msg);
                    speakMessage(msg);
                } catch (error) {
                    console.error("Invalid color input:", error);
                }
            },
        },
        {
            command: 'speak *',
            callback: (msg) => {
                setMessage(msg);
                speakMessage(msg); // Speak the user-set message
            }
        }
    ];

    const { transcript, resetTranscript, listening, browserSupportsSpeechRecognition } = useSpeechRecognition({ commands });

    const startListening = () => {
        SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
    };

    if (!browserSupportsSpeechRecognition) {
        return <p>Your browser doesn't support speech recognition.</p>;
    }

    return (
        <div className="container">
            <div className="transcript-box">
                {transcript ? transcript : 'Start speaking to talk with anna ...'}
            </div>

            <div className="message-box">
                <strong>Message:</strong> {message ? message : !aiResponse ? aiResponse : 'no message yet'}
                   <div> {!speaking ? <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3XmSu2CPxs0vphM302ciA7ia6hhf18mkadw&s" alt="" srcset="" /> :              <img src="https://img.freepik.com/premium-vector/cute-girl-talk-using-mic_274619-47.jpg" alt="" srcset="" />}</div>

            </div>

            <div className="btn-style">
                <button onClick={startListening}>{listening ? 'Stop' : 'Start'}</button>
                {/* <button onClick={SpeechRecognition.stopListening}>Stop Listening</button> */}
                <button onClick={resetTranscript}>Reset</button>
            </div>
        </div>
    );
};

export default Voice2;
