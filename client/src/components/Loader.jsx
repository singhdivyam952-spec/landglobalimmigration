const Loader = ({ fullScreen = false, label = 'Loading...' }) => {
  const content = (
    <div className="flex flex-col items-center justify-center gap-3 py-16">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-secondary border-t-primary" />
      <p className="text-sm font-medium text-muted">{label}</p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
        {content}
      </div>
    );
  }

  return content;
};

export default Loader;
