"use client";

import { useState, useRef } from "react";
import { HiOutlinePhotograph, HiX } from "react-icons/hi";
import { Tooltip } from "./Tooltip";

type ImageUpload_TP = {
    tooltip?: string;
    maxImages?: number;
};

export const ImageUpload = ({ tooltip, maxImages = 5 }: ImageUpload_TP) => {
    const [images, setImages] = useState<{ url: string; name: string }[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFiles = (files: FileList | null) => {
        if (!files) return;
        const newImgs = Array.from(files)
            .slice(0, maxImages - images.length)
            .map((f) => ({ url: URL.createObjectURL(f), name: f.name }));
        setImages((prev) => [...prev, ...newImgs].slice(0, maxImages));
    };

    const remove = (i: number) => setImages((prev) => prev.filter((_, idx) => idx !== i));

    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                Photo/video upload
                <span className="text-[#2563EB] font-normal">(Optional)</span>
                {tooltip && <Tooltip text={tooltip} />}
            </label>
            <div className="flex items-center gap-3 flex-wrap">
                {images.map((img, i) => (
                    <div key={i} className="relative w-[88px] h-[88px] rounded-xl overflow-hidden border border-gray-200 group">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                        <button
                            type="button"
                            onClick={() => remove(i)}
                            className="absolute top-1 right-1 bg-white/90 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity shadow"
                        >
                            <HiX size={12} className="text-gray-600" />
                        </button>
                    </div>
                ))}

                {images.length < maxImages && Array.from({ length: maxImages - images.length }).map((_, i) => (
                    <button
                        key={i}
                        type="button"
                        onClick={() => inputRef.current?.click()}
                        className="w-[88px] h-[88px] rounded-xl border-2 border-dashed border-[#BFDBFE] bg-[#EFF6FF] flex flex-col items-center justify-center gap-1 hover:bg-[#DBEAFE] transition-colors"
                    >
                        <HiOutlinePhotograph size={22} className="text-[#93C5FD]" />
                        <span className="text-[10px] text-[#93C5FD] font-medium">Add photo</span>
                    </button>
                ))}

                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*,video/*"
                    multiple
                    className="hidden"
                    onChange={(e) => handleFiles(e.target.files)}
                />
            </div>
        </div>
    );
};