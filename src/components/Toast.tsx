import { X } from "lucide-react";

type Props = {
  close: () => void;
};

const Toast = ({ close }: Props) => {
  return (
    <div className="fixed bottom-4 right-4 min-w-[200px] bg-red-600 rounded-2xl p-4">
      <span
        className="cursor-pointer absolute top-0 right-0 p-2"
        onClick={close}
      >
        <X className="text-white" />
      </span>
      <p className="mt-8 text-2xl text-white">Nome já existe na lista!</p>
    </div>
  );
};

export default Toast;
