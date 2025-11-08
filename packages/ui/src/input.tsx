'use client'

import React from "react"
import styles from './input.module.css';

interface InputProps{
    placeholder:React.ReactNode;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value:string;
}
export const Input= ({placeholder,onChange,value}:InputProps)=>{
    return(
        <input 
            className={styles.input}
            placeholder={`${placeholder}`} 
            value={value}
            onChange={onChange}
        />
    )
}