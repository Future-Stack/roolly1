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
    errors: {
        name?: string;
        email?: string;
        phone?: string;
    };
    isSubmitting: boolean;
}

const SurveyForm: React.FC<SurveyFormProps> = ({
    name, setName, email, setEmail, phone, setPhone, countryCode, setCountryCode, onSubmit, errors, isSubmitting
}) => (
    <div className="p-4 sm:p-5 flex flex-col gap-5 sm:gap-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="flex justify-start">
            <div className="bg-[#0446DE] text-white px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl rounded-tl-none shadow-md shadow-blue-100 max-w-[85%] sm:max-w-[80%] flex items-center gap-2">
                <span className="text-xs sm:text-sm font-medium">I'm looking for customer support.</span>
            </div>
        </div>

        <div className="flex flex-col items-start gap-3">
            <div className="flex-shrink-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-100">
                    <img src={chatbot} alt="chatbot" className="w-5 h-5 sm:w-6 sm:h-6 object-contain" />
                </div>
            </div>
            <div className="bg-white px-4 sm:px-[17px] py-4 sm:py-[19px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#EBEFFE] rounded-[16px] w-full flex-1">
                <p className="text-[#2F3237] text-xs sm:text-sm leading-snug mb-3 sm:mb-[13px] font-normal">
                    To help us direct your query to the right person, could you please provide a few details?
                </p>

                <div className="space-y-3 sm:space-y-4">
                    <div>
                        <label className="block text-gray-700 text-xs sm:text-sm font-medium mb-1 sm:mb-1.5 ml-0.5">
                            Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border ${errors.name ? 'border-red-500' : 'border-[#EBEFFE]'} rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-400/30 transition-all text-sm text-gray-700`}
                            placeholder="Marcus"
                        />
                        {errors.name && <p className="text-red-500 text-[10px] sm:text-xs mt-1 ml-1">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="block text-gray-700 text-xs sm:text-sm font-medium mb-1 sm:mb-1.5 ml-0.5">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border ${errors.email ? 'border-red-500' : 'border-[#EBEFFE]'} rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-400/30 transition-all text-sm text-gray-700`}
                            placeholder="marcus@email.com"
                        />
                        {errors.email && <p className="text-red-500 text-[10px] sm:text-xs mt-1 ml-1">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block text-gray-700 text-xs sm:text-sm font-medium mb-1 sm:mb-1.5 ml-0.5">
                            Phone Number <span className="text-red-500">*</span>
                        </label>
                        <div className={`flex gap-0 sm:gap-2 border ${errors.phone ? 'border-red-500' : 'border-[#EBEFFE]'} rounded-xl overflow-hidden focus-within:ring-1 focus-within:ring-blue-400/30`}>
                            <div className="relative flex items-center pl-2 sm:pl-3 pr-1 sm:pr-2 border-r border-[#EBEFFE] shrink-0">
                                <div className="flex items-center gap-0.5 sm:gap-1">
                                    <span className="text-xs sm:text-sm whitespace-nowrap">{countryCode}</span>
                                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
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
                                placeholder="07123 456789"
                                className="flex-1 min-w-0 px-2 sm:px-3 py-2.5 sm:py-3 bg-white outline-none text-sm text-gray-700"
                            />
                        </div>
                        {errors.phone && <p className="text-red-500 text-[10px] sm:text-xs mt-1 ml-1">{errors.phone}</p>}
                    </div>

                    <button
                        onClick={onSubmit}
                        className={`w-full py-3.5 sm:py-4 text-sm sm:text-base font-medium rounded-xl transition-all active:scale-[0.98] mt-3 sm:mt-4 bg-[#126AD8] border border-[#0D4B99] text-white hover:bg-[#0D4B99] hover:border-transparent cursor-pointer`}
                    >
                        {
                            isSubmitting ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                </div>
                            ) : (
                                "Start chatting"
                            )
                        }
                    </button>
                </div>
            </div>
        </div>
    </div>
);

export default SurveyForm;
