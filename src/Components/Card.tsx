interface CardProps {
  head: string;
  title: string;
  onCopy: () => void;
  onDelete: () => void;
}

function Card({ head, title, onCopy, onDelete }: CardProps) {
  return (
    <>
      <div className="w-full md:w-1/2 lg:w-1/4 p-4">
        <div className="bg-gray-100 rounded-lg shadow-md p-4 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-2">{head}</h2>
          <p className="text-gray-500 mb-4">{title}</p>
          <div className="flex">
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2"
              onClick={onCopy}
            >
              Copy
            </button>
            <button
              className="bg-red-500 text-white px-2 py-1 rounded-md"
              onClick={onDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
