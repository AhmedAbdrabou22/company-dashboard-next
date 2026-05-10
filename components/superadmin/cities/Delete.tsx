import { PrimaryButton } from "@/components/shared/buttons/PrimaryBtn";
import { useState } from "react";

const DeleteCountry = ({ onSubmit, onClose }: { onSubmit: (reason: string) => void; onClose: () => void }) => {
    const [reason, setReason] = useState("");

    return (
        <div className="flex flex-col gap-4">
            <input
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Type your reason here"
                className="w-full px-4 py-3 rounded-xl border border-[#E4E7EC] text-sm text-[# 1A2A4B] placeholder:text-[#C0C9D8] outline-none focus:border-[# 1A2A4B] focus:ring-2 focus:ring-[# 1A2A4B]/10 transition-all duration-200"
            />
            <PrimaryButton
                text="Submit"
                type="button"
                disabled={!reason.trim()}
                onClick={() => {
                    if (reason.trim()) {
                        onSubmit(reason.trim());
                        onClose();
                    }
                }}
                className="w-full py-3 rounded-xl text-sm"
            />
        </div>
    );
}

export default DeleteCountry;