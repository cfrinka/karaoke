import { X } from "lucide-react";

type Props = {
  close: () => void;
  error: string;
};

const Toast = ({ close, error }: Props) => {
  return (
    <div className="fixed bottom-4 right-4 min-w-96 bg-red-600 rounded-2xl p-4 pb-9 flex flex-col items-center justify-center">
      <span
        className="cursor-pointer absolute top-0 right-0 p-2"
        onClick={close}
      >
        <X className="text-white" size={20} />
      </span>
      <p className="mt-8 text-2xl text-white">{error}</p>
    </div>
  );
};

export default Toast;
