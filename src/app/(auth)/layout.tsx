export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative flex h-screen w-full items-center justify-center bg-primary-background overflow-hidden">
            {/* Top right blur circle */}
            <div className="absolute top-[-100px] right-[-100px] h-[300px] w-[300px] rounded-full bg-primary-purple blur-3xl opacity-50 z-0" />

            {/* Bottom left blur circle */}
            <div className="absolute bottom-[-100px] left-[-100px] h-[300px] w-[300px] rounded-full bg-primary-purple blur-3xl opacity-50 z-0" />

            {/* Page Content */}
            <div className="z-10 w-full">{children}</div>
        </div>
    );
}
