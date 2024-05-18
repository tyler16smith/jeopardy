// useDragAndDrop.ts hook

import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

const useDragAndDrop = () => {
  const [dragging, setDragging] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [dragCounter, setDragCounter] = useState(0); // New state for drag counter
  const router = useRouter()

  const handleDragEnter = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    // Increment drag counter
    setDragCounter(currentCounter => currentCounter + 1);
    setDragging(true);
  }, []);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const handleDragLeave = useCallback(() => {
    // Decrement drag counter and check if it's zero to reset dragging state
    setDragCounter(currentCounter => {
      if (currentCounter > 1) {
        return currentCounter - 1;
      } else {
        setDragging(false);
        return 0;
      }
    });
  }, []);

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    setDragCounter(0);
    if (event.dataTransfer.files?.[0]) {
      void handleFileUpload(event.dataTransfer.files[0]);
    }
  }, []);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      void handleFileUpload(event.target.files[0]);
    }
  }, []);

  const handleFileUpload = useCallback(async (file: File) => {
    setProcessing(true);
    try {
      const formData = new FormData()
      formData.append('file', file)
      const response = await fetch('/api/upload_csv', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()
      console.log(data)
      if (data.error) {
        throw new Error(data.error)
      }
      router.push(`/g/${data}/setup`)
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Error uploading file');
      setProcessing(false);
    }
  }, []);

  return {
    dragging,
    processing,
    handleDragEnter,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileChange,
  }
}

export default useDragAndDrop;