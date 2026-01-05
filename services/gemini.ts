// services/gemini.ts
// CHẾ ĐỘ MENTOR GIẢ LẬP (Pedagogical Mock Mode) - Ổn định tuyệt đối

// Định nghĩa kiểu dữ liệu trả về cho TypeScript yên tâm
interface GeminiResponse {
  text: string;
  suggestedActions: string[];
}

export const getGeminiResponse = async (prompt: string, imageBase64?: string): Promise<GeminiResponse> => {
  // 1. Tạo hiệu ứng "Đang suy nghĩ..." (Delay 1.5s) để học sinh cảm thấy chân thật
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const lowerPrompt = prompt.toLowerCase();
  let responseText = "";
  let actions = [];

  // --- KỊCH BẢN SƯ PHẠM 1: LÃI KÉP & ĐẦU TƯ ---
  if (lowerPrompt.includes("lãi") || lowerPrompt.includes("đầu tư") || lowerPrompt.includes("fv")) {
    responseText = `Chào em, chị Mai đây! Một câu hỏi rất hay về sức mạnh của thời gian.\n\nTrong đầu tư, chúng ta có công thức **Lãi kép** kinh điển:\n\n$$ FV = PV \\times (1 + r)^n $$\n\nTrong đó:\n- **PV**: Số vốn ban đầu em có.\n- **r**: Lãi suất (hoặc lợi nhuận) hàng năm.\n- **n**: Số năm em kiên trì đầu tư.\n\nNhìn vào công thức, em thấy biến số **n (thời gian)** nằm ở số mũ không? Đó chính là lý do vì sao "bắt đầu sớm" lại quan trọng hơn "bắt đầu nhiều" đấy!`;
    actions = ["Quy tắc 72 là gì?", "Ví dụ minh họa lãi kép", "Làm sao để có vốn PV?"];
  } 
  // --- KỊCH BẢN SƯ PHẠM 2: QUẢN LÝ TIỀN & TIẾT KIỆM ---
  else if (lowerPrompt.includes("tiền") || lowerPrompt.includes("tiết kiệm") || lowerPrompt.includes("chi tiêu")) {
    responseText = `Vấn đề muôn thuở của Gen Z chúng mình! Để quản lý tài chính thông minh, chị khuyên em áp dụng phương pháp **JARS (6 chiếc hũ)** hoặc quy tắc **50/30/20**.\n\nCông thức quản lý dòng tiền cơ bản:\n\n$$ S = I - E $$\n\n(Tiết kiệm = Thu nhập - Chi tiêu). \n\nTuy nhiên, tư duy đúng đắn phải là: **Chi tiêu = Thu nhập - Tiết kiệm**. Tức là em phải "cất đi" phần tiết kiệm ngay khi nhận tiền nhé!`;
    actions = ["Lập kế hoạch 50/30/20", "Cách tăng thu nhập I", "Cắt giảm chi tiêu E"];
  }
  // --- KỊCH BẢN SƯ PHẠM 3: XỬ LÝ ẢNH (BÀI TẬP TOÁN) ---
  else if (imageBase64) {
    responseText = `Chị đã nhận được ảnh bài toán của em rồi! 📸\n\nĐây là một bài toán thực tế rất thú vị. Theo phương pháp "Tư duy ngược", chúng ta đừng vội tìm đáp án, mà hãy xác định các dữ kiện trước nhé:\n\n1. **Mục tiêu** của bài toán là tìm biến số nào? ($$FV$$, $$PV$$ hay $$r$$?)\n2. Những con số đề bài cho đóng vai trò gì?\n\nEm thử liệt kê các biến số ra đây, chị sẽ giúp em ráp vào công thức nhé!`;
    actions = ["Gợi ý công thức phù hợp", "Giải thích các biến số", "Kiểm tra kết quả"];
  }
  // --- KỊCH BẢN MẶC ĐỊNH (CHÀO HỎI & KHÍCH LỆ) ---
  else {
    responseText = `Chào em, Chị là **Mai Mentor**. Chị rất vui được đồng hành cùng em!\n\nChị không chỉ giải bài tập giúp em, mà chị muốn chúng ta cùng rèn luyện **Tư duy Tài chính (Financial Mindset)**.\n\nEm đang thắc mắc về vấn đề gì? Đừng ngần ngại chia sẻ nhé, không có câu hỏi nào là "ngớ ngẩn" cả đâu!`;
    actions = ["Lãi suất kép là gì?", "Làm sao để tự do tài chính?", "Kỹ năng quản lý vốn"];
  }

  return {
    text: responseText,
    suggestedActions: actions
  };
};