import classNames from 'classnames';
import CSVUploadArea from '@/components/CSVUploadArea';
import useDragAndDrop from '@/hooks/useDragAndDrop';

const Home = () => {
  const {
    dragging,
    processing,
    handleDragEnter,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileChange,
  } = useDragAndDrop();

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen relative"
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className='flex justify-center items-center w-full h-full'>
        {/* Conditional rendering based on `dragging` state */}
        {dragging && (
          <div className={classNames(
            'absolute top-1/2 left-1/2 h-[95vh] w-[98vw]',
            'transform -translate-x-1/2 -translate-y-1/2',
            'flex justify-center items-center border-[8px] border-dashed',
            'border-white/20 rounded-xl bg-gray-600/20 backdrop-blur-xl',
          )}>
            <div className='flex flex-col items-center gap-2 text-3xl font-bold'>
              <h1>Drag and Drop</h1>
              <h1>Your CSV File Here</h1>
            </div>
          </div>
        )}
      </div>
      <div className="container flex flex-col items-center justify-center gap-16 px-4 py-16">
        <h1 className="font-extrabold tracking-tight text-5xl sm:text-[4rem]">
          Play <span className="text-jeopardy/70">Jeopardy!</span>
        </h1>
        <div className='flex flex-col lg:flex-row justify-center items-start gap-16 mt-5 lg:text-lg'>
          <div className="flex flex-col gap-2">
            <p className='font-bold text-2xl'>Step 1:</p>
            <p>Download the example CSV ⬇️</p>
            <a
              href="/data/example.csv"
              className="text-white font-medium w-fit px-5 py-2.5 rounded-lg mt-5 bg-jeopardy/20 hover:bg-jeopardy/40 transition duration-200"
            >
              Download Example CSV
            </a>
          </div>
          <div className="flex flex-col gap-2">
            <p className='font-bold text-2xl'>Step 2:</p>
            <p>Open the CSV and edit all the fields ✏️</p>
          </div>
          <div className="flex flex-col justify-start items-start gap-6">
            <div className="flex flex-col gap-2">
              <p className='font-bold text-2xl'>Step 3:</p>
              <p>Upload your CSV and we&apos;ll do the rest 🚀</p>
            </div>
            <CSVUploadArea
              dragging={dragging}
              processing={processing}
              handleFileChange={handleFileChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
