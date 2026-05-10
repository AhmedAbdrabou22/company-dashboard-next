export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 md:p-12 bg-white">
        <div className="w-full max-w-lg">{children}</div>
      </div>

      {/* Right Side */}
      <div className="hidden lg:block lg:w-1/2 bg-primary" />
    </div>
  );
}