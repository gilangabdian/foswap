"use client";
import { useState } from "react";
import Link from "next/link";
import AuthLayout from "@/components/auth/auth-layout";
import { registerUser } from "@/lib/auth-api/auth";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await registerUser({ name, email, password });
      console.log("Register sukses:", res);
      alert("Registrasi Sukses! Silakan Login.");
      router.push("/login");
    } catch (error: any) {
      console.error("Register gagal:", error);
      setErrorMsg(error?.response?.data?.message || "Terjadi kesalahan saat registrasi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Mulai Perjalananmu"
      subtitle="Daftar akun baru dan ubah tumpukan foto jadi mahakarya estetik hari ini.">
      <form onSubmit={handleSubmit} className="space-y-4">
        {errorMsg && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-2 rounded-lg text-xs">
            {errorMsg}
          </div>
        )}

        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">Nama</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            placeholder="nama@email.com"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            placeholder="Minimal 6 karakter"
            minLength={6}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="cursor-pointer w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 mt-2">
          {loading ? "Memproses..." : "Daftar Akun"}
        </button>

        <p className="text-center text-xs text-gray-400 mt-4">
          Sudah punya akun?{" "}
          <Link href="/login" className="text-white hover:text-pink-400 font-medium transition-colors">
            Masuk di sini
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
