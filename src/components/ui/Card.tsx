import { type ReactNode } from 'react'

interface CardProps {
  title?: string
  children: ReactNode
  className?: string
  footer?: ReactNode
}

export function Card({ title, children, className = '', footer }: CardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      {title && <h3 className="text-lg font-bold mb-4 text-gray-800">{title}</h3>}
      <div className="mb-4">{children}</div>
      {footer && <div className="border-t pt-4">{footer}</div>}
    </div>
  )
}