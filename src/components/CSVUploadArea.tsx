import classNames from 'classnames';
import React, { useRef } from 'react';

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
  // Ref for the file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDivClick = () => {
    fileInputRef?.current?.click();
  };

  return (
    <div
      className={classNames(
        'flex flex-col justify-center items-center gap-5 max-w-lg',
        'h-48 rounded-xl p-5 hover:bg-white/20 cursor-pointer',
        dragging ? 'bg-white/50' : 'bg-white/10'
      )}
      onClick={handleDivClick}
    >
      <div className='w-96 flex justify-center items-center'>
        {processing ? (
          <>
            <div className='w-6 h-6 border-2 border-t-[#6233a6]/80 rounded-full animate-spin' />
            <h3 className="text-lg text-center font-bold p-4">Processing...</h3>
          </>
        ) : (
          <h3 className="text-lg text-center font-bold p-4">
            Click to upload a CSV or drag and drop!
          </h3>
        )}
      </div>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="opacity-0 absolute w-0 h-0"
        ref={fileInputRef}
      />
    </div>
  );
}

export default CSVUploadArea;