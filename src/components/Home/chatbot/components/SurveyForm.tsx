import React from 'react';
import chatbot from '../../../../assets/chatbot-img.png';

interface SurveyFormProps {
    name: string;
    setName: (val: string) => void;
    email: string;
    setEmail: (val: string) => void;
    phone: string;
    setPhone: (val: string) => void;
    countryCode: string;
    setCountryCode: (val: string) => void;
    onSubmit: () => void;
}

const SurveyForm: React.FC<SurveyFormProps> = ({
    name, setName, email, setEmail, phone, setPhone, countryCode, setCountryCode, onSubmit
}) => (
    <div className="p-5 flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="flex justify-end">
            <div className="bg-[#0446DE] text-white px-5 py-3 rounded-2xl rounded-tr-none shadow-md shadow-blue-100 max-w-[80%] flex items-center gap-2">
                <span className="text-sm font-medium">I'm looking for customer support.</span>
            </div>
        </div>

        <div className="flex flex-col items-start gap-3">
            <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-100">
                    <img src={chatbot} alt="chatbot" className="w-6 h-6 object-contain" />
                </div>
            </div>
            <div className="bg-white px-[17px] py-[19px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#EBEFFE] rounded-[16px]  flex-1">
                <p className="text-[#2F3237] text-sm leading-snug mb-[13px] font-normal">
                    Leave a message Provide your details to get notified
                </p>

                <div className="space-y-2">
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1.5 ml-0.5">
                            Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 bg-white border border-[#EBEFFE] rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-400/30 transition-all text-sm text-gray-700"
                            placeholder="Marcus"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1.5 ml-0.5">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 bg-white border border-[#EBEFFE] rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-400/30 transition-all text-sm text-gray-700"
                            placeholder="marcus@email.com"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1.5 ml-0.5">
                            Phone Number
                        </label>
                        <div className="flex gap-2 border border-[#EBEFFE] rounded-xl overflow-hidden focus-within:ring-1 focus-within:ring-blue-400/30">
                            <div className="relative flex items-center pl-3 pr-2 border-r border-[#EBEFFE]">
                                <div className="flex items-center gap-1">
                                    <span className="text-sm">{countryCode}</span>
                                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                    </svg>
                                </div>
                                <select
                                    value={countryCode}
                                    onChange={(e) => setCountryCode(e.target.value)}
                                    className="absolute inset-0 opacity-0 cursor-pointer w-full"
                                >
                                    <option value="+61">Australia (+61)</option>
                                    <option value="+60">Malaysia (+60)</option>
                                    <option value="+1">USA (+1)</option>
                                    <option value="+44">UK (+44)</option>
                                    <option value="+880">BD (+880)</option>
                                    <option value="+91">IN (+91)</option>
                                    <option value="+92">PK (+92)</option>
                                </select>
                            </div>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="+61 01234 567 890"
                                className="flex-1 px-3 py-3 bg-white outline-none text-sm text-gray-700"
                            />
                        </div>
                    </div>

                    <button
                        onClick={onSubmit}
                        className={`w-full py-4 text-base font-medium rounded-xl transition-all active:scale-[0.98] mt-4 bg-[#126AD8] border border-[#0D4B99] text-white hover:bg-[#A3B8E9] hover:border-transparent`}
                    >
                        Start chatting
                    </button>
                </div>
            </div>
        </div>
    </div>
);

export default SurveyForm;
