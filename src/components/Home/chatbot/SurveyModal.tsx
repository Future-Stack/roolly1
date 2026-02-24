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

const SurveyModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [countryCode, setCountryCode] = useState('+61');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [threadId, setThreadId] = useState<string | null>(null);
    const [message, setMessage] = useState("");
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
    const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string }>({});
    const [isTyping, setIsTyping] = useState(false);

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

    const validate = () => {
        const newErrors: { name?: string; email?: string; phone?: string } = {};

        if (!name.trim()) {
            newErrors.name = "Name is required";
        } else if (name.trim().length < 2) {
            newErrors.name = "Name must be at least 2 characters";
        }

        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Invalid email format";
        }

        if (!phone.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (!/^\d+$/.test(phone.replace(/\s/g, ''))) {
            newErrors.phone = "Phone number must be numeric";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const extractErrorMessage = (errorData: any): string => {
        if (!errorData) return "An unexpected error occurred.";

        const detail = errorData.detail;
        if (!detail) return errorData.message || "An unexpected error occurred.";

        // Special handling for the format: "Failed to create lead: {"phone_number":["..."]}"
        if (typeof detail === 'string' && detail.includes("Failed to create lead: {")) {
            try {
                const jsonString = detail.split("Failed to create lead: ")[1];
                const parsed = JSON.parse(jsonString);

                // Extract first error from any field (usually phone_number or email)
                for (const key in parsed) {
                    if (Array.isArray(parsed[key]) && parsed[key].length > 0) {
                        return parsed[key][0];
                    }
                }
            } catch (e) {
                console.error("Error parsing error detail:", e);
            }
        }

        if (typeof detail === 'string') return detail;

        // Handle case where detail might already be an object
        if (typeof detail === 'object') {
            for (const key in detail) {
                if (Array.isArray(detail[key]) && detail[key].length > 0) {
                    return detail[key][0];
                }
            }
        }

        return "Failed to process request.";
    };

    const handleSubmit = async () => {
        if (!validate()) return;

        try {
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
                text: extractErrorMessage(err?.data),
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

            setIsTyping(true);
            const res = await sendChatMessage(payload).unwrap();
            setIsTyping(false);

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

        } catch (error: any) {
            setIsTyping(false);
            console.error("Chat error:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: extractErrorMessage(error?.data) || "Failed to send message.",
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
                onViewDetails={(id) => {
                    onClose();
                    navigate(`/details/${id}`);
                }}
                isTyping={isTyping}
            />
        );
    }

    return (
        <SurveyForm
            name={name}
            setName={(val) => {
                setName(val);
                if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
            }}
            email={email}
            setEmail={(val) => {
                setEmail(val);
                if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            phone={phone}
            setPhone={(val) => {
                setPhone(val);
                if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
            }}
            countryCode={countryCode}
            setCountryCode={setCountryCode}
            onSubmit={handleSubmit}
            errors={errors}
        />
    );
};

export default SurveyModal;