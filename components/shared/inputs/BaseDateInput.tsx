"use client";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useField, useFormikContext } from "formik";

type Props = {
    name: string;
    label?: string;
    placeholder?: string;
};

export const BaseDateInput = ({ name, label }: Props) => {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(name);

    return (
        <div className="flex flex-col gap-1">
            {label && <label className="text-sm text-gray-500">{label}</label>}

            <DatePicker
                selected={field.value ? new Date(field.value) : null}
                onChange={(date: Date | null) => setFieldValue(name, date)}
                dateFormat="yyyy-MM-dd"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[# 1A2A4B]"
                placeholderText="Select date"
            />
        </div>
    );
};