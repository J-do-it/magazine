import React from 'react';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">FBK 소개</h1>
        
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">FBK Magazine이란?</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              FBK Magazine은 현대 사회의 다양한 이슈들을 깊이 있게 다루는 온라인 매거진입니다. 
              우리는 인사이트, 글로벌 트렌드, 그리고 흥미로운 인터뷰를 통해 독자들에게 
              가치 있는 정보와 새로운 관점을 제공합니다.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">우리의 미션</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              복잡하고 빠르게 변화하는 세상에서 독자들이 올바른 정보를 바탕으로 
              현명한 결정을 내릴 수 있도록 돕는 것이 우리의 목표입니다.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">주요 콘텐츠</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-medium text-gray-800 mb-2">인사이트</h3>
                <p className="text-gray-600">
                  다양한 분야의 전문가들이 제공하는 깊이 있는 분석과 인사이트
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-medium text-gray-800 mb-2">글로벌</h3>
                <p className="text-gray-600">
                  전 세계에서 일어나는 주요 이슈와 트렌드 분석
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-medium text-gray-800 mb-2">인터뷰</h3>
                <p className="text-gray-600">
                  각 분야 리더들과의 심층 인터뷰를 통한 특별한 이야기
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-medium text-gray-800 mb-2">아티클</h3>
                <p className="text-gray-600">
                  시의성 있는 주제들을 다룬 양질의 기사와 리포트
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">연락처</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-600 mb-2">
                <strong>이메일:</strong> contact@fbkmagazine.com
              </p>
              <p className="text-gray-600">
                <strong>주소:</strong> 서울특별시 강남구 테헤란로 123
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
} 