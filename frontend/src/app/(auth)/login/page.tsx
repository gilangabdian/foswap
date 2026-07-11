"use client";
import { useState } from "react";
import Link from "next/link";
import AuthLayout from "@/components/auth/auth-layout";
import { loginUser } from "@/lib/auth-api/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await loginUser({ email, password });
      console.log("Login sukses:", res);
      alert("Login Sukses! (Integrasi selengkapnya menyusul)");
      // TODO: Simpan token & redirect
    } catch (error: any) {
      console.error("Login gagal:", error);
      setErrorMsg(error?.response?.data?.message || "Terjadi kesalahan saat login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Selamat Datang Kembali" subtitle="Silakan masuk untuk melanjutkan ke dashboard FoSwap.">
      <form onSubmit={handleSubmit} className="space-y-4">
        {errorMsg && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-2 rounded-lg text-xs">
            {errorMsg}
          </div>
        )}

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
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="cursor-pointer w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 mt-2">
          {loading ? "Memproses..." : "Masuk"}
        </button>

        <p className="text-center text-xs text-gray-400 mt-4">
          Belum punya akun?{" "}
          <Link href="/register" className="text-white hover:text-pink-400 font-medium transition-colors">
            Daftar sekarang
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
