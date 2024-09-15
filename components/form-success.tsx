import { CheckCircle } from "lucide-react";

interface FormSuccessProps {
  message?: string;
}

export const FormSuccess = ({
  message,
}: FormSuccessProps) => {
  if (!message) return null;

  return (
    <div className="bg-emerald-50 border-l-4 border-emerald-400 p-4 rounded-md flex items-center gap-x-2 text-sm text-emerald-700">
      <CheckCircle className="h-4 w-4 text-emerald-500" />
      <p>{message}</p>
    </div>
  );
};