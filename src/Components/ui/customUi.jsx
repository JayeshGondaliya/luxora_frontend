import React from 'react';
import { ChevronDown } from 'lucide-react';
import * as RadixSelect from '@radix-ui/react-select';

export const Select = ({ children, value, onValueChange, ...props }) => (
    <RadixSelect.Root value={value} onValueChange={onValueChange}>
        {children}
    </RadixSelect.Root>
);
export const Button = ({ children, variant = 'default', size = 'md', className = '', ...props }) => {
    const base = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
    const variants = {
        default: 'bg-primary text-white hover:bg-primary/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
    };
    const sizes = {
        sm: 'h-8 px-3',
        md: 'h-10 px-4',
    };
    return (
        <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
            {children}
        </button>
    );
};

export const Input = ({ className = '', ...props }) => (
    <input
        className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}
        {...props}
    />
);

export const Checkbox = ({ id, checked, onCheckedChange }) => (
    <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
        className="h-4 w-4 rounded border border-border text-primary focus:ring-ring"
    />
);

export const Label = ({ children, htmlFor = '', className = '' }) => (
    <label htmlFor={htmlFor} className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}>
        {children}
    </label>
);

export const Slider = ({ value, onValueChange, min = 0, max = 100, step = 1, className = '' }) => (
    <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value[1]}
        onChange={(e) => onValueChange([value[0], Number(e.target.value)])}
        className={`w-full cursor-pointer ${className}`}
    />
);

// Sheet Components
export const Sheet = ({ children }) => <>{children}</>;
export const SheetTrigger = ({ children }) => children;
export const SheetHeader = ({ children }) => <div className="mb-4">{children}</div>;
export const SheetTitle = ({ children }) => <h2 className="text-lg font-semibold">{children}</h2>;
export const SheetContent = ({ children, side = 'left', className = '' }) => (
    <div className={`fixed top-0 ${side === 'left' ? 'left-0' : 'right-0'} h-full w-80 bg-white p-6 z-50 shadow-lg overflow-y-auto ${className}`}>
        {children}
    </div>
);



export const SelectTrigger = ({ children, className = '', open, setOpen }) => (
    <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`inline-flex items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ${className}`}
    >
        {children}
        <ChevronDown className="ml-2 h-4 w-4" />
    </button>
);

export const SelectValue = ({ placeholder, value }) => (
    <span>{value || placeholder}</span>
);

export const SelectContent = ({ children, open }) =>
    open ? (
        <div className="absolute z-50 mt-2 w-36 bg-white border border-border rounded-md shadow-md">
            {children}
        </div>
    ) : null;

export const SelectItem = ({ children, value: itemValue, onValueChange, setOpen }) => (
    <div
        onClick={() => {
            onValueChange(itemValue);
            setOpen(false);
        }}
        className="px-3 py-2 hover:bg-accent cursor-pointer text-sm"
    >
        {children}
    </div>
);
