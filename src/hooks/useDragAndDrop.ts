// useDragAndDrop.ts hook

import { api } from '@/utils/api';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';

const useDragAndDrop = () => {
  const [dragging, setDragging] = useState(false);
  const [dragCounter, setDragCounter] = useState(0); // New state for drag counter
  const uploadCSV = api.game.importCSV.useMutation()

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
    setDragCounter(0); // Reset drag counter on drop
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
    
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const text = e.target.result;
        // Now you have the CSV content as a text string, you can send this to your backend
        const response = await uploadCSV.mutateAsync({ text: text });
      };
      reader.readAsText(file);
      
      toast.success('File uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Error uploading file');
    }
  }, []);

  return {
    dragging,
    handleDragEnter,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileChange,
  }
}

export default useDragAndDrop;