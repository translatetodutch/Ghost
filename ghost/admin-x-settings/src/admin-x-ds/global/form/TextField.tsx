import Heading from '../Heading';
import Hint from '../Hint';
import React, {useId} from 'react';
import clsx from 'clsx';

interface TextFieldProps {
    inputRef?: React.RefObject<HTMLInputElement>;
    title?: string;
    hideTitle?: boolean;
    type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
    value?: string;
    error?: boolean;
    placeholder?: string;
    hint?: React.ReactNode;
    clearBg?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    className?: string;
    maxLength?: number;
    containerClassName?: string;
    unstyled?: boolean;
}

const TextField: React.FC<TextFieldProps> = ({
    type = 'text',
    inputRef,
    title,
    hideTitle,
    value,
    error,
    placeholder,
    hint,
    clearBg = true,
    onChange,
    onBlur,
    className = '',
    maxLength,
    containerClassName = '',
    unstyled = false,
    ...props
}) => {
    const id = useId();

    const textFieldClasses = !unstyled && clsx(
        'h-10 border-b py-2',
        clearBg ? 'bg-transparent' : 'bg-grey-75 px-[10px]',
        error ? `border-red` : `border-grey-500 hover:border-grey-700 focus:border-black`,
        (title && !hideTitle && !clearBg) && `mt-2`,
        className
    );

    const field = <input
        ref={inputRef}
        className={textFieldClasses || className}
        id={id}
        maxLength={maxLength}
        placeholder={placeholder}
        type={type}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        {...props} />;

    if (title || hint) {
        return (
            <div className={`flex flex-col ${containerClassName}`}>
                {title && <Heading className={hideTitle ? 'sr-only' : ''} grey={value ? true : false} htmlFor={id} useLabelTag={true}>{title}</Heading>}
                {field}
                {hint && <Hint color={error ? 'red' : ''}>{hint}</Hint>}
            </div>
        );
    } else {
        return field;
    }
};

export default TextField;
