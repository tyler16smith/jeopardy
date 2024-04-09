import React, { useCallback, useState } from 'react';

const CSVUpload = () => {
  const [dragging, setDragging] = useState(false);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragging(false);
  }, []);

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      handleFileUpload(event.dataTransfer.files[0]);
    }
  }, []);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      handleFileUpload(event.target.files[0]);
    }
  }, []);

  const handleFileUpload = useCallback(async (file: File) => {
    debugger;
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Modify the URL to your upload endpoint
      const response = await fetch('/api/upload_csv', {
        method: 'POST',
        body: formData,
      });
      // const response = await api.game.importCSV({ file: filePath });
      if (!response.ok) throw new Error('Network response was not ok');
      // Handle the response from the server
      alert('File uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    }
  }, []);

  return (
    <div
      className={`flex flex-col justify-center items-center gap-5 max-w-lg h-48 rounded-xl ${dragging ? 'bg-white/50' : 'bg-white/10'} p-5 hover:bg-white/20`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Welcome to <span className="text-[hsl(280,100%,70%)]">Jeopardy!</span>
          </h1>
          <div className="flex flex-col justify-center items-center gap-4">
            <h3 className="text-2xl font-bold">Click to upload a CSV or drag and drop it here!</h3>
            <input type="file" accept=".csv" onChange={handleFileChange} className="text-lg" />
            <p className="text-sm text-gray-300">
              Download an example CSV file <a href="/example.csv" className="text-[#ffcc00]">here</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CSVUpload;
