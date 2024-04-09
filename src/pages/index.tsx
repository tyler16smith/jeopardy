import classNames from 'classnames';
import CSVUploadArea from '@/components/CSVUploadArea';
import useDragAndDrop from '@/hooks/useDragAndDrop';

const Home = () => {
  const {
    dragging,
    handleDragEnter,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileChange,
  } = useDragAndDrop();

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white relative"
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter} // Updated to use handleDragEnter
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
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Welcome to <span className="text-[hsl(280,100%,70%)]">Jeopardy!</span>
        </h1>
        <div className="flex flex-col justify-center items-center gap-4">
          <CSVUploadArea dragging={dragging} handleFileChange={handleFileChange} />
          <p className="text-sm text-gray-300">
            Download an example CSV file <a href="/data/example.csv" className="text-[#ffcc00]">here</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
