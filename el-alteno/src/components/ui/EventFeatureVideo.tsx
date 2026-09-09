"use client";
import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
export default function EventFeatureVideo() {
 const { t } = useLanguage();
 const [started,setStarted]=useState(false);
 return <div className="relative mb-6 overflow-hidden rounded-2xl border border-mustard/30 bg-[#120F0D] shadow-xl"><div className="relative aspect-video w-full">
 {started ? <video src="/videos/optimized/walkthrough-720.mp4" controls autoPlay playsInline preload="none" poster="/images/local_para_eventos/private-events-master-poster.jpg" aria-label={t("Private events walkthrough","Recorrido de eventos privados")} className="absolute inset-0 h-full w-full object-contain" /> :
 <button type="button" onClick={()=>setStarted(true)} aria-label={t("Play private events video","Reproducir video de eventos privados")} className="absolute inset-0 block h-full w-full focus-visible:outline-4 focus-visible:outline-mustard">
 <Image src="/images/local_para_eventos/private-events-master-poster.jpg" alt="" fill sizes="(max-width: 768px) 100vw, 1200px" className="object-cover" />
 <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
 <span className="absolute inset-0 grid place-items-center"><span className="grid size-16 place-items-center rounded-full border border-mustard bg-black/60 text-mustard"><Play size={26} fill="currentColor" /></span></span>
 <span className="absolute bottom-4 left-4 text-xs font-bold uppercase tracking-widest text-white">{t("Explore Our Spaces","Conoce Nuestros Espacios")}</span>
 </button>}</div></div>;
}
