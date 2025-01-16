// interface ErrorMessageProps {
//   children: React.ReactNode;
// }

// export function ErrorMessage({ children }: ErrorMessageProps) {
//   if (!children) return null;
//   return <p className="text-red-500 text-sm mt-1">{children}</p>;
// }

import { FieldError } from 'react-hook-form'

interface ErrorMessageProps {
  error?: FieldError
}

export function ErrorMessage({ error }: ErrorMessageProps) {
  if (!error) {
    return null
  }

  return <span className="text-red-500 text-sm mt-1">{error.message}</span>
}

