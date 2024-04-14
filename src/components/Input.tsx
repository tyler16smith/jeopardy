import classNames from 'classnames'
import React from 'react'

type InputProps = {
  value: string | null
  setValue: (value: string) => void
  id?: string
  placeholder?: string
  onBlur?: () => void
}

const Input = ({
  value,
  setValue,
  id = '',
  placeholder,
  onBlur,
}: InputProps) => {

  if (value === null) {
    return (
      <div className='flex justify-center items-center w-full h-10 bg-gray-400/10 rounded-md' />
    )
  }

  return (
    <input
      id={id}
      autoComplete='off'
      type="text"
      value={value}
      onChange={e => setValue(e.target.value)}
      placeholder={placeholder ?? ""}
      onBlur={onBlur}
      className={classNames(
        'border border-gray-300 rounded p-2 backdrop-blur-lg',
        'border-[1px] border-gray-400/20 bg-gray-400/10',
        'text-white outline-none focus:border-gray-400/30',
        'ring-4 ring-transparent focus:ring-gray-400/30',
        'transition duration-200 w-full',
      )}
    />
  )
}

export default Input