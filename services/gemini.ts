/// <reference types="vite/client" />
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

// 1. Cấu hình API Key chuẩn cho Vite (Client-side)
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.error("Thiếu API Key! Vui lòng kiểm tra file .env.local");
}

const genAI = new GoogleGenerativeAI(API_KEY || "");

// 2. Định nghĩa hệ thống
const SYSTEM_INSTRUCTION = `
Bạn là "Chị Mai Mentor" - Chuyên gia Tư vấn Tài chính và Giáo dục Toán học lịch thiệp, chuẩn mực.
CHIẾN LƯỢC SƯ PHẠM: "Từ Trực quan đến Trừu tượng" (Bottom-Up Approach).

QUY TẮC HIỂN THỊ TOÁN HỌC (QUY ĐỊNH BẮT BUỘC):
1. TUYỆT ĐỐI KHÔNG viết công thức dưới dạng văn bản thô (KHÔNG VIẾT (1+r)n).
2. BẮT BUỘC sử dụng LaTeX kẹp trong dấu $ (cho inline) hoặc $$ (cho block).
3. LUÔN SỬ DỤNG ký hiệu lũy thừa đúng cách: $(1+r)^n$ (PHẢI có dấu ^).
4. LUÔN SỬ DỤNG \\frac{a}{b} cho phân số (Dùng 2 dấu gạch chéo ngược để escape trong chuỗi JSON).
5. Ví dụ chuẩn: "Công thức là $$ FV = PV \\times (1+r)^n $$"

QUY TRÌNH PHẢN HỒI 3 BƯỚC:
BƯỚC 1: GIẢI QUYẾT VẤN ĐỀ (The Hook) - Đưa ra kết quả cụ thể ngay lập tức.
BƯỚC 2: GIẢI THÍCH KIẾN THỨC (The Explanation) - Giải mã bằng công thức Toán học LaTeX chuẩn SGK.
BƯỚC 3: MỞ RỘNG & PHẢN BIỆN (Critical Thinking) - Đặt câu hỏi nâng cao.

NGÔN NGỮ: Sư phạm, trong sáng, xưng hô Chị - Em lịch thiệp.
`;

// 3. Cấu hình Schema trả về JSON (Đã bỏ nullable để tránh lỗi type)
const responseSchema = {
  description: "Phản hồi tư vấn tài chính",
  type: SchemaType.OBJECT,
  properties: {
    text: {
      type: SchemaType.STRING,
      description: "Nội dung phản hồi 3 bước, sử dụng LaTeX chuẩn",
    },
    suggestedActions: {
      type: SchemaType.ARRAY,
      description: "Các câu hỏi gợi ý tư duy tiếp theo",
      items: { type: SchemaType.STRING },
    },
  },
  required: ["text", "suggestedActions"],
};

export const getGeminiResponse = async (prompt: string, imageBase64?: string) => {
  try {
    // Sử dụng model Flash cho tốc độ nhanh và chi phí thấp
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash", 
      systemInstruction: SYSTEM_INSTRUCTION,
      generationConfig: {
        responseMimeType: "application/json",
        // Ép kiểu 'as any' để TypeScript không bắt bẻ cấu trúc schema nữa
        responseSchema: responseSchema as any,
        temperature: 0.4,
      },
    });

    let result;
    if (imageBase64) {
      // Xử lý ảnh nếu có
      const imagePart = {
        inlineData: {
          data: imageBase64.split(",")[1], // Cắt bỏ header base64 thừa
          mimeType: "image/jpeg",
        },
      };
      result = await model.generateContent([prompt, imagePart]);
    } else {
      result = await model.generateContent(prompt);
    }

    const response = await result.response;
    const responseText = response.text();

    // Parse JSON để trả về object cho React dùng
    return JSON.parse(responseText);

  } catch (error) {
    console.error("Lỗi khi gọi Gemini:", error);
    // Trả về dữ liệu giả lập nếu lỗi để App không bị crash
    return {
      text: "Mạng đang chập chờn hoặc gói cước API đã hết. Em thử lại sau chút xíu nhé!",
      suggestedActions: ["Thử lại", "Kiểm tra kết nối"]
    };
  }
};