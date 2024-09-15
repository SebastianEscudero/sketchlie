import { AlertCircle } from "lucide-react";

interface FormErrorProps {
  message?: string;
}

export const FormError = ({
  message,
}: FormErrorProps) => {
  if (!message) return null;

  return (
    <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md flex items-center gap-x-2 text-sm text-red-700 animate-fadeIn">
      <AlertCircle className="h-6 w-6 text-red-500" />
      <p>{message}</p>
    </div>
  );
};