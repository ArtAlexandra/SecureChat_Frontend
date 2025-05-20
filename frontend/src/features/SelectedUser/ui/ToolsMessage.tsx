import Image from "next/image";

interface IToolsMessageProps {
    onDelete: () => void;
};

function ToolsMessage({onDelete}: IToolsMessageProps) {
    return(
        <div className="flex">
            <Image src="/settings/garbage.png" width={20} height={20} alt="delete image" onClick={onDelete}/>
        </div>
    );
}

export default ToolsMessage;