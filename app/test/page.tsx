'use client'

import React, { useEffect, useRef } from "react";

// 더미 데이터
const BOOKS = [
  {
    id: "gatsby",
    title: "The Great Gatsby",
    desc: "F. Scott Fitzgerald의 클래식. 1920년대의 욕망과 사랑.",
    image:
      "https://covers.openlibrary.org/b/id/7222246-L.jpg",
  },
  {
    id: "harrypotter",
    title: "Harry Potter and the Sorcerer's Stone",
    desc: "마법과 성장의 시작, 전 세계가 사랑한 판타지.",
    image:
      "https://covers.openlibrary.org/b/id/7984916-L.jpg",
  },
  {
    id: "mockingbird",
    title: "To Kill a Mockingbird",
    desc: "인권과 용기에 관한 시대를 초월한 명작.",
    image:
      "https://covers.openlibrary.org/b/id/8225261-L.jpg",
  },
];

export default function BooksScrollPage() {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // IntersectionObserver로 스크롤 감지, path 변경
  useEffect(() => {
    if (typeof window === "undefined") return;
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            entry.intersectionRatio > 0.5 // 화면 50% 이상 들어오면
          ) {
            const bookId = entry.target.getAttribute("data-book-id");
            if (bookId) {
              window.history.replaceState({}, "", `/${bookId}`);
            }
          }
        });
      },
      {
        threshold: 0.5, // 요소가 50% 이상 보이면 trigger
      }
    );

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // popstate: 뒤로/앞으로 시 스크롤 자동 이동
  useEffect(() => {
    const handler = () => {
      const path = window.location.pathname.slice(1);
      const idx = BOOKS.findIndex((b) => b.id === path);
      if (idx !== -1 && sectionRefs.current[idx]) {
        sectionRefs.current[idx]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    };
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);

  return (
    <div
      style={{
        maxWidth: 500,
        margin: "0 auto",
        padding: 40,
      }}
    >
      {BOOKS.map((book, idx) => (
        <div
          key={book.id}
          data-book-id={book.id}
          ref={(el) => {
            if (el) {
              sectionRefs.current[idx] = el;
            }
          }}
          style={{
            minHeight: "100vh",
            margin: "80px 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: "0 6px 24px rgba(0,0,0,0.08)",
            borderRadius: 24,
            padding: 32,
            background: "#fff",
          }}
        >
          <img
            src={book.image}
            alt={book.title}
            style={{
              width: 180,
              height: 260,
              objectFit: "cover",
              marginBottom: 32,
              borderRadius: 12,
              boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
            }}
          />
          <h2 style={{ fontSize: 30, fontWeight: 700, color: "#000" }}>{book.title}</h2>
          <p style={{ fontSize: 20, color: "#444", margin: "20px 0 0" }}>
            {book.desc}
          </p>
        </div>
      ))}
      <div style={{ height: 800 }} /> {/* 맨 끝에 여유 여백 */}
    </div>
  );
}
