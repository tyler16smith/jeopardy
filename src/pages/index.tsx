import classNames from 'classnames';
import { Download, Pencil, Rocket } from 'lucide-react';
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
      className="relative flex min-h-screen flex-col items-center justify-center px-4 py-12"
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {dragging && (
        <div
          className={classNames(
            'absolute inset-4 z-10 flex items-center justify-center',
            'rounded-2xl border-4 border-dashed border-white/40 bg-black/30 backdrop-blur-xl',
          )}
        >
          <div className="flex flex-col items-center gap-2 text-center text-3xl font-bold text-white">
            <p>Drag and Drop</p>
            <p>Your CSV File Here</p>
          </div>
        </div>
      )}

      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-12">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">
            Play <span className="text-jeopardy">Jeopardy!</span>
          </h1>
          <p className="mt-4 text-lg text-white/80">
            Create a custom game board from a simple CSV file
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
          <div className="jeopardy-card flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-sm font-bold">
                1
              </span>
              <h2 className="text-xl font-bold">Download the template</h2>
            </div>
            <p className="text-white/80">
              Start with our example CSV to see the required format.
            </p>
            <a
              href="/data/example.csv"
              className="jeopardy-btn-primary mt-auto w-fit gap-2"
            >
              <Download size={18} />
              Download Example CSV
            </a>
          </div>

          <div className="jeopardy-card flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-sm font-bold">
                2
              </span>
              <h2 className="text-xl font-bold">Edit your questions</h2>
            </div>
            <p className="flex flex-1 items-start gap-2 text-white/80">
              <Pencil size={18} className="mt-0.5 shrink-0 text-yellow-300" />
              Open the CSV and fill in your categories, clues, and answers.
            </p>
          </div>

          <div className="jeopardy-card flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-sm font-bold">
                3
              </span>
              <h2 className="text-xl font-bold">Upload and play</h2>
            </div>
            <p className="flex items-start gap-2 text-white/80">
              <Rocket size={18} className="mt-0.5 shrink-0 text-yellow-300" />
              Upload your CSV and we&apos;ll build your game board.
            </p>
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
