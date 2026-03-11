import AsciiLogo from "./AsciiLogo";
import InteractiveMenu from "./InteractiveMenu";
import ActivePreview from "./ActivePreview";

export default function DashboardView() {
  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-12 custom-scrollbar flex flex-col items-center justify-center min-h-full">
      <AsciiLogo />
      <div className="w-full max-w-xl space-y-6 flex flex-col items-center">
        <InteractiveMenu />
        <ActivePreview />
      </div>
    </div>
  );
}