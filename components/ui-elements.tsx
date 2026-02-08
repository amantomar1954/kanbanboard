'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';

/**
 * Premium Button component with multiple variants, sizes, and micro-animations.
 * Supports Radix UI Slot for polymorphic usage.
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'ghost' | 'outline';
    size?: 'default' | 'sm' | 'icon';
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'default', size = 'default', asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button';
        const variants = {
            default: 'bg-violet-600 text-white hover:bg-violet-700 shadow-sm shadow-violet-200',
            ghost: 'hover:bg-violet-50 text-stone-600 hover:text-violet-600',
            outline: 'border border-stone-200 bg-transparent hover:bg-stone-50 text-stone-600',
        };
        const sizes = {
            default: 'h-10 px-4 py-2',
            sm: 'h-8 px-3 text-xs',
            icon: 'h-9 w-9 p-0',
        };

        return (
            <Comp
                className={cn(
                    'inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 disabled:pointer-events-none disabled:opacity-50 active:scale-95',
                    variants[variant],
                    sizes[size],
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = 'Button';

/**
 * Modern Input component with refined focus states and consistent typography.
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    'flex h-10 w-full rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-stone-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 disabled:cursor-not-allowed disabled:opacity-50 transition-all',
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Input.displayName = 'Input';

export { Button, Input };
