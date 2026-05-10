"use client";

type PageHeader_TP = {
    breadcrumb?: string;
    title: string;
    order?: "title-first" | "breadcrumb-first"; // تحديد الترتيب
};

export const PageHeader = ({
    breadcrumb,
    title,
    order = "breadcrumb-first" // القيمة الافتراضية
}: PageHeader_TP) => {
    const isTitleFirst = order === "title-first";

    return (
        <div>
            {isTitleFirst ? (
                // Title first
                <>
                    <h1 className="text-2xl font-bold text-gray-900 leading-tight">
                        {title}
                    </h1>
                    {breadcrumb && (
                        <p className="text-xs text-gray-400 font-medium tracking-wide uppercase mt-1">
                            {breadcrumb}
                        </p>
                    )}
                </>
            ) : (
                // Breadcrumb first (default)
                <>
                    {breadcrumb && (
                        <p className="text-xs text-gray-400 font-medium tracking-wide uppercase mb-0.5">
                            {breadcrumb}
                        </p>
                    )}
                    <h1 className="text-2xl font-bold text-gray-900 leading-tight">
                        {title}
                    </h1>
                </>
            )}
        </div>
    );
};