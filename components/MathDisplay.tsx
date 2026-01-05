import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// ĐÃ XÓA DÒNG IMPORT CSS GÂY LỖI TRẮNG MÀN HÌNH
// (Vì chúng ta đã có link CDN trong file index.html rồi)

interface MathDisplayProps {
  content: string;
  className?: string;
  block?: boolean;
}

const MathDisplay: React.FC<MathDisplayProps> = ({ content, className = '', block = false }) => {
  // Xử lý dữ liệu thô: Đảm bảo công thức hiển thị đẹp
  const formattedContent = content
    .replace(/\\\[/g, '$$')
    .replace(/\\\]/g, '$$')
    .replace(/\\\(/g, '$')
    .replace(/\\\)/g, '$');

  return (
    <div className={`math-display-wrapper font-medium text-slate-800 ${className}`}>
      {/* Thêm style để công thức không bị xuống dòng bậy bạ */}
      <div className="overflow-x-auto max-w-full py-1 hide-scrollbar">
        <ReactMarkdown
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex]}
          components={{
            p: ({node, ...props}) => <p className="mb-2 last:mb-0 leading-relaxed" {...props} />,
            // Tùy chỉnh thẻ hiển thị công thức để không bị ngắt dòng
            div: ({node, ...props}) => <div className="overflow-x-auto whitespace-nowrap" {...props} />
          }}
        >
          {formattedContent}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default MathDisplay;