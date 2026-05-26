import classNames from 'classnames';
import React, { useRef } from 'react';
import { Upload } from 'lucide-react';

type CSVUploadAreaProps = {
  dragging: boolean;
  processing: boolean;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const CSVUploadArea = ({
  dragging,
  processing,
  handleFileChange
}: CSVUploadAreaProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDivClick = () => {
    fileInputRef?.current?.click();
  };

  return (
    <div
      className={classNames(
        'flex min-h-[3rem] w-full cursor-pointer flex-col items-center justify-center gap-2',
        'rounded-lg border border-dashed border-white/30 px-4 py-3 transition duration-200',
        'hover:border-white/50 hover:bg-white/15',
        dragging ? 'border-white/60 bg-white/25' : 'bg-white/10',
      )}
      onClick={handleDivClick}
    >
      {processing ? (
        <div className="flex items-center gap-3">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          <span className="text-sm font-semibold">Processing...</span>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Upload size={16} />
          <span>Click to upload or drag and drop</span>
        </div>
      )}
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="absolute h-0 w-0 opacity-0"
        ref={fileInputRef}
      />
    </div>
  );
}

export default CSVUploadArea;
