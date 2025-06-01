import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Upload as UploadAnt } from 'antd';
import { UploadChangeParam, UploadFile } from 'antd/es/upload';

import Button from '../Button';

const DEFAULT_ACCEPT = '.jpeg,.jpg,.png';

interface IUploadProps {
    text?: string;
    accept?: string;
    value: File | null;
    label?: string;

    onChange: (file: File | null, fileList?: File[]) => void;
};

function Upload({ text, onChange, accept = DEFAULT_ACCEPT, value, label }: IUploadProps) {
    const textInButton = text || 'Выбрать';
    const [file, setFile] = useState<File | null>(null);


    useEffect(() => {
        setFile(value);
    }, [value]);

    const handleChange = (info: UploadChangeParam<UploadFile<File>>) => {
        if (info.file.status === 'removed') {
            setFile(null);
            onChange(null, []);
            return;
        }

        const currentFile = info.file.originFileObj;
        if (!currentFile) return;

        setFile(currentFile);
        onChange(currentFile, info.fileList.map(f => f.originFileObj as File));
    };

    return (
        <div className="w-[300px]">
            {label && <p>{label}</p>}
            <UploadAnt onChange={handleChange} accept={accept} maxCount={1}
                customRequest={({ onSuccess }) => {
                    if (onSuccess) onSuccess('ok');
                }}
                fileList={value ? [{
                    uid: '-1',
                    name: value.name,
                    status: 'done',
                    url: URL.createObjectURL(value),
                }] : []}
            >
                <Button color="basic"> { textInButton }</Button>
            </UploadAnt>
            { file && <Image src={URL.createObjectURL(file)} width={300} height={300} alt="upload file" /> }
        </div>
    );
};

export default Upload;