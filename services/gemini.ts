// services/gemini.ts
// CHẾ ĐỘ MENTOR SOCRATES - GIẢ LẬP CAO CẤP
// (Tập trung vào tư duy gợi mở và cảm xúc chân thật)

interface GeminiResponse {
  text: string;
  suggestedActions: string[];
}

export const getGeminiResponse = async (prompt: string, imageBase64?: string): Promise<GeminiResponse> => {
  // Tạo độ trễ ngẫu nhiên (1s - 2s) để cảm giác như người thật đang gõ
  const delay = Math.floor(Math.random() * 1000) + 1000; 
  await new Promise((resolve) => setTimeout(resolve, delay));

  const lowerPrompt = prompt.toLowerCase();
  let responseText = "";
  let actions: string[] = [];

  // --- 1. CHỦ ĐỀ: TỰ DO TÀI CHÍNH & LÃI KÉP (Socratic: Sức mạnh thời gian) ---
  if (lowerPrompt.includes("lãi") || lowerPrompt.includes("đầu tư") || lowerPrompt.includes("tài chính") || lowerPrompt.includes("vốn") || lowerPrompt.includes("giàu")) {
    responseText = `Chào em, một câu hỏi rất thú vị! 🌿\n\nTrước khi nói về công thức, chị muốn hỏi em một chút: **"Em nghĩ điều gì tạo nên sự khác biệt lớn nhất giữa một hòn tuyết lăn và một nắm tuyết đứng yên?"**\n\nĐó chính là sự **vận động theo thời gian**. Trong tài chính, chúng ta gọi đó là **Lãi kép** ($$Compound Interest$$).\n\nCông thức kỳ diệu là:\n$$ FV = PV \\times (1 + r)^n $$\n\nTrong đó $$n$$ (thời gian) nằm ở số mũ. Theo em, nếu em bắt đầu sớm hơn 5 năm, kết quả $$FV$$ sẽ thay đổi khủng khiếp thế nào?`;
    actions = ["Thử tính lãi kép", "Quy tắc 72 là gì?", "Làm sao có vốn đầu tư?"];
  }

  // --- 2. CHỦ ĐỀ: QUẢN LÝ CHI TIÊU & TIẾT KIỆM (Socratic: Hành vi & Thói quen) ---
  else if (lowerPrompt.includes("tiết kiệm") || lowerPrompt.includes("tiền") || lowerPrompt.includes("chi tiêu") || lowerPrompt.includes("lương") || lowerPrompt.includes("thu nhập")) {
    responseText = `Chị hiểu nỗi băn khoăn này của em. Rất nhiều bạn trẻ cũng gặp tình trạng "đầu tháng vua, cuối tháng ăn mì". 🍜\n\nEm hãy thử suy ngẫm về phương trình này nhé:\n\n1. $$ Thu nhập - Chi tiêu = Tiết kiệm $$\n2. $$ Thu nhập - Tiết kiệm = Chi tiêu $$\n\nEm đang áp dụng cách 1 hay cách 2? Người giàu thường chọn cách 2: **"Trả cho mình trước"**. Em có sẵn lòng thử quy tắc **50/30/20** ngay từ tháng này không?`;
    actions = ["Giải thích quy tắc 50/30/20", "Cách cắt giảm chi tiêu thừa", "Làm sao để tăng thu nhập?"];
  }

  // --- 3. CHỦ ĐỀ: KHỞI NGHIỆP & KINH DOANH (Socratic: Giá trị cốt lõi) ---
  else if (lowerPrompt.includes("khởi nghiệp") || lowerPrompt.includes("kinh doanh") || lowerPrompt.includes("bán") || lowerPrompt.includes("lời")) {
    responseText = `Wow, chị rất thích tinh thần dám nghĩ dám làm của em! ✨\n\nNhưng để khởi nghiệp bền vững, chị muốn em tự trả lời câu hỏi này: **"Sản phẩm của em giải quyết nỗi đau nào cho khách hàng mà họ sẵn sàng trả tiền để chấm dứt nỗi đau đó?"**\n\nĐừng chỉ nhìn vào doanh thu ($$R$$), hãy nhìn vào Lợi nhuận ($$P$$):\n$$ P = R - C $$\n($$Lợi nhuận = Doanh thu - Chi phí$$). Em đã tính kỹ các loại chi phí ẩn chưa?`;
    actions = ["Chi phí cố định là gì?", "Cách định giá sản phẩm", "Vốn khởi nghiệp từ đâu?"];
  }

  // --- 4. CHỦ ĐỀ: NỢ & TRẢ GÓP (Socratic: Tư duy rủi ro) ---
  else if (lowerPrompt.includes("nợ") || lowerPrompt.includes("vay") || lowerPrompt.includes("trả góp")) {
    responseText = `Đây là một chủ đề rất nghiêm túc. 🛑\n\nEm à, nợ không xấu, nhưng nợ không kiểm soát là "kẻ hủy diệt" tài chính. Em hãy tự hỏi: **"Khoản vay này sẽ giúp em tạo ra tiền (Tài sản) hay chỉ làm em mất tiền đi (Tiêu sản)?"**\n\nNếu em vay mua điện thoại đời mới, đó là Tiêu sản. Nếu vay học khóa học kỹ năng, đó có thể là Tài sản. Em đang định vay vì mục đích gì?`;
    actions = ["Phân biệt Nợ tốt/Nợ xấu", "Cách tính lãi vay", "Thoát bẫy nợ nần"];
  }

  // --- 5. XỬ LÝ ẢNH BÀI TẬP (Socratic: Phương pháp giải quyết vấn đề) ---
  else if (imageBase64) {
    responseText = `Chị đã nhận được ảnh bài toán của em! 📸\n\nThay vì đưa ngay đáp án, chị em mình cùng phân tích nhé. Nhìn vào đề bài, em thấy những con số nào là **"Dữ kiện chìa khóa"**?\n\n- Có số tiền ban đầu ($$PV$$) không?\n- Có lãi suất ($$r$$) hay thời hạn ($$n$$) không?\n\nEm hãy thử gọi tên các biến số đó ra, công thức sẽ tự động xuất hiện trong đầu em đấy!`;
    actions = ["Gợi ý công thức", "Kiểm tra đáp án", "Giải thích ký hiệu Toán"];
  }

  // --- 6. MẶC ĐỊNH (Giao tiếp & Khơi gợi) ---
  else {
    responseText = `Chào em, Chị là **Mai Mentor** đây! 👋\n\nChị không chỉ ở đây để giải toán, mà chị muốn cùng em xây dựng một **Tư duy Thịnh vượng**. \n\nEm đang cảm thấy thế nào về tình hình tài chính hiện tại của mình? Hơi lo lắng, hay đang ấp ủ một dự định lớn? Chia sẻ với chị nhé!`;
    actions = ["Làm sao để tự do tài chính?", "Lãi suất kép là gì?", "Kỹ năng quản lý vốn"];
  }

  return {
    text: responseText,
    suggestedActions: actions
  };
};