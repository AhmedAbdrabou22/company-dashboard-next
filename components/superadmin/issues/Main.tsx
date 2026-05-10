"use client";
import { useState } from "react"
import { PageHeader } from "@/components/shared/headers/PageHeader"

// ─── Types ────────────────────────────────────────────────────────────────────

interface Issue {
    id: string
    name: string
    message: string
    timeAgo: string
    avatarInitials?: string
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const INITIAL_ISSUES: Issue[] = [
    { id: "1", name: "Ahmed Mohamed", message: "I'm Facing an issue name of the issue with the system", timeAgo: "2 mins ago" },
    { id: "2", name: "Ahmed Mohamed", message: "I'm Facing an issue name of the issue with the system", timeAgo: "2 mins ago" },
    { id: "3", name: "Ahmed Mohamed", message: "I'm Facing an issue name of the issue with the system", timeAgo: "2 mins ago" },
    { id: "4", name: "Ahmed Mohamed", message: "I'm Facing an issue name of the issue with the system", timeAgo: "2 mins ago" },
    { id: "5", name: "Ahmed Mohamed", message: "I'm Facing an issue name of the issue with the system", timeAgo: "2 mins ago" },
    { id: "6", name: "Ahmed Mohamed", message: "I'm Facing an issue name of the issue with the system", timeAgo: "2 mins ago" },
    { id: "7", name: "Ahmed Mohamed", message: "I'm Facing an issue name of the issue with the system", timeAgo: "2 mins ago" },
    { id: "8", name: "Ahmed Mohamed", message: "I'm Facing an issue name of the issue with the system", timeAgo: "2 mins ago" },
]

// ─── Avatar ───────────────────────────────────────────────────────────────────

const Avatar = ({ name }: { name: string }) => {
    const initials = name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()

    return (
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
            <span className="text-xs font-semibold text-slate-500">{initials}</span>
        </div>
    )
}

// ─── Delete Confirm Modal ─────────────────────────────────────────────────────

const DeleteModal = ({
    onConfirm,
    onCancel,
}: {
    onConfirm: () => void
    onCancel: () => void
}) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
        <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-50 mx-auto mb-4">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6l-1 14H6L5 6" />
                    <path d="M10 11v6M14 11v6" />
                    <path d="M9 6V4h6v2" />
                </svg>
            </div>
            <h3 className="text-center text-base font-semibold text-slate-800 mb-1">Delete Issue</h3>
            <p className="text-center text-sm text-slate-500 mb-6">Are you sure you want to delete this issue? This action cannot be undone.</p>
            <div className="flex gap-3">
                <button
                    onClick={onCancel}
                    className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                >
                    Cancel
                </button>
                <button
                    onClick={onConfirm}
                    className="flex-1 py-2.5 rounded-xl bg-red-500 text-sm font-medium text-white hover:bg-red-600 transition-colors"
                >
                    Delete
                </button>
            </div>
        </div>
    </div>
)


const IssueRow = ({
    issue,
    onDelete,
    isLast,
}: {
    issue: Issue
    onDelete: () => void
    isLast: boolean
}) => (
    <div
        className={`flex items-center gap-4 py-5 px-1 ${!isLast ? "" : ""
            }`}
    >
        <Avatar name={issue.name} />

        {/* Content */}
        <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-800 leading-tight truncate">
                {issue.name}
            </p>
            <p className="text-sm text-slate-500 mt-0.5 truncate">
                {issue.message}
            </p>
            <p className="text-xs text-slate-400 mt-1">{issue.timeAgo}</p>
        </div>

        {/* Delete Button */}
        <button
            onClick={onDelete}
            className="shrink-0 p-2 rounded-lg hover:bg-red-50 transition-colors group"
            aria-label="Delete issue"
        >
            <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ef4444"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-70 group-hover:opacity-100 transition-opacity"
            >
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14H6L5 6" />
                <path d="M10 11v6M14 11v6" />
                <path d="M9 6V4h6v2" />
            </svg>
        </button>
    </div>
)


const MainIssues = () => {
    const [issues, setIssues] = useState<Issue[]>(INITIAL_ISSUES)
    const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null)

    const handleDeleteConfirm = () => {
        if (pendingDeleteId) {
            setIssues((prev) => prev.filter((i) => i.id !== pendingDeleteId))
            setPendingDeleteId(null)
        }
    }

    return (
        <div className="">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-4">
                <PageHeader
                    breadcrumb="Dashboard / Issues"
                    title="Issues"
                />
            </div>

            <div className="bg-white rounded-2xl ">
                {issues.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-3 opacity-50">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        <p className="text-sm">No issues found</p>
                    </div>
                ) : (
                    issues.map((issue, idx) => (
                        <IssueRow
                            key={issue.id}
                            issue={issue}
                            isLast={idx === issues.length - 1}
                            onDelete={() => setPendingDeleteId(issue.id)}
                        />
                    ))
                )}
            </div>

            {pendingDeleteId && (
                <DeleteModal
                    onConfirm={handleDeleteConfirm}
                    onCancel={() => setPendingDeleteId(null)}
                />
            )}
        </div>
    )
}

export default MainIssues