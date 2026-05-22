export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center w-full items-center mx-auto">
      {children}
    </div>
  );
}
