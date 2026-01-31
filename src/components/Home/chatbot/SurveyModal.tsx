import { useState, useEffect } from 'react';
import {
    useCreateChatThreadMutation,
    useSendChatMessageMutation,
    useGetChatHistoryMutation
} from '@/redux/features/ai/aiCustomerSupport';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

import ChatView from './components/ChatView';
import SurveyForm from './components/SurveyForm';

export interface ChatMessage {
    sender: "user" | "bot";
    text?: string;
    properties?: any[];
    options?: string[];
}

const SurveyModal: React.FC<{ onClose: () => void }> = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [countryCode, setCountryCode] = useState('+61');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [threadId, setThreadId] = useState<string | null>(null);
    const [message, setMessage] = useState("");
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

    const [createChatThread] = useCreateChatThreadMutation();
    const [sendChatMessage] = useSendChatMessageMutation();
    const [getChatHistory] = useGetChatHistoryMutation();
    const navigate = useNavigate();

    useEffect(() => {
        if (threadId) {
            fetchHistory(threadId);
        }
    }, [threadId]);

    const fetchHistory = async (id: string) => {
        try {
            const res = await getChatHistory({ thread_id: id }).unwrap();
            const formattedMessages: ChatMessage[] = res.messages.map((msg: any) => ({
                sender: msg.role === 'user' ? 'user' : 'bot',
                text: msg.content.message || msg.content.text || (typeof msg.content === 'string' ? msg.content : ""),
                properties: msg.content.properties?.results || [],
                options: msg.content.options || []
            }));
            setChatMessages(formattedMessages);
        } catch (err) {
            console.error("Error fetching history:", err);
        }
    };

    const handleSubmit = async () => {
        try {
            if (!name || !email) {
                alert("Name and Email are required");
                return;
            }

            const payload = {
                client_name: name,
                email_address: email,
                phone_number: `${countryCode}${phone}`,
            };
            console.log(payload);

            const res = await createChatThread(payload).unwrap();
            setThreadId(res.thread_id);
            setIsSubmitted(true);
            fetchHistory(res.thread_id);

        } catch (err: any) {
            console.error("Error creating thread:", err.data);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: err?.data?.detail || "Failed to create thread.",
            });
        }
    };

    const handleSendMessage = async (textOverride?: string, propertyId?: string | number) => {
        const textToSend = textOverride || message;
        if (!textToSend.trim() || !threadId) return;

        if (!textOverride) setMessage("");

        try {
            setChatMessages((prev) => [
                ...prev,
                { sender: "user", text: textToSend },
            ]);

            const payload: any = {
                threadID: threadId,
                message: textToSend,
            };
            if (propertyId) {
                payload.property = propertyId;
            }

            const res = await sendChatMessage(payload).unwrap();

            const botReply = res.reply;
            const replyText = typeof botReply === 'string' ? botReply : (botReply?.message || "");
            const replyProps = botReply?.properties?.results || [];
            const replyOpts = botReply?.options || [];

            setChatMessages((prev) => [
                ...prev,
                {
                    sender: "bot",
                    text: replyText,
                    properties: replyProps,
                    options: replyOpts
                },
            ]);

        } catch (error) {
            console.error("Chat error:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to send message.",
            });
        }
    };

    if (isSubmitted) {
        return (
            <ChatView
                chatMessages={chatMessages}
                message={message}
                setMessage={setMessage}
                handleSendMessage={handleSendMessage}
                navigate={navigate}
            />
        );
    }

    return (
        <SurveyForm
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            phone={phone}
            setPhone={setPhone}
            countryCode={countryCode}
            setCountryCode={setCountryCode}
            onSubmit={handleSubmit}
        />
    );
};

export default SurveyModal;