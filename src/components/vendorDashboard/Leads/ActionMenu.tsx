interface ActionMenuProps {
    onClose: () => void;
}

const ActionMenu: React.FC<ActionMenuProps> = ({ onClose }) => {
    return (
        <div className="absolute right-0 mt-2 w-110 z-30">
            <div className="flex gap-x-4">
                <button
                    onClick={onClose}
                    className="w-full text-center px-4 py-2 rounded-md bg-white hover:bg-gray-300 font-medium text-[14px]"
                >
                    Back
                </button>

                <button className="w-full text-left px-4 py-2 border border-yellow-500 text-yellow-600 rounded-md hover:bg-yellow-50 font-medium text-[14px]">
                    Edit Property
                </button>

                <button className="w-full text-left  px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 font-medium text-[14px]">
                    Delete Property
                </button>
            </div>
        </div>
    );
};

export default ActionMenu;
