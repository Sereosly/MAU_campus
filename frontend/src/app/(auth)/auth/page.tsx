import {AuthForm} from "@/features/auth";

export default function Auth() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center p-14 border-2 rounded-3xl shadow-md  sm:items-start">
        <AuthForm/>
      </main>
    </div>
  );
}
