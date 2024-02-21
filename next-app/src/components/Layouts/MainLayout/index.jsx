function MainLayout({ children }) {
  return (
    <div className="relative z-40  h-full w-full overflow-y-auto overflow-x-hidden">
      {children}
    </div>
  );
}

export default MainLayout;
